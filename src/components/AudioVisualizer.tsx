import { useEffect, useState } from "react";

interface AudioVisualizerProps {
  isActive?: boolean;
  barCount?: number;
  className?: string;
}

const AudioVisualizer = ({ isActive = false, barCount = 40, className = "" }: AudioVisualizerProps) => {
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setHeights(Array.from({ length: barCount }, () => Math.random()));
      }, 100);
      
      return () => clearInterval(interval);
    } else {
      setHeights(Array(barCount).fill(0.1));
    }
  }, [isActive, barCount]);

  return (
    <div className={`flex items-end justify-center space-x-1 h-20 ${className}`}>
      {heights.map((height, index) => (
        <div
          key={index}
          className="audio-bar w-1 bg-primary"
          style={{
            height: `${height * 100}%`,
            animationDelay: `${index * 0.1}s`,
            opacity: isActive ? 1 : 0.3,
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;