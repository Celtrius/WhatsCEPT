export default function LoadingScreen({ progress }) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="animate-spin h-10 w-10 border-t-4 border-[#24D366] rounded-full mb-4"></div>
      <p className="text-lg text-[#DDDDDD] font-semibold">Loading Chat...</p>

      {/* Progress Bar */}
      <div className="w-64 h-3 bg-[#1E1E1E] rounded-full overflow-hidden mt-4">
        <div
          className="h-full bg-[#24D366] transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Progress Text */}
      <p className="text-sm text-[#DDDDDD] mt-2">{progress}%</p>
    </div>
  );
}
