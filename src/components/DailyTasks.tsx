
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface Task {
  id: string;
  name: string;
  xp: number;
  completed: boolean;
}

interface DailyTasksProps {
  isOpen: boolean;
  onClose: () => void;
  onXPUpdate: (newXP: number) => void;
  currentXP: number;
}

const DailyTasks: React.FC<DailyTasksProps> = ({ isOpen, onClose, onXPUpdate, currentXP }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', name: 'GYM SESSION COMPLETED', xp: 25, completed: false },
    { id: '2', name: 'FASTED CARDIO EXECUTED', xp: 20, completed: false },
    { id: '3', name: 'CLEAN MEALS CONSUMED', xp: 15, completed: false },
    { id: '4', name: '8+ HOURS SLEEP ACHIEVED', xp: 15, completed: false },
    { id: '5', name: 'COLD SHOWER ENDURED', xp: 10, completed: false },
    { id: '6', name: 'ZERO JUNK FOOD INTAKE', xp: 10, completed: false },
    { id: '7', name: 'MENTAL CHECK-IN LOGGED', xp: 10, completed: false },
    { id: '8', name: 'EARLY WAKE-UP (6AM)', xp: 5, completed: false }
  ]);

  useEffect(() => {
    const today = new Date().toDateString();
    const savedTasks = localStorage.getItem(`godmode-tasks-${today}`);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const handleTaskToggle = (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const newCompleted = !task.completed;
        const xpChange = newCompleted ? task.xp : -task.xp;
        onXPUpdate(currentXP + xpChange);
        return { ...task, completed: newCompleted };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    
    const today = new Date().toDateString();
    localStorage.setItem(`godmode-tasks-${today}`, JSON.stringify(updatedTasks));
  };

  const totalXP = tasks.filter(task => task.completed).reduce((sum, task) => sum + task.xp, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-green-400 border-2 max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-green-400 text-2xl font-black orbitron">
            DAILY MISSION OBJECTIVES
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 p-4">
          <div className="text-center mb-6">
            <div className="text-xl font-bold xp-glow">TODAY'S XP: {totalXP}</div>
          </div>
          
          {tasks.map((task) => (
            <div key={task.id} className="cyber-border p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => handleTaskToggle(task.id)}
                  className="border-green-400 data-[state=checked]:bg-green-400 data-[state=checked]:text-black"
                />
                <span className={`font-bold ${task.completed ? 'text-green-400' : 'text-gray-400'}`}>
                  {task.name}
                </span>
              </div>
              <div className={`font-bold ${task.completed ? 'text-green-400' : 'text-gray-400'}`}>
                +{task.xp} XP
              </div>
            </div>
          ))}
          
          <div className="text-center mt-6">
            <Button 
              className="cyber-button"
              onClick={onClose}
            >
              MISSION ACKNOWLEDGED
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DailyTasks;
