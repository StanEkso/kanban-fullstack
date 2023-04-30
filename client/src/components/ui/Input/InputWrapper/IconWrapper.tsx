import { Icon, IconGlyph } from "../../Icon";

export type Props = {
  glyph: IconGlyph;
};

export function IconWrapper(props: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon glyph={props.glyph} />
    </div>
  );
}
