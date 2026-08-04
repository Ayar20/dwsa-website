export default function Loading() {
  return (
    <div
      className="min-h-screen bg-[#030e1f] flex items-center justify-center px-4"
      aria-label="Page loading"
      aria-busy="true"
      role="status"
    >
      <div className="w-full max-w-3xl space-y-8 animate-fadeInUp">

        {/* Brand pulse */}
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-[#d4a017] to-[#e5a910] rounded-2xl animate-pulse-gold" aria-hidden="true" />
        </div>

        {/* Page title skeleton */}
        <div className="space-y-3">
          <div className="h-8 w-3/5 mx-auto animate-skeleton rounded-xl" aria-hidden="true" />
          <div className="h-4 w-2/5 mx-auto animate-skeleton rounded-lg" aria-hidden="true" />
        </div>

        {/* Content rows skeleton */}
        <div className="space-y-4">
          <div className="h-24 w-full animate-skeleton rounded-2xl" aria-hidden="true" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-16 animate-skeleton rounded-xl" aria-hidden="true" />
            <div className="h-16 animate-skeleton rounded-xl" aria-hidden="true" />
            <div className="h-16 animate-skeleton rounded-xl" aria-hidden="true" />
          </div>
          <div className="h-24 w-full animate-skeleton rounded-2xl" aria-hidden="true" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 animate-skeleton rounded-2xl" aria-hidden="true" />
            <div className="h-32 animate-skeleton rounded-2xl" aria-hidden="true" />
          </div>
        </div>

        {/* Loading label — screen readers only */}
        <span className="sr-only">Loading page content, please wait…</span>

      </div>
    </div>
  );
}
