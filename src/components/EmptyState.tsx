import React from "react";
import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  /** Main heading for the empty state */
  title?: string;
  /** Supporting description text */
  description?: string;
  /** Lucide icon component to display (defaults to Inbox) */
  icon?: LucideIcon;
  /** Primary call-to-action button */
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  /** Secondary link or button */
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  /** Compact mode — smaller padding, useful inside cards */
  compact?: boolean;
}

/**
 * DWSA Brand-Compliant Empty State Component
 *
 * Use this whenever a list, table, feed, or section has no content to display.
 * Replaces ad-hoc empty state markup across the application.
 *
 * @example
 * <EmptyState
 *   title="No modules yet"
 *   description="Create your first module to get started."
 *   action={{ label: "Create Module", onClick: openEditor }}
 * />
 */
export default function EmptyState({
  title = "Nothing here yet",
  description = "When content is added, it will appear here.",
  icon: Icon = Inbox,
  action,
  secondaryAction,
  compact = false,
}: EmptyStateProps) {
  const py = compact ? "py-8" : "py-16";

  return (
    <div
      className={`flex flex-col items-center justify-center ${py} px-4 text-center space-y-5`}
      role="status"
      aria-label={title}
    >
      {/* Icon */}
      <div className="p-4 bg-[#061428] border border-[#d4a017]/20 rounded-2xl text-[#d4a017]/60">
        <Icon className="w-8 h-8" aria-hidden="true" />
      </div>

      {/* Copy */}
      <div className="space-y-2 max-w-xs">
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <p className="text-xs text-[#8899b4] leading-relaxed">{description}</p>
      </div>

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
          {action && (
            action.href ? (
              <a
                href={action.href}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a017] to-[#e5a910] hover:from-[#e5a910] hover:to-[#d4a017] text-[#030e1f] font-extrabold text-xs shadow-md shadow-[#d4a017]/20 transition-all btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
              >
                {action.label}
              </a>
            ) : (
              <button
                onClick={action.onClick}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a017] to-[#e5a910] hover:from-[#e5a910] hover:to-[#d4a017] text-[#030e1f] font-extrabold text-xs shadow-md shadow-[#d4a017]/20 transition-all btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
              >
                {action.label}
              </button>
            )
          )}

          {secondaryAction && (
            secondaryAction.href ? (
              <a
                href={secondaryAction.href}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#0f223d] hover:bg-[#16335a] border border-[#d4a017]/30 text-[#d4a017] font-bold text-xs transition-all btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
              >
                {secondaryAction.label}
              </a>
            ) : (
              <button
                onClick={secondaryAction.onClick}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#0f223d] hover:bg-[#16335a] border border-[#d4a017]/30 text-[#d4a017] font-bold text-xs transition-all btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
              >
                {secondaryAction.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
