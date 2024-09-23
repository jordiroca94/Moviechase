"use client";
import React from "react";
import TMDB from "../../public/images/tmdb.jpeg";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const Tmdb = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (!divRef.current) return;

    const { width, height, top, left } = divRef.current.getBoundingClientRect();

    setDimensions({ width, height, top, left });
  }, []);
  return (
    <a
      target="_blank"
      href="https://developer.themoviedb.org/reference/intro/getting-started"
    >
      <div
        ref={divRef}
        className="flex justify-center items-center h-[300px] m-[80px]"
      >
        <motion.svg
          className="absolute"
          width={dimensions.width + 100}
          height={dimensions.height + 100}
          viewBox={`0 0 ${dimensions.width + 100} ${dimensions.height + 100}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id="neon"
              filterUnits="userSpaceOnUse"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="5"
                result="blur5"
              />
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur10"
              />
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="20"
                result="blur20"
              />
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="30"
                result="blur30"
              />
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="50"
                result="blur50"
              />

              <feMerge result="blur-merged">
                <feMergeNode in="blur10" />
                <feMergeNode in="blur20" />
                <feMergeNode in="blur30" />
                <feMergeNode in="blur50" />
              </feMerge>

              <feColorMatrix
                result="red-blur"
                in="blur-merged"
                type="matrix"
                values="1 0 0 0 0
                    0 0.06 0 0 0
                    0 0 0.44 0 0
                    0 0 0 1 0"
              />
              <feMerge>
                <feMergeNode in="red-blur" />
                <feMergeNode in="blur5" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <svg className="neon" x={50} y={50}>
            <motion.path
              d={`M 0 0 h ${dimensions.width} v ${dimensions.height} h -${dimensions.width} v -${dimensions.height}`}
              stroke="#90cea1"
              strokeWidth="3"
              animate={{
                pathLength: [0, 0.75],
                pathOffset: [0, 0.2],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop",
              }}
            />
          </svg>
        </motion.svg>
        <div className="flex gap-6 flex-col items-center justify-center py-10">
          <h3 className="text-xl uppercase">Developed with</h3>
          <Image className="size-32" src={TMDB} alt="TMDB" />
        </div>
      </div>
    </a>
  );
};

export default Tmdb;
