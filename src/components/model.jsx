import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = () => {
  const ref = useRef();
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('./scene.gltf', (glftScene) => {
      setModel(gltf);
    });
  }, []);

  useFrame(() => {
    if (model) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={ref} scale={0.5}>
    {model && model.scene.children.map((child) => (
      <mesh key={child.uuid}>
        <bufferGeometry attach="geometry" {...child.geometry} />
        <material attach="material" {...child.material} />
      </mesh>
    ))}
  </mesh>
  );
};

export default Model;