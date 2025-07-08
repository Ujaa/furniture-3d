import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Lights from "../scene/Lights";
import PostEffect from "../scene/PostEffect";

interface GLBPreviewProps {
  glbUrl: string;
  onCapture: (img: string) => void;
  hasCaptured: boolean;
}

function CaptureHelper({
  onCapture,
  hasCaptured,
}: {
  onCapture: (img: string) => void;
  hasCaptured: boolean;
}) {
  const { gl, scene, camera } = useThree();
  useFrame(() => {
    if (hasCaptured) return;
    gl.render(scene, camera);
    const imageUrl = gl.domElement.toDataURL("image/png");
    onCapture(imageUrl);
  });
  return null;
}

export default function GLBPreview({
  glbUrl,
  onCapture,
  hasCaptured,
}: GLBPreviewProps) {
  const { scene } = useGLTF(glbUrl!);
  return (
    <div className="w-full aspect-square rounded-xl bg-slate-950/70 border border-slate-800 backdrop-blur-md">
      <Canvas camera={{ position: [0, 10, -20], fov: 50 }}>
        <CaptureHelper onCapture={onCapture} hasCaptured={hasCaptured} />
        <Lights />
        <PostEffect />
        <primitive object={scene} scale={[15, 15, 15]} position={[0, -3, 0]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
