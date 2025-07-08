import GLBPreview from "../preview/GLBPreview";
import FurnitureForm from "./FurnitureForm";
import { useFurnitureStore } from "@/stores/useFurnitureStore";
import BaseButton from "@/components/common/BaseButton";
import ImageUploader from "./ImageUploader";
import { Suspense } from "react";
import GLBPreviewLoader from "../preview/GLBPreviewLoader";
import { useFurnituresStore } from "@/stores/useFurnituresStore";

export default function FurnitureGenerator() {
  const { isCreating } = useFurnituresStore();
  const { glbUrl, previewUrl, resetFurniture } = useFurnitureStore();
  const handleFinish = () => resetFurniture();

  return (
    <div className="w-full mb-6">
      {!previewUrl && <ImageUploader />}
      {!glbUrl && previewUrl && (
        <div className="furniture-container flex flex-col gap-4 items-center">
          <img
            src={previewUrl}
            alt="미리보기"
            className="w-full aspect-square object-contain rounded-lg mb-3"
          />
          <FurnitureForm />
        </div>
      )}
      {glbUrl && (
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
      )}
    </div>
  );
}
