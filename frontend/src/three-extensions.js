import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Import any custom or additional Three.js classes if needed
import { Points } from 'three';

// Extend with all standard Three.js classes
extend(THREE);



// For debugging
export const logThreeClasses = () => {
  console.log('Available THREE classes:', Object.keys(THREE).filter(k => typeof THREE[k] === 'function'));
};

export default THREE;
