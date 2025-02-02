import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useRoomStore } from "@/stores/useRoomStore";

export default function BoxHelper() {
  const { selectedRef } = useRoomStore();
  const helperRef = useRef<ThreeRefType | null>(null);

  useEffect(() => {
    console.log();
    if (selectedRef && selectedRef.current && helperRef.current) {
      const box = new THREE.Box3().setFromObject(selectedRef.current);
      helperRef.current.box.set(box.min, box.max);
    }
  }, [selectedRef, selectedRef?.current.rotation.y]);

  return (
    <box3Helper
      ref={helperRef}
      args={[new THREE.Box3(), new THREE.Color(0x64748b)]}
    />
  );
}
