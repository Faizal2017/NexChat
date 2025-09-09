import React from "react";
import { GlowingEffect } from "./UI/glowing-effect";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-10">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-x-1 gap-y-3 mb-3 mt-7">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="relative rounded-2xl overflow-visible">
              <div
                className={`w-26 h-26 aspect-square rounded-2xl bg-primary/10 ${
                  i % 2 === 0 ? "animate-pulse" : ""
                } relative z-10`}
              />
              <GlowingEffect
                glow={true}
                disabled={false}
                className="pointer-events-none"
                blur={6}
                spread={18}
              />
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;

// "use client";
// import React from "react";
// import { SparklesCore } from "./UI/sparkles";
// import { MessageSquare } from "lucide-react";

// const AuthImagePattern = () => {
//   return (
//    <div className="h-[40rem] w-full bg-base-200 flex flex-col items-center justify-center overflow-hidden rounded-md">
//       <div className="flex items-center justify-center gap-3 relative z-20">
//         <MessageSquare className="w-10 h-10 md:w-16 md:h-16 text-white drop-shadow-lg" />
//         <h1
//           className="md:text-7xl text-3xl lg:text-6xl font-bold text-center "
//         >
//           NexChat
//         </h1>
//       </div>
//       <div className="w-[40rem] h-40 relative">
//         {/* Gradients */}
//         <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
//         <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
//         <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
//         <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

//         {/* Core component */}
//         <SparklesCore
//           background="transparent"
//           minSize={0.4}
//           maxSize={1}
//           particleDensity={1200}
//           className="w-full h-full"
//           particleColor="#FFFFFF"
//         />

//         {/* Radial Gradient to prevent sharp edges */}
//         <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
//       </div>
//     </div>
//   );
// }

// export default AuthImagePattern;
