import { Billboard, Html } from "@react-three/drei";
import DeleteIcon from "@/assets/icons/ic_delete.svg?react";
import MoveIcon from "@/assets/icons/ic_move.svg?react";
import MoveIconVertical from "@/assets/icons/ic_move_vertical.svg?react";
import { useRoomStore } from "@/stores/useRoomStore";
import { useEffect, useState } from "react";
import RotationSlider from "./RotationSlider";

export default function ContextMenu() {
  const [show, setShow] = useState(false);
  const { selectedRef, setMode, deleteMesh, resetSelectedRef } = useRoomStore();
  const [billboardPosition, setBillboardPosition] = useState<
    [number, number, number]
  >([0, 0, 0]);
  const [verticalMoveDisabled, setVerticalMoveDisabled] = useState(false);

  const handleMoveHorizontal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setMode("moveHorizontal");
    setShow(false);
  };

  const handleMoveVertical = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setMode("moveVertical");
    setShow(false);
  };

  const handleDelete = () => {
    if (!selectedRef) return;
    deleteMesh(selectedRef.current.name);
    setMode("none");
    setShow(false);
    resetSelectedRef();
  };

  useEffect(() => {
    if (selectedRef && selectedRef.current) {
      const current = selectedRef.current;
      setBillboardPosition([
        current.position.x,
        current.position.y + 12,
        current.position.z,
      ]);
      setShow(true);
    } else {
      setShow(false);
    }
  }, [selectedRef, setBillboardPosition]);

  useEffect(() => {
    if (selectedRef) {
      setVerticalMoveDisabled(selectedRef.current.userData.isWallMountable);
    } else {
      setVerticalMoveDisabled(false);
    }
  }, [selectedRef, setVerticalMoveDisabled]);

  return show ? (
    <Billboard position={billboardPosition}>
      <Html>
        <div className="bg-slate-950/80 p-4 rounded-2xl flex flex-col gap-2">
          <RotationSlider />
          <div className="flex gap-1 ">
            <IconButton
              text={"수평이동"}
              Icon={MoveIcon}
              onClick={handleMoveHorizontal}
            />
            <IconButton
              disabled={!verticalMoveDisabled}
              text={"수직이동"}
              Icon={MoveIconVertical}
              onClick={handleMoveVertical}
            />
            <IconButton
              text={"삭제"}
              Icon={DeleteIcon}
              onClick={handleDelete}
            />
          </div>
        </div>
      </Html>
    </Billboard>
  ) : null;
}

interface IIconButton {
  disabled?: boolean;
  text: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function IconButton({ disabled = false, text, Icon, onClick }: IIconButton) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="transition-colors duration-500 disabled:bg-slate-900/90 disabled:text-slate-600 w-14 h-14 rounded-xl hover:bg-slate-950 bg-slate-900/90 border border-slate-700 font-semibold text-slate-200 text-xs flex flex-col items-center justify-center gap-0"
    >
      <Icon /> <span>{text}</span>
    </button>
  );
}
