import { useAlertStore } from "@/stores/useAlertStore";
import { useRoomStore } from "@/stores/useRoomStore";
import { deleteFurniture as deleteFurnitureAPI } from "@/api/furniture/furniture.api";
import { useFurnituresStore } from "@/stores/useFurnituresStore";
import { getUserId } from "@/shared/utils/user";
import toast from "react-hot-toast";
import FurnitureInfoList from "./FurnitureInfoList";

interface FurnitureItemProps {
  id: string;
  previewUrl: string;
  size: ISize;
  isWallMountable: boolean;
  glbUrl: string;
  isSample?: boolean;
}

export default function FurnitureItem({
  id,
  previewUrl,
  size,
  isWallMountable,
  glbUrl,
  isSample = false,
}: FurnitureItemProps) {
  const addMesh = useRoomStore((state) => state.addMesh);
  const showAlert = useAlertStore((state) => state.showAlert);
  const deleteFurniture = useFurnituresStore((state) => state.deleteFurniture);

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isSample) return;
    showAlert({
      message: "정말 삭제하시겠습니까?",
      mainButtonLabel: "확인",
      cancelButtonLabel: "취소",
      onMainButtonClick: async () => {
        const userId = getUserId();
        if (!userId) {
          toast.error("사용자 ID가 없습니다.");
          return;
        }
        deleteFurniture(id);
        await deleteFurnitureAPI(userId, id);
      },
    });
  };

  const handleAddMesh = () => {
    addMesh({
      id,
      glbUrl,
      isWallMountable,
      scale: [size.width, size.height, size.depth],
      position: [0, 0, 0],
      rotation: [0, 0, 0],
    });
  };

  return (
    <li
      onClick={handleAddMesh}
      className="bg-white/10 backdrop-blur-sm p-5 rounded-xl flex gap-5 hover:cursor-pointer"
    >
      <div className="rounded-xl h-[7.5rem] aspect-square bg-slate-950/70 border border-slate-800 backdrop-blur-md">
        <img className="w-full h-full object-cover" src={previewUrl} />
      </div>
      <div className="flex justify-between gap-2 w-full">
        <FurnitureInfoList size={size} isWallMountable={isWallMountable} />
        <button
          onClick={handleDelete}
          className="rounded-md text-slate-200 bg-slate-900 font-medium w-9 h-6 text-xs disabled:opacity-25"
          disabled={isSample}
        >
          삭제
        </button>
      </div>
    </li>
  );
}
