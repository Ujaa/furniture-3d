import { Billboard, Html } from "@react-three/drei";
import DeleteIcon from "@/assets/icons/ic_delete.svg?react";
import MoveIcon from "@/assets/icons/ic_move.svg?react";
import MoveIconVertical from "@/assets/icons/ic_move_vertical.svg?react";
import { useRoomStore } from "@/stores/useRoomStore";
import { useEffect, useState } from "react";
import RotationSlider from "./RotationSlider";
import IconButton from "./IconButton";

export default function ContextMenu() {
  const selectedRef = useRoomStore((s) => s.selectedRef);
  const setMode = useRoomStore((s) => s.setMode);
  const deleteMesh = useRoomStore((s) => s.deleteMesh);
  const resetSelectedRef = useRoomStore((s) => s.resetSelectedRef);

  const [show, setShow] = useState(false);
  const [billboardPosition, setBillboardPosition] = useState<Vector3Type>([
    0, 0, 0,
  ]);
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
    if (!selectedRef || !selectedRef.current) {
      setShow(false);
      return;
    }
    const current = selectedRef.current;
    setBillboardPosition([
      current.position.x,
      current.position.y + 12,
      current.position.z,
    ]);
    setShow(true);
  }, [selectedRef, setBillboardPosition]);

  useEffect(() => {
    if (selectedRef) {
      setVerticalMoveDisabled(selectedRef.current.userData.isWallMountable);
    } else {
      setVerticalMoveDisabled(false);
    }
  }, [selectedRef, setVerticalMoveDisabled]);

  if (!selectedRef) return null;

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
