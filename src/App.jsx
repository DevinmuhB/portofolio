import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Html, Box } from '@react-three/drei';
import * as THREE from 'three';
import { Menu, X, Github, Linkedin, Mail, Phone, Facebook, Instagram, Send } from 'lucide-react';
import emailjs from 'emailjs-com';
import { motion, AnimatePresence } from "framer-motion";
import profileImg from "./assets/images/profile.png";

const TypingAnimation = ({ texts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];
      
      if (!isDeleting) {
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts]);

  return (
    <span className="text-xl md:text-2xl lg:text-3xl text-blue-400 font-mono">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const TechIcon = ({ name, color, position }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
      <Html distanceFactor={12}>
        <div className="bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-bold whitespace-nowrap shadow-xl border border-gray-700">
          {name}
        </div>
      </Html>
    </mesh>
  );
};

const ProgrammingAtom = () => {
  const groupRef = useRef();
  const nucleusRef = useRef();
  
  const techs = [
    { 
      name: 'HTML', 
      color: '#E34F26',
      logo: '<svg viewBox="0 0 128 128" width="40" height="40"><path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/><path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/><path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/><path fill="#FFF" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/></svg>'
    },
    { 
      name: 'CSS', 
      color: '#1572B6',
      logo: '<svg viewBox="0 0 128 128" width="40" height="40"><path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"/><path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z"/><path fill="#FFF" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"/><path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z"/><path fill="#FFF" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z"/></svg>'
    },
    { 
      name: 'PHP', 
      color: '#777BB4',
      logo: '<svg viewBox="0 0 128 128" width="40" height="40"><path fill="#6181B6" d="M64 33.039C30.26 33.039 2.906 46.901 2.906 64S30.26 94.961 64 94.961 125.094 81.099 125.094 64 97.74 33.039 64 33.039z"/><path fill="#FFF" d="M48.103 70.032c-1.458 1.364-3.077 1.927-4.86 2.507-1.783.581-4.052.461-6.811.461h-6.253l-1.733 10h-7.301l6.515-34H41.7c4.224 0 7.305 1.215 9.242 3.432 1.937 2.217 2.519 5.364 1.747 9.337-.319 1.637-.856 3.159-1.614 4.515a15.118 15.118 0 01-2.972 3.748zm21.311 2.968l2.881-14.42c.328-1.688.208-2.942-.357-3.555-.565-.614-1.667-.868-3.308-.868h-6.891l-3.752 18.843h-7.244l6.515-34h7.244l-2.16 11.172h7.939c1.637 0 2.929.102 3.875.305.947.203 1.755.607 2.424 1.212s1.168 1.403 1.486 2.402c.318.998.465 2.267.241 3.794l-3.119 15.495h-7.244zm28.517-4.277c-.787 4.068-2.233 7.364-4.336 9.887-2.103 2.524-4.781 4.196-8.033 5.018-1.787.452-3.691.679-5.713.679-2.469 0-4.596-.303-6.381-.909-1.787-.606-3.229-1.488-4.329-2.647-1.099-1.158-1.847-2.567-2.241-4.228-.394-1.661-.422-3.518-.083-5.571l.11-.546c.787-4.068 2.233-7.364 4.336-9.887 2.103-2.524 4.781-4.196 8.033-5.018 1.787-.452 3.691-.679 5.713-.679 2.469 0 4.596.303 6.381.909 1.787.606 3.229 1.488 4.329 2.647 1.099 1.158 1.847 2.567 2.241 4.228.394 1.661.422 3.518.083 5.571l-.11.546z"/></svg>'
    },
    { 
      name: 'JavaScript', 
      color: '#F7DF1E',
      logo: '<svg viewBox="0 0 128 128" width="40" height="40"><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.184H1.408z"/><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/></svg>'
    },
    { 
      name: 'Vite', 
      color: '#646CFF',
      logo: '<svg viewBox="0 0 128 128" width="40" height="40"><defs><linearGradient id="vite-a" x1="6" x2="235" y1="33" y2="344" gradientTransform="scale(.48)" gradientUnits="userSpaceOnUse"><stop stopColor="#41D1FF"/><stop offset="1" stopColor="#BD34FE"/></linearGradient><linearGradient id="vite-b" x1="194" x2="236" y1="8.8" y2="293" gradientTransform="scale(.48)" gradientUnits="userSpaceOnUse"><stop stopColor="#FFEA83"/><stop offset=".08" stopColor="#FFDD35"/><stop offset="1" stopColor="#FFA800"/></linearGradient></defs><path fill="url(#vite-a)" d="M124.766 19.52L67.324 122.238c-1.187 2.121-4.234 2.133-5.437.02L3.305 19.532c-1.313-2.306.652-5.087 3.261-4.613L64 22.32l57.502-7.401c2.61-.336 4.553 2.03 3.264 4.6z"/><path fill="url(#vite-b)" d="M91.46 1.43L48.954 9.758c-1.663.325-2.748 1.88-2.476 3.56L51.74 39.2c.272 1.681 1.902 2.772 3.581 2.396l42.618-9.549c1.679-.376 2.763-2.195 2.386-4.006L95.056 3.756C94.68 1.945 93.139.911 91.46 1.43z"/></svg>'
    },
    { 
      name: 'Vue', 
      color: '#42b883',
      logo: '<svg viewBox="0 0 128 128" width="40" height="40"><path fill="#42b883" d="M78.8 10L64 35.4 49.2 10H0l64 110 64-110z"/><path fill="#35495e" d="M78.8 10L64 35.4 49.2 10H25.6L64 76l38.4-66z"/></svg>'
    },
    { 
      name: 'React', 
      color: '#61DAFB',
      logo: '<svg viewBox="0 0 128 128" width="40" height="40"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9z"/></g></svg>'
    },
    { 
      name: 'Tailwind', 
      color: '#06B6D4',
      logo: '<svg viewBox="0 0 128 128" width="40" height="40"><path fill="#38bdf8" d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64z"/></svg>'
    }
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
    if (nucleusRef.current) {
      nucleusRef.current.rotation.x += 0.01;
      nucleusRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={nucleusRef}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#4F46E5"
            attach="material"
            distort={0.4}
            speed={3}
            roughness={0.1}
            metalness={0.8}
            emissive="#4F46E5"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </mesh>

      {techs.map((tech, index) => {
        const angle = (index / techs.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 1;
        
        return (
          <TechIcon 
            key={index}
            name={tech.name}
            color={tech.color}
            position={[x, y, z]}
            logo={tech.logo}
          />
        );
      })}

      {[0, 1, 2].map((ring) => {
        const points = [];
        const segments = 64;
        const radius = 4;
        const tilt = (ring * Math.PI) / 3;
        
        for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          points.push(
            new THREE.Vector3(
              Math.cos(angle) * radius,
              Math.sin(angle) * radius * Math.sin(tilt),
              Math.sin(angle) * radius * Math.cos(tilt)
            )
          );
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        return (
          <line key={ring} geometry={geometry}>
            <lineBasicMaterial attach="material" color="#818CF8" linewidth={2} opacity={0.6} transparent />
          </line>
        );
      })}
    </group>
  );
};

const SkillOrbit = ({ skill, index, total }) => {
  const meshRef = useRef();
  const angle = (index / total) * Math.PI * 2;
  const radius = 4;

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * 0.5;
      meshRef.current.position.x = Math.cos(time + angle) * radius;
      meshRef.current.position.z = Math.sin(time + angle) * radius;
      meshRef.current.position.y = Math.sin(time * 2 + angle) * 0.8;
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.8, 0.8, 0.1]} />
      <meshStandardMaterial 
        color={skill.color}
        emissive={skill.color}
        emissiveIntensity={0.4}
        metalness={0.7}
        roughness={0.3}
      />
      <Html distanceFactor={12} center>
        <div className="flex flex-col items-center">
          <div className="bg-white p-2 rounded-lg shadow-2xl mb-2 border-2 border-gray-700">
            <div dangerouslySetInnerHTML={{ __html: skill.logo }} />
          </div>
          <div className="bg-gray-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap shadow-2xl border border-gray-700">
            {skill.name}
          </div>
        </div>
      </Html>
    </mesh>
  );
};

const ComputerWithSkills = () => {
  const computerRef = useRef();
  
  const skills = [
    { 
      name: 'HTML', 
      color: '#E34F26',
      logo: '<svg viewBox="0 0 128 128" width="32" height="32"><path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/><path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/></svg>'
    },
    { 
      name: 'CSS', 
      color: '#1572B6',
      logo: '<svg viewBox="0 0 128 128" width="32" height="32"><path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"/><path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z"/></svg>'
    },
    { 
      name: 'PHP', 
      color: '#777BB4',
      logo: '<svg viewBox="0 0 128 128" width="32" height="32"><path fill="#6181B6" d="M64 33.039C30.26 33.039 2.906 46.901 2.906 64S30.26 94.961 64 94.961 125.094 81.099 125.094 64 97.74 33.039 64 33.039z"/></svg>'
    },
    { 
      name: 'JavaScript', 
      color: '#F7DF1E',
      logo: '<svg viewBox="0 0 128 128" width="32" height="32"><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.184H1.408z"/></svg>'
    },
    { 
      name: 'Vite', 
      color: '#646CFF',
      logo: '<svg viewBox="0 0 128 128" width="32" height="32"><path fill="#646CFF" d="M124.766 19.52L67.324 122.238c-1.187 2.121-4.234 2.133-5.437.02L3.305 19.532c-1.313-2.306.652-5.087 3.261-4.613L64 22.32l57.502-7.401c2.61-.336 4.553 2.03 3.264 4.6z"/></svg>'
    },
    { 
      name: 'Vue', 
      color: '#42b883',
      logo: '<svg viewBox="0 0 128 128" width="32" height="32"><path fill="#42b883" d="M78.8 10L64 35.4 49.2 10H0l64 110 64-110z"/><path fill="#35495e" d="M78.8 10L64 35.4 49.2 10H25.6L64 76l38.4-66z"/></svg>'
    },
    { 
      name: 'React', 
      color: '#61DAFB',
      logo: '<svg viewBox="0 0 128 128" width="32" height="32"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8z"/></g></svg>'
    },
    { 
      name: 'Tailwind', 
      color: '#06B6D4',
      logo: '<svg viewBox="0 0 128 128" width="32" height="32"><path fill="#38bdf8" d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738z"/></svg>'
    },
    { 
      name: 'Python', 
      color: '#3776AB',
      logo: '<svg viewBox="0 0 128 128" width="32" height="32"><path fill="#FFD845" d="M49.33 62h29.159C86.606 62 93 55.132 93 46.981V19.183c0-7.912-6.632-13.856-14.555-15.176-5.014-.835-10.195-1.215-15.187-1.191-4.99.023-9.612.448-13.805 1.191C37.098 6.188 35 10.758 35 19.183V30h29v4H23.776c-8.484 0-15.914 5.108-18.237 14.811-2.681 11.12-2.8 17.919 0 29.53C7.614 86.983 12.569 93 21.054 93H31V79.952C31 70.315 39.428 62 49.33 62z"/><path fill="#3776AB" d="M122.281 48.811C120.183 40.363 116.178 34 107.682 34H97v12.981C97 57.031 88.206 65 78.489 65H49.33C41.342 65 35 72.326 35 80.326v27.8c0 7.91 6.745 12.564 14.462 14.834 9.242 2.717 17.994 3.208 29.051 0C85.862 120.831 93 116.549 93 108.126V97H64v-4h43.682c8.484 0 11.647-5.776 14.599-14.66 3.047-9.145 2.916-17.799 0-29.529z"/></svg>'
    },
    { 
      name: 'Flutter', 
      color: '#02569B',
      logo: '<svg viewBox="0 0 128 128" width="32" height="32"><path fill="#02569B" d="M12.3 64.2L76.3 0h39.4L32.1 83.6zM76.3 128h39.4L81.6 93.9l34.1-34.8H76.3L42.2 93.5z"/></svg>'
    },
    { 
      name: 'Golang', 
      color: '#00ADD8',
      logo: '<svg viewBox="0 0 128 128" width="32" height="32"><path fill="#00ADD8" d="M18.8 83.1c-.2.4-.2.8 0 1.2l.2.2c.2 0 .3.1.5.1h3.5c.3 0 .6-.2.7-.5l.2-.5c.1-.3.1-.6 0-.9-.1-.3-.4-.5-.7-.5h-3.5c-.3 0-.6.2-.7.5l-.2.4z"/><path fill="#00ADD8" d="M14.9 81.8h98.4c1.8 0 3.3-1.5 3.3-3.3v-53c0-1.8-1.5-3.3-3.3-3.3H14.9c-1.8 0-3.3 1.5-3.3 3.3v53c0 1.8 1.5 3.3 3.3 3.3z"/></svg>'
    },
    { 
      name: 'Node.js', 
      color: '#339933',
      logo: '<svg viewBox="0 0 128 128" width="32" height="32"><path fill="#83CD29" d="M112.678 30.334L68.535 4.729c-2.781-1.584-6.424-1.584-9.227 0L14.82 30.334C11.951 31.985 10 35.088 10 38.407v51.142c0 3.319 1.951 6.423 4.82 8.074l11.272 6.545c6.438 3.225 8.699 3.225 11.698 3.225 9.586 0 15.077-5.814 15.077-15.916V52.085c0-.476-.393-.869-.869-.869h-3.766c-.476 0-.869.393-.869.869v39.392c0 4.364-4.539 8.728-11.933 5.031L24.158 90.362c-.394-.228-.637-.652-.637-1.116V38.407c0-.464.243-.888.637-1.116l44.143-25.605c.394-.228.881-.228 1.275 0l44.143 25.605c.394.228.637.652.637 1.116v50.839c0 .464-.243.888-.637 1.116l-44.143 25.605c-.394.228-.881.228-1.275 0l-11.32-6.545c-.331-.186-.724-.188-1.06-.005-3.146 1.826-3.762 2.073-6.723 3.155-.766.277-1.878.673.118 1.549l14.723 8.729c1.391.793 2.965 1.212 4.571 1.212 1.607 0 3.18-.419 4.571-1.212l44.143-25.605c2.869-1.651 4.82-4.754 4.82-8.074V38.407c0-3.319-1.951-6.423-4.82-8.074z"/></svg>'
    }
  ];

  useFrame(() => {
    if (computerRef.current) {
      computerRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group>
      <group ref={computerRef}>
        <Box args={[2.5, 1.8, 0.15]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1F2937" metalness={0.8} roughness={0.2} />
        </Box>
        <Box args={[2.2, 1.5, 0.05]} position={[0, 0, 0.1]}>
          <meshStandardMaterial 
            color="#3B82F6" 
            emissive="#3B82F6" 
            emissiveIntensity={0.6}
            metalness={0.5}
            roughness={0.3}
          />
        </Box>
        <Box args={[2.6, 0.3, 0.2]} position={[0, -1.05, 0]}>
          <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
        </Box>
        <Box args={[1.5, 0.1, 1]} position={[0, -1.25, 0]}>
          <meshStandardMaterial color="#1F2937" metalness={0.8} roughness={0.2} />
        </Box>
      </group>

      {skills.map((skill, index) => (
        <SkillOrbit key={index} skill={skill} index={index} total={skills.length} />
      ))}

      <pointLight position={[0, 0, 3]} intensity={1} color="#3B82F6" />
    </group>
  );
};

const FlipCard = ({ title, image, description, link, type = 'project' }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-96 cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-gray-700 hover:border-blue-500 transition-colors"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <h3 className="text-3xl font-bold text-white text-center px-6">{title}</h3>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 flex flex-col justify-between shadow-2xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div>
            <div className="w-full h-40 bg-gray-900 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
              {/* Gambar project / sertifikat */}
              <img
                src={image}
                alt={title}
                className="w-full h-56 object-contain rounded rounded-t-2xl"
              />
            </div>
            <p className="text-white text-base leading-relaxed mb-6">{description}</p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation(); // ⛔ cegah flip saat tombol diklik
              window.open(link, '_blank'); // 🔗 buka link di tab baru
            }}
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-lg"
          >
            View {type === 'project' ? 'Project' : 'Certificate'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full max-w-md mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-10 shadow-2xl border-2 border-gray-700 transition-all duration-300 hover:scale-105 hover:border-blue-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={profileImg}
        alt="Devin Muhammad Bomas"
        className="w-auto h-60 mx-auto rounded-full object-cover border-4 border-blue-500 shadow-md mb-6"
      />
      <div className="text-center min-h-[80px] flex items-center justify-center">
        <h3 className="text-2xl font-bold text-white transition-all duration-300">
          {isHovered ? (
            <span className="text-blue-400 text-xl leading-relaxed">
              Front-End Engineer | AI Developer
              <br />
              IT Support | UI/UX Designer
            </span>
          ) : (
            <span className="text-3xl">Web Developer</span>
          )}
        </h3>
      </div>
    </div>
  );
};

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  console.log("Service ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
  console.log("Template ID:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
  console.log("Public Key:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

  const [isSending, setIsSending] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
  
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert('Harap isi semua field sebelum mengirim!');
      return;
    }
  
    setIsSending(true);
  
    const templateParams = {
      from_name: contactForm.name,
      from_email: contactForm.email,
      message: contactForm.message,
    };
  
    emailjs
    .send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: contactForm.name,
        from_email: contactForm.email,
        message: contactForm.message,
      }
    )
    .then(() => {
      alert('Pesan berhasil dikirim! 🎉');
      setContactForm({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error('Error EmailJS:', error);
      alert('Gagal mengirim pesan. Lihat console untuk detail.');
    })
    .finally(() => setIsSending(false));
  };

  const projects = [
    { title: 'E-Commerce Customer Service Chatbot', description: 'Platform e-commerce full-stack dengan fitur lengkap menggunakan PHP, MySQL, dan Integrasi Gemini API dan Prompt Engineering', link: 'https://github.com/DevinmuhB/E-Commerce-Chatbot', image: '/assets/projects/chatbot.png' },
    { title: 'Company Profile', description: 'Company Profile OceanCareSolution dengan fitur Layanan, Hasil Kerja dan Kontak menggunakan HTML, CSS dan JavaScript', link: 'https://github.com/DevinmuhB/Company-Profile', image: '/assets/projects/company.png' },
    { title: 'VynStore Top-Up Game', description: 'Website untuk Top-Up berbagai macam game dengan fitur Mini Game Space Shooter, List Game Populer, dan Pembayaran', link: 'https://github.com/DevinmuhB/Website-Top-Up-Game', image: '/assets/projects/topup.png' },
    { title: 'JobHub - Penyedia Lowongan Kerja', description: 'Website Job Board untuk mencari pekerjaan atau mencari calon pelamar menggunakan HTML, CSS dan Javascript', link: 'https://github.com/DevinmuhB/Website-Job-Board-Sederhana', image: '/assets/projects/jobboard.png' },
    { title: 'Chatbot AI Job Seeker & Game Wiki', description: 'Platform Chatbot untuk mencari informasi pekerjaan serta informasi game menggunakan HTML, CSS, JavaScript dan Integrasi Gemini API', link: 'https://github.com/DevinmuhB/Website-Job-GameAI', image: '/assets/projects/chatbotjob.png' },
    { title: 'DungeonRPG Rush', description: 'Game RPG Turn-Based berbasis website dengan Berbagai Macam Fitur menggunakan Vite.js, React, Tailwindcss', link: 'https://github.com/DevinmuhB/Game-RPG-Turn-Based', image: '/assets/projects/rpg.jpeg' },
    { title: 'Risk Management Dashboard', description: 'Dashboard untuk manajemen risiko berbasis web dengan fitur visualisasi data menggunakan Laravel dan Chart.js', link: 'https://github.com/DevinmuhB/RiskMGTDashboard', image: '/assets/projects/riskdash.png' }
  ];

  const certificates = [
    { title: 'Fundamental ERP', description: 'Sertifikat Pelatihan Dasar Perencanaan Sumberdaya Perusahaan dengan Menggunakan ADempiere', link: 'https://drive.google.com/file/d/1fUEqtiqn-asPgGNeuLbzD9js2-awC-Fx/view?usp=sharing', image: '/assets/certificates/sert1.png' },
    { title: 'Fundamental Server OS', description: 'Sertifikasi Pelatihan Dasar Sistem Operasi Untuk Server dengan Menggunakan Windows Server 2008', link: 'https://drive.google.com/file/d/1ITCfGJNpJXh3NfPAG6L0Zv168hyqC__4/view?usp=sharing', image: '/assets/certificates/sert2.png' },
    { title: 'Windows Server 2008 Administration for Beginner', description: 'Sertifikat Pelatihan Admin Windows Server 2008 Untuk Tingkat Pemula', link: 'https://drive.google.com/file/d/1TeR17hGq6fqrprvG6_cGBiHsdQ--EmMH/view?usp=sharing', image: '/assets/certificates/sert3.png' },
    { title: 'ADempiere for Beginner', description: 'Sertifikat Pelatihan ADempiere Untuk Tingkat Pemula dengan Materi Business Partner Management', link: 'https://drive.google.com/file/d/1hTZ3WVePwJIXJLrRjWfhxRwVH20Qt-uZ/view?usp=sharing', image: '/assets/certificates/sert4.png' },
    { title: 'Intermediate Windows Server 2008 Administration', description: 'Sertifikasi Pelatihan Admin Windows Server 2008 Untuk Tingkat Menengah', link: 'https://drive.google.com/file/d/1H7ZDQjvNI_MLYyK6dJPehHAkyt4S2o3T/view?usp=sharing', image: '/assets/certificates/sert5.png' },
    { title: 'ADempiere For Intermediate', description: 'Sertifikat Pelatihan ADempiere Untuk Tingkat Menengah dengan Materi Manufacturing Management', link: 'https://drive.google.com/file/d/1xI3qWjl9zrKXJMLwgIJbcGHBFxkeKrop/view?usp=sharing', image: '/assets/certificates/sert6.png' },
    { title: 'Fundamental of Database Systems', description: 'Sertifikat Pelatihan Dasar-Dasar Sistem Basisdata dengan Menggunakan SQL', link: 'https://drive.google.com/file/d/1D0P_mqt6dJfhiVtdelb_QTQtZSo4zn3x/view?usp=sharing', image: '/assets/certificates/sert7.png' },
    { title: 'Introduction to Wireless LAN Installation', description: 'Sertifikat Pelatihan Instalasi LAN Nirkabel dengan Materi Pengenalan Lan, TCP/IP, dan LAN Nirkabel', link: 'https://drive.google.com/file/d/1ZSnYVn3Ki1wJ4GJZ1JbqQO9-OKIYwaid/view?usp=sharing', image: '/assets/certificates/sert8.png' },
    { title: 'Advanced Database Systems', description: 'Sertifikat Pelatihan Sistem Basisdata Lanjut dengan Materi Integrasi Data, dan Pemetaan Relasional', link: 'https://drive.google.com/file/d/1F9_sNYl-iVLoShsD6Cpplncmki9Y9iag/view?usp=sharing', image: '/assets/certificates/sert9.png' },
    { title: 'Intro to Data Analytics', description: 'Sertifikat Mini Course dari REVOU tentang Data Analytics', link: 'https://drive.google.com/file/d/1YPHWi7c4b2cqd8FD9gOkjyk4jEa02_I_/view?usp=sharing', image: '/assets/certificates/sert10.png' }
  ];

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', link: 'https://linkedin.com/in/devin-bomas', color: 'bg-blue-600 hover:bg-blue-700' },
    { icon: Github, label: 'GitHub', link: 'https://github.com/devinmuhb', color: 'bg-gray-800 hover:bg-gray-900' },
    { icon: Phone, label: 'WhatsApp', link: 'https://wa.me/6281385176186', color: 'bg-green-500 hover:bg-green-600' },
    { icon: Mail, label: 'Email', link: 'mailto:devinbomas80@gmail.com', color: 'bg-red-500 hover:bg-red-600' },
    { icon: Facebook, label: 'Facebook', link: 'https://facebook.com/devin.bomas', color: 'bg-blue-700 hover:bg-blue-800' },
    { icon: Instagram, label: 'Instagram', link: 'https://instagram.com/devin_mhmmd', color: 'bg-pink-500 hover:bg-pink-600' },
    { icon: Send, label: 'Telegram', link: 'https://t.me/Vynss27', color: 'bg-blue-400 hover:bg-blue-500' }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-black min-h-screen text-white">
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              DevinmuhB
            </h1>
            <div className="hidden md:flex space-x-10">
              {['home', 'profile', 'skills', 'projects', 'certificates', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-gray-300 hover:text-white transition-all capitalize text-lg font-medium hover:scale-110 transform"
                >
                  {section}
                </button>
              ))}
            </div>
            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700 shadow-xl">
            {['hero', 'profile', 'skills', 'projects', 'certificates', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left px-6 py-4 text-gray-300 hover:bg-gray-700 capitalize text-lg font-medium"
              >
                {section}
              </button>
            ))}
          </div>
        )}
      </nav>

      <section id="hero" className="min-h-screen flex items-center pt-20 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                Devin Muhammad
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Bomas
                </span>
              </h2>
              <div className="min-h-[80px]">
                <TypingAnimation
                  texts={['Front-End Engineer', 'AI Developer', 'IT Support', 'UI/UX Designer']}
                />
              </div>
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 px-10 py-5 rounded-xl font-bold text-xl hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-2xl"
              >
                View My Projects
              </button>
            </div>
            <div className="h-[500px] lg:h-[600px]">
              <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#818CF8" />
                <Suspense fallback={null}>
                  <ProgrammingAtom />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      <section id="profile" className="py-32 px-6 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ProfileCard />
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Profile
              </h2>
              <p className="text-gray-300 text-xl leading-relaxed mb-6">
                Saya Lulusan S1 Informatika Universitas Gunadarma dengan fokus pada pengembangan web, integrasi Artificial Intelligence (AI), dan desain antarmuka pengguna. 
                Berpengalaman membangun website e-commerce dengan chatbot AI berbasis Gemini API serta berbagai proyek web responsive menggunakan React, Tailwind, dan Bootstrap. 
                Saat ini sedang memperdalam framework modern seperti Vue.js, Node.js, Flutter, Golang, dan Python untuk memperluas kemampuan full-stack dan AI. 
                Memiliki kemampuan analitis, adaptif, serta semangat kolaboratif yang tinggi dalam lingkungan tim maupun individu
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Skills
          </h2>
          <div className="h-[500px] lg:h-[600px]">
            <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3B82F6" />
              <Suspense fallback={null}>
                <ComputerWithSkills />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </section>

      <section id="projects" className="py-32 px-6 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <FlipCard key={index} {...project} type="project" />
            ))}
          </div>
        </div>
      </section>

      <section id="certificates" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Certificates
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {certificates.map((cert, index) => (
              <FlipCard key={index} {...cert} type="certificate" />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Contact Me
          </h2>
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <label className="block text-gray-300 mb-3 text-lg font-semibold">Name</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl px-6 py-4 text-white text-lg focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-3 text-lg font-semibold">Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl px-6 py-4 text-white text-lg focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-3 text-lg font-semibold">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl px-6 py-4 text-white text-lg h-40 focus:outline-none focus:border-blue-500 transition-all resize-none"
                  placeholder="Pesan Anda..."
                />
              </div>
              <button
                onClick={handleContactSubmit}
                disabled={isSending}
                className={`w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 px-8 py-5 rounded-xl font-bold text-xl transition-all transform shadow-2xl ${
                  isSending
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 hover:scale-105'
                }`}
              >
                {isSending ? 'Mengirim...' : 'Send Message'}
              </button>
                          </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold mb-8">Connect With Me</h3>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-5 ${social.color} p-5 rounded-xl transition-all transform hover:scale-105 shadow-xl`}
                >
                  <social.icon size={28} />
                  <span className="font-bold text-lg">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 border-t-2 border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-lg">
            © 2025 <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text font-bold text-xl">DevinmuhB</span>. All rights reserved.
          </p>
        </div>
      </footer>

      <style>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
