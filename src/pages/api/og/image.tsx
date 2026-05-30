import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

import { cn } from '@/utils/styles/classNames';

export const config = {
  runtime: 'experimental-edge',
};

export default async function (req: NextRequest) {
  const url = req.nextUrl;
  const title = url.searchParams.get('title') || 'www.siwakasen.dev';
  const description = url.searchParams.get('description');

  return new ImageResponse(
    (
      <div
        tw={cn('bg-slate-50', 'flex flex-col justify-center')}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',

            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(300px) saturate(150%)',
            backgroundImage: `linear-gradient(45deg, #50B4B4 50%, #D980FF 50%)`,
          }}
        />

        <div tw="flex flex-col p-16 mb-16">
          <span
            tw="mb-4"
            style={{
              fontFamily: 'serif',
              fontWeight: 700,
              fontSize: 84,
            }}
          >
            {title}
          </span>
          {Boolean(description) && (
            <span
              tw="mb-2 text-3xl text-slate-600"
              style={{ fontFamily: 'sans-serif' }}
            >
              {description}
            </span>
          )}
        </div>
        <span
          tw="absolute bottom-16 left-16 text-slate-500"
          style={{
            fontSize: 70,
          }}
        >
          🧐📋
        </span>
        <span
          tw="absolute text-2xl bottom-16 right-16 text-slate-500"
          style={{
            fontFamily: 'sans-serif',
            fontWeight: 400,
          }}
        >
          @siwakasen
        </span>
      </div>
    ),
    {
      debug: false,
      emoji: 'fluent',
    },
  );
}
