export default function Lights() {
  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight position={[-10, 20, 0]} />
    </>
  );
}
