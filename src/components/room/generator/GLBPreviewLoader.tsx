import LoadingBouncingBall from "@/components/common/LoadingBouncingBall";

export default function GLBPreviewLoader() {
  return (
    <div className="w-full aspect-square rounded-xl bg-slate-950/70 text-sm text-slate-400 flex flex-col items-center justify-center gap-3">
      <LoadingBouncingBall />
      모델 로딩중
    </div>
  );
}
