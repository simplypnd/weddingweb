import type { SiteTheme } from "@/lib/site-config-schema";
import { themeCssVars } from "@/lib/theme";

export function ThemeStyles({ theme }: { theme: SiteTheme }) {
  return (
    <style
      id="site-theme"
      dangerouslySetInnerHTML={{ __html: themeCssVars(theme) }}
    />
  );
}
