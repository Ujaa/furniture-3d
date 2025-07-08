interface IMesh {
  id: string;
  glbUrl: string;
  isWallMountable: booolean;
  position: Vector3Type;
  scale: Vector3Type;
  rotation: Vector3Type;
}

interface IFurniture {
  id?: string;
  isWallMountable: boolean;
  previewUrl: string | null;
  glbUrl: string | null;
  size: ISize;
  createdAt: string | null;
}

interface ISize {
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

interface IErrorHandlerOptions {
  message: string;
}

type ThreeRefType = React.MutableRefObject<THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.Material | THREE.Material[],
  THREE.Object3DEventMap
> | null>;

type modeType = "none" | "rotate" | "moveHorizontal" | "moveVertical";

type Vector3Type = [number, number, number];
