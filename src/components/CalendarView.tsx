
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CalendarViewProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DayData {
  date: string;
  xp: number;
}

const CalendarView: React.FC<CalendarViewProps> = ({ isOpen, onClose }) => {
  const [calendarData, setCalendarData] = useState<DayData[]>([]);

  useEffect(() => {
    // Load calendar data from localStorage
    const data: DayData[] = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();
      
      const savedTasks = localStorage.getItem(`godmode-tasks-${dateString}`);
      let xp = 0;
      
      if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        xp = tasks.filter((task: any) => task.completed).reduce((sum: number, task: any) => sum + task.xp, 0);
      }
      
      data.push({ date: dateString, xp });
    }
    
    setCalendarData(data);
  }, [isOpen]);

  const getColorForXP = (xp: number) => {
    if (xp >= 100) return 'bg-green-500';
    if (xp >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-green-400 border-2 max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-green-400 text-2xl font-black orbitron">
            PROGRESS SURVEILLANCE LOG
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-4">
          <div className="mb-6">
            <div className="flex justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-green-400">≥100 XP</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-yellow-400">≥50 XP</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-red-400">&lt;50 XP</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
              <div key={day} className="text-center text-green-400 font-bold p-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {calendarData.map((day, index) => {
              const date = new Date(day.date);
              const dayNum = date.getDate();
              
              return (
                <div
                  key={index}
                  className={`
                    aspect-square flex flex-col items-center justify-center p-2 rounded
                    ${getColorForXP(day.xp)} text-black font-bold text-sm
                    border-2 border-gray-600
                  `}
                >
                  <div>{dayNum}</div>
                  <div className="text-xs">{day.xp}</div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-6">
            <Button 
              className="cyber-button"
              onClick={onClose}
            >
              DATA REVIEWED
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarView;
