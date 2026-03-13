type HamburgerIconProps = {
  className?: string;
};

const HamburgerIcon = ({ className = "h-5 w-5" }: HamburgerIconProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default HamburgerIcon;
