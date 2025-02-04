import { useAlertStore } from "@/stores/useAlertStore";
import { useRoomStore } from "../../../stores/useRoomStore";
import { deleteFurniture as deleteFurnitureAPI } from "@/api/furniture.api";
import { useFurnituresStore } from "@/stores/useFurnituresStore";

interface FurnitureItemProps {
  id: string;
  previewUrl: string;
  scale: IFurnitureScale;
  isWallMountable: boolean;
  glbUrl: string;
}

export default function FurnitureItem({
  id,
  previewUrl,
  scale,
  isWallMountable,
  glbUrl,
}: FurnitureItemProps) {
  const { addMesh } = useRoomStore();
  const { showAlert } = useAlertStore();
  const { deleteFurniture } = useFurnituresStore();

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    showAlert({
      message: "정말 삭제하시겠습니까?",
      mainButtonLabel: "확인",
      cancelButtonLabel: "취소",
      onMainButtonClick: async () => {
        deleteFurniture(id);
        await deleteFurnitureAPI(id);
      },
    });
  };

  const handleAddMesh = () => {
    addMesh({
      id: id,
      glbUrl: glbUrl,
      isWallMountable: isWallMountable,
      scale: [scale.width, scale.height, scale.depth],
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
        <ul className="flex flex-col gap-1.5">
          <li className="font-medium text-slate-300 text-xs flex gap-3">
            <span className="min-w-9">가로</span>
            <span className="font-semibold">{scale.width}cm</span>
          </li>
          <li className="font-medium text-slate-300 text-xs flex gap-3">
            <span className="min-w-9">세로</span>
            <span className="font-semibold">{scale.depth}cm</span>
          </li>
          <li className="font-medium text-slate-300 text-xs flex gap-3">
            <span className="min-w-9">높이</span>
            <span className="font-semibold">{scale.height}cm</span>
          </li>
          <li className="font-medium text-slate-300 text-xs flex gap-3">
            <span className="min-w-9">벽 배치</span>
            <span className="font-semibold">
              {isWallMountable ? "가능" : "불가능"}
            </span>
          </li>
        </ul>
        <button
          onClick={handleDelete}
          className="rounded-md text-slate-200 bg-slate-900 font-medium w-9 h-6 text-xs"
        >
          삭제
        </button>
      </div>
    </li>
  );
}
