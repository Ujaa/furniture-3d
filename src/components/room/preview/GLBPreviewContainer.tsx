import { Suspense } from "react";
import GLBPreview from "./GLBPreview";
import GLBPreviewLoader from "./GLBPreviewLoader";
import BaseButton from "@/components/common/BaseButton";
import { useFurnitureStore } from "@/stores/useFurnitureStore";
import { useFurnituresStore } from "@/stores/useFurnituresStore";
import { useGLBPreviewLogic } from "../../../hooks/useGLBPreviewLogic";

export default function GLBPreviewContainer() {
  const resetFurniture = useFurnitureStore((state) => state.resetFurniture);
  const isCreating = useFurnituresStore((state) => state.isCreating);
  const { glbUrl, onCapture, hasCaptured } = useGLBPreviewLogic();

  return (
    <div className="furniture-container flex flex-col gap-3">
      <Suspense fallback={<GLBPreviewLoader />}>
        <GLBPreview
          glbUrl={glbUrl!}
          onCapture={onCapture}
          hasCaptured={hasCaptured}
        />
      </Suspense>
      <p className="text-xs text-center text-slate-300 font-medium mb-3">
        가구를 360° 돌려 구경해 보세요!
      </p>
      <BaseButton
        label={isCreating ? "가구 생성 중..." : "가구 생성을 완료했어요"}
        disabled={isCreating}
        onClick={resetFurniture}
      />
    </div>
  );
}
