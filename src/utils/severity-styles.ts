/**
 * Shared Tailwind class mappings for severity-based styling.
 * Used across components that conditionally style based on severity level.
 */

export const severityBadgeClasses: Record<string, string> = {
  bad:  'bg-bad-bg text-bad border border-bad',
  warn: 'bg-warn-bg text-warn border border-warn',
  good: 'bg-good-bg text-good border border-good',
  info: 'bg-info-bg text-info border border-info',
};

export const severityPillClasses: Record<string, string> = {
  bad:  'bg-bad-bg text-bad',
  warn: 'bg-warn-bg text-warn',
  good: 'bg-good-bg text-good',
  info: 'bg-info-bg text-info',
};

export const severityTextClasses: Record<string, string> = {
  bad:  'text-bad',
  warn: 'text-warn',
  good: 'text-good',
  info: 'text-info',
};

export const severityBorderClasses: Record<string, string> = {
  bad:  'border-bad/30',
  warn: 'border-warn/30',
  good: 'border-good/30',
  info: 'border-info/30',
};

export const severityBorderLeftClasses: Record<string, string> = {
  bad:  'border-l-[3px] border-l-bad',
  warn: 'border-l-[3px] border-l-warn',
  good: 'border-l-[3px] border-l-good',
  info: 'border-l-[3px] border-l-info',
};

export const severityTopBarColors: Record<string, string> = {
  bad:  'before:bg-bad',
  warn: 'before:bg-warn',
  good: 'before:bg-good',
  info: 'before:bg-info',
};

export const severityChipClasses: Record<string, string> = {
  bad:  'bg-bad-bg text-bad border-bad',
  warn: 'bg-warn-bg text-warn border-warn',
  good: 'bg-good-bg text-good border-good',
  info: 'bg-info-bg text-info border-info',
};

export const topbarStatusClasses: Record<string, string> = {
  healthy:  'bg-good-bg border-good text-good',
  watch:    'bg-warn-bg border-warn text-warn',
  critical: 'bg-bad-bg border-bad text-bad',
};

export const constraintBorderClasses: Record<string, string> = {
  high:   'border-l-[3px] border-l-bad',
  medium: 'border-l-[3px] border-l-warn',
  low:    'border-l-[3px] border-l-good',
};

export const riskFillClasses: Record<string, string> = {
  bad:  'bg-bad',
  warn: 'bg-warn',
  good: 'bg-good',
};

export const riskScoreClasses: Record<string, string> = {
  bad:  'text-bad',
  warn: 'text-warn',
  good: 'text-good',
};
