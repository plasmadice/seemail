"use client";
import { useState, useEffect } from "react";

export default function Spinner({ duration = 90 }) {
  const [count, setCount] = useState(duration);

  useEffect(() => {
    const countId = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countId);
  }, []);

  return (
    <div className="flex justify-center items-center z-30">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-warning relative z-0"
        role="status"
      />

      <p className="text-white h-8 w-8 absolute flex justify-center items-center">
        {count > 0 ? count : 0}
      </p>
    </div>
  );
}
