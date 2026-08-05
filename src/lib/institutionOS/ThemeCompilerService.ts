/**
 * ThemeCompilerService.ts
 * InstitutionOS v4.0 — CSS Variable Injection & Theme Compilation Engine
 */

import { ThemeService } from "./ThemeService";

export class ThemeCompilerService {
  /** Compile full CSS :root block for a tenant */
  public static compileCssRoot(tenantId: string): string {
    return ThemeService.generateCssVarBlock(tenantId);
  }

  /** Return inline style object for React components */
  public static getInlineStyleVars(tenantId: string): React.CSSProperties {
    const compiled = ThemeService.compileTheme(tenantId);
    return compiled.cssVariableMap as unknown as React.CSSProperties;
  }

  /** Return a CSS class name for the current theme mode */
  public static getThemeClass(tenantId: string): string {
    return ThemeService.compileTheme(tenantId).className;
  }

  /** Preview theme diff between two tenants */
  public static compareThemes(tenantIdA: string, tenantIdB: string): Record<string, { a: string; b: string }> {
    const a = ThemeService.compileTheme(tenantIdA).cssVariableMap;
    const b = ThemeService.compileTheme(tenantIdB).cssVariableMap;
    const diff: Record<string, { a: string; b: string }> = {};
    const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
    allKeys.forEach((key) => {
      if (a[key] !== b[key]) {
        diff[key] = { a: a[key] ?? "unset", b: b[key] ?? "unset" };
      }
    });
    return diff;
  }
}
