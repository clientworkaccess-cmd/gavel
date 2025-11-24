import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

const AnimatedCounter = ({ end, suffix, duration = 1.5 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, end, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value).toLocaleString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      0{suffix}
    </span>
  );
};

export default AnimatedCounter;
