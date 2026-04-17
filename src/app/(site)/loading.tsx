export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-paw-bounce">
          <svg className="w-12 h-12 text-primary" viewBox="0 0 40 44" fill="currentColor">
            <ellipse cx="20" cy="30" rx="10" ry="9" />
            <circle cx="8" cy="16" r="4.5" />
            <circle cx="17" cy="10" r="4" />
            <circle cx="27" cy="10" r="4" />
            <circle cx="35" cy="16" r="4.5" />
          </svg>
        </div>
        <p className="text-sm text-dark/60 font-medium">Loading...</p>
        <style>{`
          @keyframes pawBounce {
            0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
            30% { transform: translateY(-12px) scale(1.1); opacity: 0.8; }
            50% { transform: translateY(0) scale(0.95); opacity: 1; }
            70% { transform: translateY(-6px) scale(1.05); opacity: 0.9; }
          }
          .animate-paw-bounce {
            animation: pawBounce 1.4s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
}
