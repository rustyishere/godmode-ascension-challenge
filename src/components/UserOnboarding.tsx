
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserData } from '../types/user';
import { calculateBMI, calculateTDEE, getBMICategory } from '../utils/calculations';

interface UserOnboardingProps {
  onSubmit: (userData: UserData) => void;
}

const UserOnboarding: React.FC<UserOnboardingProps> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    heightFeet: '',
    heightInches: ''
  });

  const handleSubmit = () => {
    const heightInInches = parseInt(formData.heightFeet) * 12 + parseInt(formData.heightInches);
    const heightInCm = heightInInches * 2.54;
    const weightInKg = parseFloat(formData.weight);
    
    const bmi = calculateBMI(weightInKg, heightInCm);
    const tdee = calculateTDEE(weightInKg, heightInCm, parseInt(formData.age), 'male', 1.2);
    const dailyCalories = Math.round(tdee / 2);
    
    const userData: UserData = {
      name: formData.name,
      age: parseInt(formData.age),
      weight: weightInKg,
      height: heightInCm,
      bmi,
      bmiCategory: getBMICategory(bmi),
      tdee,
      dailyCalories,
      xp: 0,
      level: 0,
      joinDate: new Date().toISOString()
    };

    onSubmit(userData);
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-black border-red-500 border-2 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-red-500 text-3xl font-black orbitron glitch-text">
              ⚠️ WARNING: GODMODE ACTIVATION ⚠️
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 p-6">
            <div className="text-center text-red-400 text-lg font-bold">
              THIS IS WAR AGAINST THE OLD YOU
            </div>
            
            <div className="cyber-border p-6 space-y-4">
              <p className="text-green-400 text-center font-bold">
                ENTER YOUR BIOLOGICAL DATA FOR OPTIMIZATION
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-green-400 font-bold">NAME</Label>
                  <Input
                    className="bg-black border-green-400 text-green-400"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="ENTER WARRIOR NAME"
                  />
                </div>
                
                <div>
                  <Label className="text-green-400 font-bold">AGE</Label>
                  <Input
                    type="number"
                    className="bg-black border-green-400 text-green-400"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="YEARS"
                  />
                </div>
                
                <div>
                  <Label className="text-green-400 font-bold">WEIGHT (KG)</Label>
                  <Input
                    type="number"
                    className="bg-black border-green-400 text-green-400"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    placeholder="CURRENT MASS"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-green-400 font-bold">HEIGHT</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      className="bg-black border-green-400 text-green-400"
                      value={formData.heightFeet}
                      onChange={(e) => setFormData({...formData, heightFeet: e.target.value})}
                      placeholder="FEET"
                    />
                    <Input
                      type="number"
                      className="bg-black border-green-400 text-green-400"
                      value={formData.heightInches}
                      onChange={(e) => setFormData({...formData, heightInches: e.target.value})}
                      placeholder="INCHES"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-yellow-400 font-bold text-sm">
                BY PROCEEDING, YOU ACCEPT THE CHALLENGE OF TOTAL TRANSFORMATION
              </p>
              
              <Button
                className="cyber-button w-full text-xl py-4"
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                INITIATE GODMODE PROTOCOL
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserOnboarding;
