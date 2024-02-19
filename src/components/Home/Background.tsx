import { Canvas } from "@react-three/fiber";
import Globe from "./Globe";
import { Stars } from "@react-three/drei";

const Background: React.FC = () => {
  return (
    <div className="w-screen h-screen bottom-0 right-0 absolute pointer-events-none bg-gradient-to-tl from-medium-blue to-dark-blue z-[-1]">
      <Canvas id="canvas" className="opacity-30 blur-[4px]">
        <directionalLight position={[10, 15, 0]} intensity={1.5} castShadow />
        <ambientLight intensity={1} />
        <Stars count={1000} />
        <Globe />
      </Canvas>
    </div>
  );
};

export default Background;
