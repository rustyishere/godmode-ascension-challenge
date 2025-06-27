
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface SystemAccessProps {
  isOpen: boolean;
  onClose: () => void;
}

const SystemAccess: React.FC<SystemAccessProps> = ({ isOpen, onClose }) => {
  const nutritionTips = [
    "PROTEIN SYNTHESIS: Consume 1.6-2.2g protein per kg bodyweight for optimal muscle protein synthesis",
    "MEAL TIMING: Eat protein within 2 hours post-workout for maximum anabolic response",
    "HYDRATION PROTOCOL: 35-40ml water per kg bodyweight daily + extra during training",
    "MICRONUTRIENT OPTIMIZATION: Dark leafy greens contain nitrates that enhance blood flow",
    "INSULIN SENSITIVITY: Time carbohydrates around workouts for better glucose utilization",
    "THERMOGENESIS: Green tea and caffeine can increase metabolic rate by 4-5%",
    "SLEEP OPTIMIZATION: 7-9 hours sleep increases leptin and decreases ghrelin for appetite control",
    "CORTISOL MANAGEMENT: Chronic stress elevates cortisol leading to abdominal fat storage"
  ];

  const trainingSecrets = [
    "PROGRESSIVE OVERLOAD: Increase weight, reps, or sets weekly for continuous adaptation",
    "COMPOUND MOVEMENTS: Squats, deadlifts, pull-ups recruit multiple muscle groups efficiently",
    "TIME UNDER TENSION: Control eccentric (lowering) phase for 2-3 seconds to maximize hypertrophy",
    "REST PERIODS: 2-3 minutes between sets for strength, 30-90 seconds for hypertrophy",
    "HEART RATE ZONES: 70-85% max HR for fat burning, 85-95% for VO2 max improvement",
    "RECOVERY METRICS: Resting heart rate +10% indicates overtraining or illness"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-blue-400 border-2 max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-blue-400 text-2xl font-black orbitron glitch-text">
            🔒 CLASSIFIED SYSTEM ACCESS 🔒
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-4 space-y-6">
          <div className="text-center text-yellow-400 font-bold">
            ⚠️ RESTRICTED DATA - AUTHORIZED PERSONNEL ONLY ⚠️
          </div>
          
          <div className="cyber-border p-4 bg-blue-900/20">
            <h3 className="text-xl font-bold text-blue-400 mb-4 orbitron">
              ADVANCED NUTRITION PROTOCOLS
            </h3>
            <div className="space-y-2">
              {nutritionTips.map((tip, index) => (
                <div key={index} className="text-green-300 text-sm">
                  → {tip}
                </div>
              ))}
            </div>
          </div>
          
          <div className="cyber-border p-4 bg-red-900/20">
            <h3 className="text-xl font-bold text-red-400 mb-4 orbitron">
              CLASSIFIED TRAINING INTEL
            </h3>
            <div className="space-y-2">
              {trainingSecrets.map((secret, index) => (
                <div key={index} className="text-green-300 text-sm">
                  → {secret}
                </div>
              ))}
            </div>
          </div>
          
          <div className="cyber-border p-4 bg-yellow-900/20">
            <h3 className="text-xl font-bold text-yellow-400 mb-4 orbitron">
              PSYCHOLOGICAL WARFARE TACTICS
            </h3>
            <div className="space-y-2 text-green-300 text-sm">
              <div>→ VISUALIZATION: Spend 5 minutes daily visualizing your transformed physique</div>
              <div>→ IDENTITY SHIFT: Refer to yourself as "athlete" not "trying to get fit"</div>
              <div>→ MOMENTUM STACKING: Chain small wins to build unstoppable confidence</div>
              <div>→ PAIN/PLEASURE LEVERAGE: Associate massive pain with staying the same</div>
              <div>→ ENVIRONMENTAL DESIGN: Remove all temptation foods from living space</div>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              className="cyber-button bg-blue-900 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black"
              onClick={onClose}
            >
              TERMINATE ACCESS
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SystemAccess;
