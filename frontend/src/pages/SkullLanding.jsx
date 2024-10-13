import React, { useEffect, useState } from 'react'
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Skull from '../models/Skull';

const SkullLanding = () => {

  const [scale, setScale] = useState([6.5, 5, 5]); // default scale

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width > 1200) {
        setScale([6.5, 5, 5]); // for large screens
      } else if (width > 768) {
        setScale([5.5, 4.5, 4.5]); // for tablets and medium screens
      } else {
        setScale([4.5, 3.5, 3.5]); // for mobile screens
      }
    };

    // Initial call to set the scale based on current window size
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (

    <div className="relative bg-black">
  {/* ESCROW Text Behind the Skull */}
  <h1 className="font-cinzel text-yellow-500 text-[5rem] sm:text-[10rem] md:text-[15rem] lg:text-[20rem] absolute inset-0 flex justify-center items-center z-10 opacity-50">
  ESCROW
</h1>




  {/* Skull Landing Section */}
  <section className="w-full h-[30rem] relative z-10">
    <Canvas
      className="w-full h-screen"
      camera={{ near: 0.1, far: 1000 }}
      gl={{ alpha: true }}  
    >
      <Suspense fallback={<Loader />}>
        {/* <directionalLight position={[1, 2, 5]} intensity={4} color={"#ffffff"} castShadow />
        <spotLight position={[-2, 1, 4]} intensity={2.5} color={"#ffd700"} angle={0.5} penumbra={0.6} />
        <pointLight position={[0, -2, -5]} intensity={5} color={"#ffcc00"} /> */}


        <directionalLight
    position={[2, 5, -2]}
    intensity={6}
    color={"#ffffff"}
    castShadow
  />
  
  <spotLight
    position={[-5, 3, 5]}
    intensity={3}
    color={"#ffd700"}
    angle={0.4}
    penumbra={0.5}
  />
  
  <pointLight
    position={[0, -5, 10]}
    intensity={8}
    color={"#ffcc00"}
  /> 
        <Skull scale={scale} position={[0, 0.5, -3]} rotation={[0, 0, 0]} />
      </Suspense>
    </Canvas>
  </section>
</div>







  )
}

export default SkullLanding