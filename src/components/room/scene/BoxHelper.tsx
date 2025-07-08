import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useRoomStore } from "@/stores/useRoomStore";

export default function BoxHelper() {
  const { selectedRef } = useRoomStore();
  const { scene } = useThree();
  const helperRef = useRef<THREE.Box3Helper | null>(null);

  useEffect(() => {
    if (selectedRef?.current) {
      if (helperRef.current) {
        scene.remove(helperRef.current);
        helperRef.current.dispose();
        helperRef.current = null;
      }

      const helper = new THREE.Box3Helper(
        new THREE.Box3(),
        new THREE.Color(0x64748b)
      );
      scene.add(helper);
      helperRef.current = helper;
    } else {
      if (helperRef.current) {
        scene.remove(helperRef.current);
        helperRef.current.dispose();
        helperRef.current = null;
      }
    }
  }, [selectedRef, scene]);

  useFrame(() => {
    if (selectedRef?.current && helperRef.current) {
      const box = new THREE.Box3().setFromObject(selectedRef.current);
      helperRef.current.box.set(box.min, box.max);
      helperRef.current.updateMatrixWorld(true);
    }
  });

  return null;
}
