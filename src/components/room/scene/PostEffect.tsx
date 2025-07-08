import { EffectComposer, N8AO, ToneMapping } from "@react-three/postprocessing";

export default function PostEffect() {
  return (
    <EffectComposer>
      <N8AO halfRes aoSamples={5} aoRadius={0.5} intensity={1} />
      <ToneMapping
        resolution={128}
        middleGrey={0.2}
        maxLuminance={12.0}
        averageLuminance={1.0}
        adaptationRate={1.0}
      />
    </EffectComposer>
  );
}
