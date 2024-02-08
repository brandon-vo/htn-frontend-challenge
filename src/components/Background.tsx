import { Canvas } from "@react-three/fiber";
import Globe from "./Globe";
import { Stars } from "@react-three/drei";

const Background = () => {
  return (
    <div className="w-[100vh] h-[100vh] bottom-0 right-0 absolute pointer-events-none">
      <Canvas id="canvas" className="opacity-20 blur-[4px]">
        <directionalLight position={[10, 15, 0]} intensity={1.5} castShadow />
        <ambientLight intensity={1} />
        <Stars count={1000} />
        <Globe />
      </Canvas>
    </div>
  );
};

export default Background;
