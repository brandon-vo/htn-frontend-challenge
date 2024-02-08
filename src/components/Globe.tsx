import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const Globe = () => {
  const sphereGeometry = new THREE.SphereGeometry(10, 32, 32);

  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load("./images/earth_day.jpg"),
  });

  const meshRef = useRef();
  const rotationSpeed = 0.0003;

  useFrame(() => {
    if (meshRef.current) {
      // @ts-ignore
      meshRef.current.rotation.y -= rotationSpeed;
    }
  });

  return (
    <mesh
      geometry={sphereGeometry}
      position={[5, -10, 0]}
      material={material}
      rotation={[0, 0, 0]}
      // @ts-ignore
      ref={meshRef}
      receiveShadow
    />
  );
};

export default Globe;
