import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const Globe: React.FC = () => {
  const sphereGeometry = new THREE.SphereGeometry(10, 32, 32);

  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load("./images/earth_day.jpg"),
  });

  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const rotationSpeed = 0.0003;

  const mouse = useRef<{ x: number | undefined; y: number | undefined }>({
    x: undefined,
    y: undefined,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (mouse.current) {
        mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        // console.log(mouse.current);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= rotationSpeed;
    }
    if (groupRef.current && mouse.current.x && mouse.current.y) {
      gsap.to(groupRef.current.rotation, {
        x: -mouse.current.y * 0.05,
        y: mouse.current.x * 0.05,
        duration: 3,
      });
    }
  });

  return (
    <group ref={groupRef} position={[5, -10, 0]}>
      <mesh
        ref={meshRef}
        geometry={sphereGeometry}
        material={material}
        receiveShadow
      />
    </group>
  );
};

export default Globe;
