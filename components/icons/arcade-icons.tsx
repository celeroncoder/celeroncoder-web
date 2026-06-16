// Nucleo Arcade icon set — inline SVG components
// Colors: var(--color-contrast-high) → currentColor, hsl(…/0) → transparent
// size defaults to "1em" — icon scales automatically with the surrounding font-size

type IconProps = {
  className?: string;
  size?: string | number;
};

export function ArcadeChevronLeft({ className, size = "1em" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle" }}>
      <g fill="none" strokeLinejoin="miter" strokeLinecap="butt">
        <path d="M27.01 7H27" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.01 11H27" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.01 15H27" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.01 19H27" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.01 23H27" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.01 27H27" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.01 7H23" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.01 11H23" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.01 15H23" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.01 19H23" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.01 23H23" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.01 27H23" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.01 7H19" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.01 11H19" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.01 15H19" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.01 19H19" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.01 23H19" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.01 27H19" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.01 7H15" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.01 11H15" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.01 19H15" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.01 15H15" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.01 23H15" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.01 27H15" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.01 7H11" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.01 11H11" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.01 15H11" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.01 19H11" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.01 23H11" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.01 27H11" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.01001 7H7.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.01001 11H7.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.01 3H23" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.01 3H27" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.01 3H19" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.01 3H15" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.01 3H11" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.01001 3H7.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.01001 3H3.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.01001 15H7.00001" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.01001 19H7.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.01001 23H7.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.01001 27H3.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.01001 27H7.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.01001 7H3.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.01001 11H3.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.01001 15H3.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.01001 19H3.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.01001 23H3.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
      </g>
    </svg>
  );
}

export function ArcadeChevronRight({ className, size = "1em" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle" }}>
      <g fill="none" strokeLinejoin="miter" strokeLinecap="butt">
        <path d="M3 7H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 11H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 15H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 19H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 23H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 27H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 7H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 11H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 15H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 19H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 23H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 27H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 7H11.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 11H11.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 19H11.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 23H11.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 27H11.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 7H15.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 11H15.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 19H15.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 15H15.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M10.99 15H11" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 23H15.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 27H15.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 7H19.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 11H19.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 15H19.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 19H19.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 23H19.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 27H19.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 7H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 11H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 3H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 3H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 3H11.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 3H15.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 3H19.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 3H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 3H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 15H23.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 19H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 23H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 27H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 27H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 7H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 11H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 15H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 19H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 23H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
      </g>
    </svg>
  );
}

export function ArcadeArrowLeft({ className, size = "1em" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle" }}>
      <g fill="none" strokeLinejoin="miter" strokeLinecap="butt">
        <path d="M7.00488 2.995L7.00488 3.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.0049 2.995L11.0049 3.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.0049 2.995L15.0049 3.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.0049 2.995L19.0049 3.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.0051 2.995L23.0051 3.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.0051 2.995L27.0051 3.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.00488 6.995L7.00488 7.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.0049 6.995L11.0049 7.005" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.0049 6.995L15.0049 7.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.0049 6.995L19.0049 7.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.0051 6.995L23.0051 7.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.0051 6.995L27.0051 7.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.00488 10.995L7.00488 11.005" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.0049 10.995L11.0049 11.005" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.0049 10.995L15.0049 11.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.0049 10.995L19.0049 11.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.0051 10.995L23.0051 11.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.0051 10.995L27.0051 11.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.00488 14.995L7.00488 15.005" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.0049 14.995L11.0049 15.005" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.0049 14.995L15.0049 15.005" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.0049 14.995L19.0049 15.005" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.0051 14.995L23.0051 15.005" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.0051 14.995L27.0051 15.005" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.00488 18.995L7.00488 19.005" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.0049 18.995L11.0049 19.005" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.0049 18.995L15.0049 19.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.0049 18.995L19.0049 19.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.0051 18.995L23.0051 19.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.0051 18.995L27.0051 19.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.00488 22.995L7.00488 23.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.0049 22.995L11.0049 23.005" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.00488 6.995L3.00488 7.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.00488 2.995L3.00488 3.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.00488 10.995L3.00488 11.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.00488 14.995L3.00488 15.005" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.00488 18.995L3.00488 19.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.00488 22.995L3.00488 23.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.00488 26.995L3.00488 27.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.0049 22.995L15.0049 23.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.0049 22.995L19.0049 23.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.0051 22.995L23.0051 23.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.0051 26.995L27.0051 27.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.0051 22.995L27.0051 23.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.00488 26.995L7.00488 27.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.0049 26.995L11.0049 27.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.0049 26.995L15.0049 27.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.0049 26.995L19.0049 27.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.0051 26.995L23.0051 27.005" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
      </g>
    </svg>
  );
}

export function ArcadeArrowUpRight({ className, size = "1em" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle" }}>
      <g fill="none" strokeLinejoin="miter" strokeLinecap="butt">
        <path d="M3 7H3.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 11H3.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 15H3.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 19H3.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 23H3.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 27H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 11H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 7H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 15H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 23H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 27H7.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 7H11.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 3H11.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 11H11.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M14.99 11H15" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 15H11.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 19H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 19H11.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 27H11.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 7H15.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M18.99 7H19" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 15H15.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 23H15.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 23H11.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 19H15.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 27H15.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 11H19.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 19H19.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 15H19.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 23H19.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 27H19.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 7H23.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 3H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 3H3.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 3H15.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 3H19.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 3H23.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 3H27.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 15H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 11H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 19H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 23H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 27H27.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 27H23.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 7H27.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 11H27.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 15H27.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 19H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 23H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
      </g>
    </svg>
  );
}

export function ArcadeLock({ className, size = "1em" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle" }}>
      <g fill="none" strokeLinejoin="miter" strokeLinecap="butt">
        <path d="M3 7H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 11H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 15H3.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 19H3.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 23H3.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 27H3.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 7H7.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 11H7.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 15H7.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 19H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 23H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 27H7.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 7H11.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 11H11.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 15H11.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 19H11.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 23H11.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 27H11.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 7H15.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 11H15.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 15H15.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 19H15.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 23H15.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 7H19.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 11H19.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 15H19.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 19H19.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 23H19.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 27H19.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 7H23.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 11H23.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 3H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 3H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 3H11.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 3H15.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 3H19.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 3H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 3H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 15H23.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 19H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 23H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 27H23.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 27H15.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 7H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 11H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 15H27.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 19H27.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 23H27.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 27H27.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
      </g>
    </svg>
  );
}

export function ArcadeMediaPlay({ className, size = "1em" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle" }}>
      <g fill="none" strokeLinejoin="miter" strokeLinecap="butt">
        <path d="M3 7H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 11H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 15H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 19H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 23H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 27H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 7H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 11H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 15H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 19H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 23H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 27H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 7H11.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 11H11.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 15H11.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 19H11.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 23H11.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 27H11.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 7H15.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 11H15.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 15H15.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 19H15.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 23H15.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 27H15.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 7H19.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 11H19.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 15H19.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 19H19.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 23H19.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 27H19.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 7H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 11H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7 3H7.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3 3H3.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11 3H11.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15 3H15.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19 3H19.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 3H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 3H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 15H23.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 19H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 23H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 27H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23 27H23.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 7H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 11H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 15H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 19H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27 23H27.01" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
      </g>
    </svg>
  );
}

export function ArcadeUTurnLeft({ className, size = "1em" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle" }}>
      <g fill="none" strokeLinejoin="miter" strokeLinecap="butt">
        <path d="M27.01 7H27" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.01 11H27" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.01 15H27" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.01 19H27" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.01 23H27" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.01 27H27" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.01 7H23" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.01 11H23" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.01 15H23" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.01 23H23" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.01 27H23" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.01 7H19" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.01 11H19" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.02 11H15.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.01 15H19" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.01 19H23" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.01 19H19" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.01 27H19" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.01 7H15" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.02 7H11.01" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.01 15H15" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.01 23H15" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.01 23H19" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.01 19H15" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.01 27H15" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.01 11H11" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.01 19H11" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.01 15H11" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.01 23H11" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.01 27H11" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.01001 7H7.00001" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M23.01 3H23" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M27.01 3H27" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M19.01 3H19" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M15.01 3H15" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M11.01 3H11" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.01001 3H7.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.01001 3H3.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.01001 15H7.00001" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.01001 11H7.00001" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.01001 19H7.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.01001 23H7.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.01001 27H3.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M7.01001 27H7.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.01001 7H3.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.01001 11H3.00001" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.01001 15H3.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.01001 19H3.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
        <path d="M3.01001 23H3.00001" stroke="transparent" strokeWidth="4" strokeLinecap="square"/>
      </g>
    </svg>
  );
}
