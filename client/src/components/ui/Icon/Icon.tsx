import { SVGProps } from "react";

import * as Icons from "./icons";

export type IconGlyph = keyof typeof Icons;

export type IconProps = {
  glyph: IconGlyph;
} & SVGProps<SVGSVGElement>;

export { Icons };

export function Icon({ glyph, ...restProps }: IconProps) {
  const Component = Icons[glyph];
  if (Component) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Component {...restProps} />
      </div>
    );
  }

  console.warn("Unknown icon glyph to render", glyph);
  return null;
}
