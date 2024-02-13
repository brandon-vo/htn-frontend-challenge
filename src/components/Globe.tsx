import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const Globe: React.FC = () => {
  const sphereGeometry = new THREE.SphereGeometry(10, 32, 32);

  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load("./images/earth_day.jpg"),
  });

  const meshRef = useRef<THREE.Mesh>(null!);
  const rotationSpeed = 0.0003;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= rotationSpeed;
    }
  });

  return (
    <mesh
      geometry={sphereGeometry}
      position={[5, -10, 0]}
      material={material}
      rotation={[0, 0, 0]}
      ref={meshRef}
      receiveShadow
    />
  );
};

export default Globe;
