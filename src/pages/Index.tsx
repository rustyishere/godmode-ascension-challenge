
import React, { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import UserOnboarding from '../components/UserOnboarding';
import MainDashboard from '../components/MainDashboard';
import { UserData } from '../types/user';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'loading' | 'onboarding' | 'dashboard'>('loading');
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Check if user data exists in localStorage
    const savedUser = localStorage.getItem('godmode-user');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
      setCurrentScreen('dashboard');
    } else {
      // Show loading screen for 3 seconds
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleUserSubmit = (user: UserData) => {
    setUserData(user);
    localStorage.setItem('godmode-user', JSON.stringify(user));
    setCurrentScreen('dashboard');
  };

  const resetUser = () => {
    localStorage.removeItem('godmode-user');
    localStorage.removeItem('godmode-tasks');
    setUserData(null);
    setCurrentScreen('onboarding');
  };

  return (
    <div className="min-h-screen bg-black matrix-bg">
      {/* Video Background */}
      <video 
        className="video-bg" 
        autoPlay 
        muted 
        loop 
        playsInline
        poster="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&h=1080"
      >
        <source src="/assets/godmode-bg.mp4" type="video/mp4" />
      </video>

      <div className="overlay min-h-screen">
        {currentScreen === 'loading' && <LoadingScreen />}
        {currentScreen === 'onboarding' && <UserOnboarding onSubmit={handleUserSubmit} />}
        {currentScreen === 'dashboard' && userData && (
          <MainDashboard userData={userData} onReset={resetUser} />
        )}
      </div>
    </div>
  );
};

export default Index;
