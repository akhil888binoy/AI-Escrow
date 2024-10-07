import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import skullScene from "../assets/3d/skull.glb";
import { a } from "@react-spring/three";

const Skull = (props) => {
    const skullRef = useRef();
    const {nodes , materials} = useGLTF(skullScene);
    useFrame(() => {
        if (skullRef.current) {
          skullRef.current.rotation.y += 0.01; // Adjust the rotation speed as needed
        }
      });
  return (
    <a.group {...props} ref={skullRef}>
      
          <mesh
            geometry={nodes.defaultMaterial.geometry}
            material={materials.Rosa_material}
          />
          <mesh
            geometry={nodes.defaultMaterial_1.geometry}
            material={materials.defaultMat_material}
          />
        
    </a.group>
  )
}

export default Skull;