'use client';

import { motion } from 'motion/react';

interface RiskGaugeProps {
  score: number; // 1-10
}

export default function RiskGauge({ score }: RiskGaugeProps) {
  const normalizedScore = Math.min(Math.max(score, 1), 10);
  const percentage = (normalizedScore / 10) * 100;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Color interpolation: 1 (Green) to 10 (Red)
  const getColor = (s: number) => {
    if (s <= 3) return '#22c55e'; // green-500
    if (s <= 7) return '#eab308'; // yellow-500
    return '#ef4444'; // red-500
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-48 h-48">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="8"
          className="text-zinc-800"
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke={getColor(normalizedScore)}
          strokeWidth="8"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold text-white">{normalizedScore}</span>
        <span className="text-xs uppercase tracking-widest text-zinc-500">Risk Score</span>
      </div>
    </div>
  );
}
