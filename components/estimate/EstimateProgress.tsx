type EstimateProgressProps = {
  current: number;
  total: number;
};

export function EstimateProgress({ current, total }: EstimateProgressProps) {
  const pct = Math.round((current / Math.max(total, 1)) * 100);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-medium text-chestnut/60">
        <span>
          Step {current} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-chestnut/10">
        <div
          className="h-full rounded-full bg-primary-red transition-all duration-300"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
