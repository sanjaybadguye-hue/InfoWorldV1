interface BrandLogoProps {
  compact?: boolean;
}

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none whitespace-nowrap shrink-0">
      {/* Crimson arched crescent & dot mark */}
      <svg
        viewBox="0 0 44 36"
        className={compact ? 'w-7 h-6 shrink-0' : 'w-9 h-7 shrink-0'}
        aria-hidden="true"
      >
        {/* Lower sweeping crimson arc */}
        <path
          d="M5 30C4.5 21 11.5 13 21.5 13C27 13 31.5 15.6 34.2 19.4C30.8 17.7 26.8 17.2 22.8 18.2C16.2 19.8 11.6 24.6 10.6 30.8C8.4 31.2 6.2 30.8 5 30Z"
          fill="#C81E2B"
        />
        {/* Upper tilted crimson crescent */}
        <path
          d="M11.5 11.8C16.8 5.2 26.8 2.8 35.5 6.8C32.2 8.2 27.6 8.6 23.4 9.8C18.8 11.1 14.8 13.3 11.5 11.8Z"
          fill="#C81E2B"
        />
        {/* Accent oval dot */}
        <ellipse cx="32.5" cy="11.2" rx="3.4" ry="2.7" transform="rotate(-18 32.5 11.2)" fill="#C81E2B" />
      </svg>

      {compact ? (
        <span className="inline-flex items-baseline gap-1.5 leading-none">
          <span className="font-sans font-extrabold tracking-tight text-lg sm:text-xl">
            <span className="text-[#C81E2B]">Info</span>
            <span className="text-[#111111]">World</span>
          </span>
          <span className="font-serif font-medium text-sm sm:text-base text-[#111111]">
            Technologies
          </span>
        </span>
      ) : (
        <span className="inline-flex flex-col leading-none">
          <span className="font-sans font-extrabold tracking-tight text-xl sm:text-2xl leading-[0.95]">
            <span className="text-[#C81E2B]">Info</span>
            <span className="text-[#111111]">World</span>
          </span>
          <span className="font-serif font-medium text-sm sm:text-base text-[#111111] tracking-tight mt-0.5">
            Technologies
          </span>
        </span>
      )}
    </span>
  );
}
