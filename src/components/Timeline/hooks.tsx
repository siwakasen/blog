import { createContext, useContext } from 'react';

type TimelineContextAPI = {
  containerRef: React.MutableRefObject<HTMLDivElement | null> | null;
  totalMonths: number;
  activeEventIndex?: number;
  isScrollTriggerEnabled?: boolean;
  sizePerBlock: string;
};

export const TimelineContext = createContext<TimelineContextAPI>({
  containerRef: null,
  totalMonths: 0,
  activeEventIndex: undefined,
  isScrollTriggerEnabled: false,
  sizePerBlock: '',
});

export const useTimelineContext = () => useContext(TimelineContext);
