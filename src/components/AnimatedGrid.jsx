import { useEffect, useState } from "react";

const AnimatedGrid = () => {
  const [vertical, setVertical] = useState([]);
  const [horizontal, setHorizontal] = useState([]);

  useEffect(() => {
    const gen = (count) =>
      Array.from({ length: count }, () => ({
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 2,
      }));

    setVertical(gen(40));
    setHorizontal(gen(40));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        {/* Grid Container */}
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
          {/* Horizontal Lines */}
          <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] opacity-20">
            {vertical.map((cfg, i) => (
              <div
                key={`v-${i}`}
                className="relative h-full w-full border-r border-blue-500/10"
                style={{
                  animation: `gridPulse ${cfg.duration}s ease-in-out infinite`,
                  animationDelay: `${cfg.delay}s`,
                }}
              />
            ))}
          </div>

          {/* Vertical Lines */}
          <div className="absolute inset-0 grid grid-rows-[repeat(40,1fr)] opacity-20">
            {horizontal.map((cfg, i) => (
              <div
                key={`h-${i}`}
                className="relative w-full h-full border-b border-blue-500/10"
                style={{
                  animation: `gridPulse ${cfg.duration}s ease-in-out infinite`,
                  animationDelay: `${cfg.delay}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
// Animated Grid 
export default AnimatedGrid;
