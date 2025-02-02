import React, { forwardRef, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import {
  EffectComposer,
  Selection,
  Outline,
} from "@react-three/postprocessing";

// forwardRef를 사용하여 내부 Mesh에 ref를 전달합니다.
const TestBox = forwardRef((props, ref) => {
  return (
    <Box ref={ref} {...props}>
      <meshStandardMaterial attach="material" color={props.color} />
    </Box>
  );
});

export default function App() {
  const boxRef = useRef(null);
  const [ready, setReady] = useState(false);

  // 렌더 후 ref가 설정되었는지 확인 (선택 프롭에 사용하기 위해)
  useEffect(() => {
    if (boxRef.current) {
      setReady(true);
      console.log("TestBox ref:", boxRef.current);
    }
  }, []);

  return (
    <div className="bg-blue-600" style={{ height: "100vh" }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: false, stencil: true }} // stencil 버퍼 활성화 필수!
      >
        <ambientLight intensity={1} />
        <OrbitControls />

        {/* Selection 내부에 넣으면 Outline 효과가 자동으로 대상에 적용됩니다 */}
        <Selection>
          <TestBox ref={boxRef} position={[0, 0, 0]} color="orange" />
        </Selection>

        <EffectComposer>
          <Outline
            // 만약 Selection으로 동작하지 않는다면, 아래처럼 selection 프롭을 직접 전달해보세요.
            // selection={boxRef.current ? [boxRef.current] : []}
            visibleEdgeColor={0xffffff} // 숫자형 리터럴
            hiddenEdgeColor={0xffffff}
            edgeStrength={10}
            blur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
