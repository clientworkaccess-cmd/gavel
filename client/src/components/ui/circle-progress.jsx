import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const CircleProgress = ({
  value,
  maxValue,
  size = 40,
  strokeWidth = 3,
  counterClockwise = false,
  onColorChange,
  onValueChange,
  getColor,
  className,
  animationDuration = 300,
  disableAnimation = false,
  useGradient = false,
  gradientColors = ["#10b981", "#f59e0b", "#ef4444"],
  gradientId,
  ...props
}) => {
  const [animatedValue, setAnimatedValue] = useState(
    disableAnimation ? value : 0
  );

  const animatedValueRef = useRef(animatedValue);
  const uniqueGradientId = useRef(
    gradientId ||
      `circle-progress-gradient-${Math.random().toString(36).substring(2, 9)}`
  ).current;

  useEffect(() => {
    animatedValueRef.current = animatedValue;
  }, [animatedValue]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const fillPercentage = Math.min(animatedValue / maxValue, 1);
  const strokeDashoffset = circumference * (1 - fillPercentage);

  const defaultGetColor = (percentage) => {
    if (percentage < 0.7) return "stroke-emerald-500";
    if (percentage < 0.9) return "stroke-amber-500";
    return "stroke-red-500";
  };

  const currentColor = useGradient
    ? ""
    : getColor
    ? getColor(fillPercentage)
    : defaultGetColor(fillPercentage);

  useEffect(() => {
    if (disableAnimation) {
      setAnimatedValue(value);
      return;
    }

    const start = animatedValueRef.current;
    const end = Math.min(value, maxValue);
    const startTime = performance.now();

    if (start === end) return;

    const animateProgress = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const currentValue = start + (end - start) * easeProgress;

      setAnimatedValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animateProgress);
      }
    };

    const animationFrame = requestAnimationFrame(animateProgress);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, maxValue, animationDuration, disableAnimation]);

  useEffect(() => {
    if (onColorChange) onColorChange(currentColor);
  }, [currentColor]);

  useEffect(() => {
    if (onValueChange) onValueChange(animatedValue, fillPercentage);
  }, [animatedValue, fillPercentage]);

  const valueText =
    props["aria-valuetext"] ||
    `${Math.round(value)} out of ${maxValue}, ${Math.round(
      fillPercentage * 100
    )}% complete`;

  return (
    <div
      className={cn(className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={maxValue}
      aria-valuetext={valueText}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="duration-300"
      >
        {useGradient && (
          <defs>
            <linearGradient
              id={uniqueGradientId}
              gradientUnits="userSpaceOnUse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            > 
              {gradientColors.map((color, index) => (
                <stop
                  key={index}
                  offset={`${(index / (gradientColors.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          </defs>
        )}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="fill-transparent stroke-gray-200 dark:stroke-gray-700"
          strokeWidth={strokeWidth}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={cn(
            "fill-transparent transition-colors",
            !useGradient && currentColor
          )}
          style={
            useGradient ? { stroke: `url(#${uniqueGradientId})` } : undefined
          }
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={
            counterClockwise ? -strokeDashoffset : strokeDashoffset
          }
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export { CircleProgress };
