
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-black orbitron neon-glow flicker-text mb-8">
          GODMODE
        </h1>
        <div className="text-2xl md:text-4xl font-bold glitch-text">
          INITIATING...
        </div>
        <div className="mt-8">
          <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto">
            <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-4 text-green-300 text-lg tracking-wider">
          PREPARING TRANSFORMATION PROTOCOL
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
