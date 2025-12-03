import { useRef } from 'react';
import { css } from 'goober';

import { formatMonth, getMonthDifference, TODAY } from '@/lib/datetime';

import { cn } from '@/utils/styles/classNames';

import { TimelineContext } from './hooks';

type Props = {
  timelineBeginning: Date;
  activeEventIndex?: number;
  sizePerBlock?: string;
  isScrollTriggerEnabled?: boolean;
  children: React.ReactNode;
};

export const Timeline = ({
  children,
  activeEventIndex,
  timelineBeginning,
  isScrollTriggerEnabled = false,
  sizePerBlock = '3.5rem',
}: Props) => {
  const totalMonths = getMonthDifference(timelineBeginning, TODAY);
  const dates = Array.from({ length: totalMonths }).map((_, index) => {
    const date = new Date(TODAY);
    date.setMonth(date.getMonth() - index);
    return date;
  });

  const ref = useRef<HTMLDivElement>(null);

  // Calculate lanes for overlapping events
  const childrenArray = Array.isArray(children) ? children : [children];
  const eventsWithLanes = childrenArray.map((child: any) => {
    const from = child?.props?.from;
    const to = child?.props?.to;
    return {
      child,
      from,
      to,
      lane: 0,
      hasOverlap: false,
    };
  });

  // Assign lanes to prevent overlaps
  eventsWithLanes.forEach((event, i) => {
    const occupiedLanes = new Set<number>();
    let hasAnyOverlap = false;

    eventsWithLanes.forEach((otherEvent, j) => {
      if (i === j) return;

      // Check if events overlap
      if (event.from && event.to && otherEvent.from && otherEvent.to) {
        const overlaps =
          event.from <= otherEvent.to && event.to >= otherEvent.from;
        if (overlaps) {
          hasAnyOverlap = true;
          if (j < i) {
            occupiedLanes.add(otherEvent.lane);
          }
        }
      }
    });

    event.hasOverlap = hasAnyOverlap;

    // Find first available lane only if there's an overlap
    if (hasAnyOverlap) {
      let lane = 0;
      while (occupiedLanes.has(lane)) {
        lane++;
      }
      event.lane = lane;
    } else {
      event.lane = 0;
    }
  });

  // Calculate max lanes only for overlapping groups
  const overlappingEvents = eventsWithLanes.filter((e) => e.hasOverlap);
  const maxLanes =
    overlappingEvents.length > 0
      ? Math.max(...overlappingEvents.map((e) => e.lane), 0) + 1
      : 1;

  return (
    <TimelineContext.Provider
      value={{
        containerRef: ref,
        activeEventIndex,
        totalMonths,
        isScrollTriggerEnabled,
        sizePerBlock,
      }}
    >
      <div
        ref={ref}
        className={cn(
          'flex flex-1 flex-col overflow-auto relative',
          css`
            scroll-behavior: smooth;
          `,
        )}
      >
        <div className="flex w-full flex-auto">
          <div className="w-[80px] flex-none ring-1 ring-slate-500" />
          <div className="flex flex-auto relative">
            {/* Horizontal lines */}
            <div
              className={cn(
                'absolute inset-0 flex flex-col divide-y divide-slate-500',
              )}
            >
              <div className="h-14 flex-none"></div>
              {dates.map((date, index) => {
                return (
                  <div
                    key={index}
                    className={css`
                      min-height: ${sizePerBlock};
                      flex: 1;
                    `}
                  >
                    <div
                      className={cn(
                        'sticky left-0 w-[80px] -ml-[80px] px-2',
                        'text-right text-xs leading-5 text-theme-text',
                        'transform -translate-y-[200%]',
                      )}
                    >
                      {formatMonth(
                        date,
                        date.getMonth() === 6 || date.getMonth() === 0,
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Events */}
            <ol
              className={cn(
                'relative flex flex-col w-full',
                css`
                  padding-top: ${sizePerBlock};
                `,
              )}
            >
              {eventsWithLanes.map((event, index) => {
                if (!event.child) return null;
                return (
                  <event.child.type
                    key={event.child.key || index}
                    {...event.child.props}
                    lane={event.lane}
                    maxLanes={event.hasOverlap ? maxLanes : 1}
                  />
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </TimelineContext.Provider>
  );
};

Timeline.displayName = 'Timeline';
