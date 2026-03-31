"use client";

import { motion, HTMLMotionProps } from "framer-motion";

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
}

export default function MotionWrapper({ children, delay = 0, className, style, id, ...rest }: MotionWrapperProps) {
  // Extract motion-specific props if they were passed in rest
  const { 
    initial, whileInView, viewport, transition, animate, exit, variants 
  } = rest;

  return (
    <motion.div
      initial={initial || { opacity: 0, y: 20 }}
      whileInView={whileInView || { opacity: 1, y: 0 }}
      viewport={viewport || { once: true }}
      transition={transition || { delay, duration: 0.5, ease: "easeOut" }}
      className={className}
      style={style}
      id={id}
      animate={animate}
      exit={exit}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

