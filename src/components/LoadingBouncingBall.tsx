export default function LoadingBouncingBall() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-dot-bounce animation-delay-0"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-dot-bounce animation-delay-16"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-dot-bounce animation-delay-32"></div>
      </div>
    </div>
  );
}
