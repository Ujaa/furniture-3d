import { useCallback, useEffect, useState } from "react";
import { useRoomStore } from "@/stores/useRoomStore";
import * as THREE from "three";

export default function RotationSlider() {
  const selectedRef = useRoomStore((state) => state.selectedRef);
  const [deg, setDeg] = useState(0);

  useEffect(() => {
    if (selectedRef?.current) {
      const currentDeg = THREE.MathUtils.radToDeg(
        selectedRef.current.rotation.y
      );
      setDeg(currentDeg);
    }
  }, [selectedRef]);

  const stopPropagation = useCallback((event: React.SyntheticEvent) => {
    event.stopPropagation();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    stopPropagation(event);
    const newDeg = Number(event.target.value);
    setDeg(newDeg);
    if (selectedRef?.current) {
      selectedRef.current.rotation.y = THREE.MathUtils.degToRad(newDeg);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <label
        htmlFor="rotationSlider"
        className="flex gap-2 items-center text-slate-200 text-xs"
      >
        <span className="whitespace-nowrap">회전 {Math.floor(deg)}°</span>
      </label>
      <input
        className="custom-range"
        type="range"
        id="rotationSlider"
        name="rotationSlider"
        min="0"
        max="360"
        step={45}
        value={deg}
        onChange={handleChange}
        onPointerDown={stopPropagation}
        onPointerMove={stopPropagation}
        onPointerUp={stopPropagation}
      />
    </div>
  );
}
