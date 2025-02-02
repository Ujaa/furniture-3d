import { useFurnitureStore } from "@/stores/useFurnitureStore";
import FurnitureCheckbox from "./FurnitureCheckbox";
import FurnitureScaleInput from "./FurnitureScaleInput";
import BaseButton from "@/components/BaseButton";
import { uploadGLBToStorage } from "@/api/furniture.api";
import { useState } from "react";

export default function FurnitureForm() {
  const { imageFile, scale, setScale, setGlbUrl, resetFurniture } =
    useFurnitureStore();
  const [loading, setLoading] = useState(false);

  const handleCreateGLB = async () => {
    if (!imageFile) return;
    setLoading(true);
    try {
      const glbUrl = await uploadGLBToStorage(imageFile);
      setGlbUrl(glbUrl);
    } catch (error) {
      console.error("GLB 업로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="flex flex-wrap gap-2 mb-3">
        <FurnitureScaleInput
          label={"가로"}
          value={scale.width}
          onChange={(event) => {
            const newValue = Math.min(1000, parseInt(event.target.value) || 0);
            setScale({ ...scale, width: newValue });
          }}
        />
        <FurnitureScaleInput
          label={"세로"}
          value={scale.depth}
          onChange={(event) => {
            const newValue = Math.min(1000, parseInt(event.target.value) || 0);
            setScale({ ...scale, depth: newValue });
          }}
        />
        <FurnitureScaleInput
          label={"높이"}
          value={scale.height}
          onChange={(event) => {
            const newValue = Math.min(1000, parseInt(event.target.value) || 0);
            setScale({ ...scale, height: newValue });
          }}
        />
        <FurnitureCheckbox />
      </form>
      <div className="flex gap-2 w-full">
        <button
          onClick={() => resetFurniture()}
          className="flex-2 bg-slate-900 py-2 px-4 rounded-lg text-sm text-slate-400 font-semibold"
        >
          취소하기
        </button>
        <BaseButton
          disabled={
            loading || !(scale.width > 1 && scale.height > 1 && scale.depth > 1)
          }
          onClick={handleCreateGLB}
          label={loading ? "3D 가구 생성중..." : "3D 가구 생성하기"}
        />
      </div>
    </>
  );
}
