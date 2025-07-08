export default function ErrorFallback() {
  return (
    <div className="text-white w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-sm font-semibold tracking-tight leading-7">
        에러가 발생했습니다.
      </h1>
      <p className="text-sm tracking-tight leading-7">
        잠시 후 다시 시도해주세요.
      </p>
    </div>
  );
}
