interface IMesh {
  id: string;
  glbUrl: string;
  isWallMountable: booolean;
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
}

interface IFurniture {
  id?: string;
  isWallMountable: boolean;
  previewUrl: string | null;
  glbUrl: string | null;
  scale: IFurnitureScale;
  createdAt: string | null;
}

interface IFurnitureScale {
  width: number;
  height: number;
  depth: number;
}

interface IAlert {
  message: string;
  mainButtonLabel: string;
  onMainButtonClick: () => void;
  cancelButtonLabel?: string;
  cancelButtonClick?: () => void;
}

type ThreeRefType = React.MutableRefObject<THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.Material | THREE.Material[],
  THREE.Object3DEventMap
> | null>;

type modeType = "none" | "rotate" | "moveHorizontal" | "moveVertical";
