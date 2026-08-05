/**
 * ThemeService.ts
 * InstitutionOS v4.0 — Dynamic Theme Engine & CSS Variable Mapping
 */

import { TenantService } from "./TenantService";
import type { TenantTheme, ThemeTokens, ThemeMode } from "@/types/tenant";

export interface CompiledTheme {
  mode: ThemeMode;
  tokens: ThemeTokens;
  cssVariableMap: Record<string, string>;
  className: string;
}

const TOKEN_MAP: Record<keyof ThemeTokens, string> = {
  colorBackground: "--theme-bg",
  colorSurface: "--theme-surface",
  colorBorder: "--theme-border",
  colorPrimary: "--theme-primary",
  colorSecondary: "--theme-secondary",
  colorAccent: "--theme-accent",
  colorTextPrimary: "--theme-text-primary",
  colorTextSecondary: "--theme-text-secondary",
  colorTextMuted: "--theme-text-muted",
  radiusCard: "--theme-radius-card",
  radiusButton: "--theme-radius-btn",
  shadowCard: "--theme-shadow-card",
};

export class ThemeService {
  public static compileTheme(tenantId: string): CompiledTheme {
    const theme = TenantService.getTheme(tenantId);
    const cssVariableMap: Record<string, string> = {};

    (Object.keys(theme.tokens) as (keyof ThemeTokens)[]).forEach((key) => {
      const cssVar = TOKEN_MAP[key];
      if (cssVar) cssVariableMap[cssVar] = theme.tokens[key];
    });

    return {
      mode: theme.mode,
      tokens: theme.tokens,
      cssVariableMap,
      className: `theme-${theme.mode}`,
    };
  }

  public static getThemeForTenant(tenantId: string): TenantTheme {
    return TenantService.getTheme(tenantId);
  }

  public static generateCssVarBlock(tenantId: string): string {
    const compiled = this.compileTheme(tenantId);
    const vars = Object.entries(compiled.cssVariableMap)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join("\n");
    return `:root {\n${vars}\n}`;
  }
}
