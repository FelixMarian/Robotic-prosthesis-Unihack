import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Function to load the GLB model
function GLTFModel({ url }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={1} />;
}

// Function to load it 3d
export default function ArmRender({ modelUrl }) {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            {/* Light for the modl */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 10, 10]} intensity={1} />

            {/* Load the model */}
            <GLTFModel url={modelUrl} />

            {/* Controls position and zoom */}
            <OrbitControls />
        </Canvas>
    );
}
