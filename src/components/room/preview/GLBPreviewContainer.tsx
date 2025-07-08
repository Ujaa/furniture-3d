import GLBPreview from "../preview/GLBPreview";
import { useFurnitureStore } from "@/stores/useFurnitureStore";
import BaseButton from "@/components/common/BaseButton";
import { Suspense } from "react";
import GLBPreviewLoader from "../preview/GLBPreviewLoader";
import { useFurnituresStore } from "@/stores/useFurnituresStore";

export default function GLBPreviewContainer() {
  const resetFurniture = useFurnitureStore((state) => state.resetFurniture);
  const isCreating = useFurnituresStore((state) => state.isCreating);
  const handleFinish = () => resetFurniture();

  return (
    <div className="furniture-container flex flex-col gap-3">
      <Suspense fallback={<GLBPreviewLoader />}>
        <GLBPreview />
      </Suspense>
      <p className="text-xs text-center text-slate-300 font-medium mb-3">
        가구를 360° 돌려 구경해 보세요!
      </p>
      <BaseButton
        label={isCreating ? "가구 생성 중..." : "가구 생성을 완료했어요"}
        disabled={isCreating}
        onClick={() => handleFinish()}
      />
    </div>
  );
}
