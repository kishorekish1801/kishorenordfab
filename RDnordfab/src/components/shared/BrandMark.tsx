import Image from "next/image";

export default function BrandMark({
  compact = false,
}: {
  compact?: boolean;
}) {
  const size = compact ? 34 : 38;

  return (
    <span
      className={`brand-lockup ${
        compact ? "brand-lockup--compact" : ""
      }`}
    >
      <Image
        src="/rd-nordfab-logo.png"
        alt="RD Nordfab"
        width={size}
        height={size}
        className="brand-mark"
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          flexShrink: 0,
        }}
      />

      <span>RD NORDFAB</span>
    </span>
  );
}