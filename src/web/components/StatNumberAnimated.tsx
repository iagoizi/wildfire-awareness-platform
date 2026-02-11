import { useState, useEffect, useRef } from "react";

const StatNumberAnimated = ({ number }: { number: string }) => {
  const [displayNumber, setDisplayNumber] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const duration = 2000;
    const cleanDigits = number.replace(/\D/g, "");
    let lastUpdate = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const now = Date.now();

      if (elapsed >= duration) {
        setDisplayNumber(number);
        return;
      }

      if (now - lastUpdate >= 100) {
        const randomNumber = Math.floor(Math.random() * parseInt(cleanDigits)) + 1;
        setDisplayNumber(randomNumber.toString());
        lastUpdate = now;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [isVisible, number]);

  return (
    <p
      ref={ref}
      className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream mb-4 min-h-20"
    >
      {displayNumber}
    </p>
  );
};

export default StatNumberAnimated;
