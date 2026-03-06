import { createElement } from "react";
import type { SVGProps } from "react";

type SvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function buildSvgProps(size: number, props: SVGProps<SVGSVGElement>) {
  const ariaHidden = props["aria-label"] ? undefined : true;

  return {
    "aria-hidden": ariaHidden,
    focusable: "false",
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    ...props,
  };
}

export const ArrowBackIcon = ({ size = 24, ...props }: SvgProps) =>
  createElement(
    "svg",
    buildSvgProps(size, props),
    createElement("path", {
      fill: "currentColor",
      d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
    })
  );

export const ArrowForwardIcon = ({ size = 24, ...props }: SvgProps) =>
  createElement(
    "svg",
    buildSvgProps(size, props),
    createElement("path", {
      fill: "currentColor",
      d: "m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z",
    })
  );

export const ShoppingCartIcon = ({ size = 24, ...props }: SvgProps) =>
  createElement(
    "svg",
    buildSvgProps(size, props),
    createElement("path", {
      fill: "currentColor",
      d: "M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z",
    })
  );

export const PersonIcon = ({ size = 24, ...props }: SvgProps) =>
  createElement(
    "svg",
    buildSvgProps(size, props),
    createElement("path", {
      fill: "currentColor",
      d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    })
  );

export const MessageIcon = ({ size = 24, ...props }: SvgProps) =>
  createElement(
    "svg",
    buildSvgProps(size, props),
    createElement("path", {
      fill: "currentColor",
      d: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z",
    })
  );

  export const ExpandMoreIcon = ({ size = 24, ...props }: SvgProps) =>
  createElement(
    "svg",
    buildSvgProps(size, props),
    createElement("path", {
      fill: "currentColor",
      d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z",
    })
  );

  export const SearchIcon = ({ size = 24, ...props }: SvgProps) =>
  createElement(
    "svg",
    buildSvgProps(size, props),
    createElement("path", {
      fill: "currentColor",
      d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
    })
  );

  export const XIcon = ({ size = 24, ...props }: SvgProps) =>
  createElement(
    "svg",
    buildSvgProps(size, props),
    createElement("path", {
      fill: "currentColor",
      d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    })
  );

  export const YouTubeIcon = ({ size = 24, ...props }: SvgProps) =>
  createElement(
    "svg",
    buildSvgProps(size, props),
    createElement("path", {
      fill: "currentColor",
      d: "M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z",
    })
  );

export const InstagramIcon = ({ size = 24, ...props }: SvgProps) =>
  createElement(
    "svg",
    buildSvgProps(size, props),
    createElement("path", {
      fill: "currentColor",
      d: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z",
    })
  );

export const LinkedInIcon = ({ size = 24, ...props }: SvgProps) =>
  createElement(
    "svg",
    buildSvgProps(size, props),
    createElement("path", {
      fill: "currentColor",
      d: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
    })
  );

export const TikTokIcon = ({ size = 24, ...props }: SvgProps) =>
  createElement(
    "svg",
    buildSvgProps(size, { viewBox: "0 0 600 600", ...props }),
    createElement("path", {
      fill: "currentColor",
      d: "M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0 0 0 67 20.14Z",
    })
  );

export const LanguegeIcon = ({ size = 24, ...props }: SvgProps) =>
  createElement(
    "svg",
    buildSvgProps(size, props),
    createElement("path", {
      fill: "currentColor",
      d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z",
    })
  );
