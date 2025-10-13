/*
{
  "profiles": { "create": false, "read": true, "update": false, "delete": false },
  "medical_tests": { "create": true, "read": true, "update": true, "delete": false }
}

- Profile

function getColorFromName(name: string) {
  const colors = ['#6e4596', '#f94caf', '#d9d5e8', '#62c3e3', '#f5b945'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

const profile_color = getColorFromName(first_name + surname);
await supabase.from("users").insert({ first_name, surname, email, profile_color });

const themeColor = user.profile_color ?? '#6e4596';
const secondary = tinycolor(themeColor).lighten(10).toHexString();
const tertiary = tinycolor(themeColor).darken(15).toHexString();

- Profile 2

npm install tinycolor2

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

- UserProfile

import { useEffect } from "react";
import { generateUserTheme } from "@/utils/colors";

function UserProfile({ user }) {
  useEffect(() => {
    if (user.profile_color) {
      const theme = generateUserTheme(user.profile_color);
      for (const [key, value] of Object.entries(theme)) {
        document.documentElement.style.setProperty(key, value);
      }
    }
    return () => {
      // Reset to lab default when leaving profile
      document.documentElement.removeAttribute("style");
    };
  }, [user.profile_color]);

  return (
    <div className="p-8">
      <h1 className="text-primary text-2xl font-semibold">
        {user.first_name} {user.surname}
      </h1>
      {/* profile content *}
    </div>
  );
}

*/
