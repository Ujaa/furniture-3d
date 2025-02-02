import * as THREE from "three";

export function detectCollision(
  object: THREE.Object3D,
  house: THREE.BufferGeometry
) {
  object.updateMatrixWorld(true);
  const objectBox = new THREE.Box3().setFromObject(object);

  let collisionFound = false;

  // BVH 기반 narrow-phase 검사: shapecast를 사용하여 삼각형 단위로 검사
  if (house.boundsTree) {
    house.boundsTree.shapecast({
      // 각 BVH 노드의 bounding box가 object의 AABB와 겹치는지 검사
      intersectsBounds: (box) => {
        return box.intersectsBox(objectBox);
      },
      // 실제 삼각형 단위 검사
      intersectsTriangle: (triangle) => {
        // 간단화를 위해 삼각형의 AABB를 계산하여 objectBox와 비교
        const triBox = new THREE.Box3().setFromPoints([
          triangle.a,
          triangle.b,
          triangle.c,
        ]);
        if (triBox.intersectsBox(objectBox)) {
          collisionFound = true;
          return true;
        }
        return false;
      },
    });
  }
  return collisionFound;
}
