import { useFurnitureStore } from "@/stores/useFurnitureStore";
import FurnitureCheckbox from "./FurnitureCheckbox";
import FurnitureScaleInput from "./FurnitureScaleInput";
import BaseButton from "@/components/common/BaseButton";
import { useFurnituresStore } from "@/stores/useFurnituresStore";
import { uploadGLBToStorage } from "@/api/furniture/furniture.api";

export default function FurnitureForm() {
  const { imageFile, size, setSize, setGlbUrl, resetFurniture } =
    useFurnitureStore();
  const { isCreating, setIsCreating } = useFurnituresStore();

  const handleCreateGLB = async () => {
    if (!imageFile) return;
    setIsCreating(true);
    try {
      const glbUrl = await uploadGLBToStorage(imageFile);
      setGlbUrl(glbUrl);
    } catch (error) {
      console.error("GLB 업로드 실패:", error);
      // 에러는 이미 stability.api.ts에서 toast로 표시됨
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <form className="flex flex-wrap gap-2 mb-4">
        <h2 className="text-sm mb-2 font-semibold">가구 정보 입력하기</h2>
        <br />
        <FurnitureScaleInput
          label={"가로"}
          value={size.width}
          onChange={(event) => {
            const newValue = Math.min(1000, parseInt(event.target.value) || 0);
            setSize({ ...size, width: newValue });
          }}
        />
        <FurnitureScaleInput
          label={"세로"}
          value={size.depth}
          onChange={(event) => {
            const newValue = Math.min(1000, parseInt(event.target.value) || 0);
            setSize({ ...size, depth: newValue });
          }}
        />
        <FurnitureScaleInput
          label={"높이"}
          value={size.height}
          onChange={(event) => {
            const newValue = Math.min(1000, parseInt(event.target.value) || 0);
            setSize({ ...size, height: newValue });
          }}
        />
        <FurnitureCheckbox />
      </form>
      <div className="flex gap-2 w-full">
        <button
          onClick={() => resetFurniture()}
          className="flex-2 bg-slate-900 hover:bg-slate-950 transition-colors duration-300 py-2 px-4 rounded-lg text-sm text-slate-400 font-semibold"
        >
          취소하기
        </button>
        <BaseButton
          disabled={
            isCreating || !(size.width > 1 && size.height > 1 && size.depth > 1)
          }
          onClick={handleCreateGLB}
          label={isCreating ? "3D 가구 생성중..." : "3D 가구 생성하기"}
        />
      </div>
    </>
  );
}
