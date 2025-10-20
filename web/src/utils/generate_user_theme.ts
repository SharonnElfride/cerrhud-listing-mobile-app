import tinycolor from "tinycolor2";

export function generateUserTheme(base: string) {
  const primary = tinycolor(base);
  const accent = primary.clone().lighten(20);
  const secondary = primary.clone().desaturate(20).lighten(15);
  const muted = primary.clone().desaturate(40).lighten(30);

  // Choose readable text colors based on contrast
  const primaryFg = primary.isLight() ? "#0f0f1a" : "#ffffff";
  const accentFg = accent.isLight() ? "#0f0f1a" : "#ffffff";
  const secondaryFg = secondary.isLight() ? "#0f0f1a" : "#ffffff";
  const mutedFg = muted.isLight() ? "#0f0f1a" : "#ffffff";

  return {
    "--primary": primary.toHexString(),
    "--primary-foreground": primaryFg,
    "--accent": accent.toHexString(),
    "--accent-foreground": accentFg,
    "--secondary": secondary.toHexString(),
    "--secondary-foreground": secondaryFg,
    "--muted": muted.toHexString(),
    "--muted-foreground": mutedFg,
  };
}