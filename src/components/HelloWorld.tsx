
import { useState } from 'react';
import { motion } from 'framer-motion';

const HelloWorld = () => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.h1 
      className="text-5xl md:text-7xl font-bold text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ scale: hovered ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
        Hello, World!
      </span>
    </motion.h1>
  );
};

export default HelloWorld;
