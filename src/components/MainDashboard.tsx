
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { UserData } from '../types/user';
import { getLevelName, getLevelProgress } from '../utils/levels';
import DailyTasks from './DailyTasks';
import CalendarView from './CalendarView';
import SystemAccess from './SystemAccess';
import PDFGenerator from './PDFGenerator';

interface MainDashboardProps {
  userData: UserData;
  onReset: () => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({ userData, onReset }) => {
  const [showTasks, setShowTasks] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSystemAccess, setShowSystemAccess] = useState(false);
  const [currentXP, setCurrentXP] = useState(userData.xp);
  
  const currentLevel = Math.floor(currentXP / 100);
  const levelName = getLevelName(currentLevel);
  const levelProgress = getLevelProgress(currentXP);

  const handleXPUpdate = (newXP: number) => {
    setCurrentXP(newXP);
    const updatedUser = { ...userData, xp: newXP };
    localStorage.setItem('godmode-user', JSON.stringify(updatedUser));
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black orbitron neon-glow mb-2">
            GODMODE: ACTIVE
          </h1>
          <p className="text-xl text-green-300">
            WARRIOR: {userData.name.toUpperCase()}
          </p>
        </div>

        {/* Stats Panel */}
        <div className="cyber-border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold xp-glow">{currentXP}</div>
              <div className="text-green-300">TOTAL XP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{levelName}</div>
              <div className="text-green-300">CURRENT LEVEL</div>
              <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                <div 
                  className="level-bar rounded-full h-2 transition-all duration-500"
                  style={{ width: `${levelProgress}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{userData.dailyCalories}</div>
              <div className="text-green-300">MISSION CALORIES</div>
            </div>
          </div>
        </div>

        {/* Mission Brief */}
        <div className="cyber-border p-6 mb-8 bg-red-900/20">
          <h2 className="text-2xl font-bold text-red-400 mb-4 orbitron">DAILY MISSION PARAMETERS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-300">
            <div>• CONSUME EXACTLY {userData.dailyCalories} KCAL</div>
            <div>• WALK MINIMUM 10,000 STEPS</div>
            <div>• DOWNLOAD MYFITNESSPAL FOR TRACKING</div>
            <div>• USE STEP COUNTER APPLICATION</div>
          </div>
          <p className="mt-4 text-yellow-400 font-bold">
            FAILURE IS NOT AN OPTION. TRANSFORMATION IS MANDATORY.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button
            className="cyber-button h-16"
            onClick={() => setShowTasks(true)}
          >
            DAILY TASKS
          </Button>
          
          <Button
            className="cyber-button h-16"
            onClick={() => setShowCalendar(true)}
          >
            PROGRESS LOG
          </Button>
          
          <Button
            className="cyber-button h-16 bg-blue-900 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black"
            onClick={() => setShowSystemAccess(true)}
          >
            SYSTEM ACCESS
          </Button>
          
          <PDFGenerator userData={userData} />
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <Button
            className="bg-red-900 border-red-400 text-red-400 hover:bg-red-400 hover:text-black"
            onClick={onReset}
          >
            RESET PROTOCOL
          </Button>
        </div>

        {/* Modals */}
        <DailyTasks 
          isOpen={showTasks} 
          onClose={() => setShowTasks(false)} 
          onXPUpdate={handleXPUpdate}
          currentXP={currentXP}
        />
        
        <CalendarView 
          isOpen={showCalendar} 
          onClose={() => setShowCalendar(false)} 
        />
        
        <SystemAccess 
          isOpen={showSystemAccess} 
          onClose={() => setShowSystemAccess(false)} 
        />
      </div>
    </div>
  );
};

export default MainDashboard;
