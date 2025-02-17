import React, { useEffect, useRef } from "react";
import gsap, { Power1 } from "gsap";

const SecondaryLoader = () => {
  const loader = useRef();
  useEffect(() => {
    gsap.to(loader.current, {
      rotate: 360,
      repeat: -1,
      duration: 0.7,
      ease: Power1.easeInOut
    });
  });
  return (
    <div
      ref={loader}
      className="w-[60px] h-[60px] border-4 rounded-full border-blue-500 border-t-transparent "
    ></div>
  );
};

export default SecondaryLoader;
