
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserData } from '../types/user';

interface PDFGeneratorProps {
  userData: UserData;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ userData }) => {
  const generatePDF = async () => {
    // Dynamic import of jspdf
    const { default: jsPDF } = await import('jspdf');
    
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = 20;

    // Page 1: User Data and BMI
    doc.setFontSize(20);
    doc.setTextColor(255, 0, 0);
    doc.text('GODMODE: TRANSFORMATION PROTOCOL', 20, yPosition);
    
    yPosition += 20;
    doc.setFontSize(14);
    doc.setTextColor(0, 255, 0);
    doc.text(`WARRIOR: ${userData.name.toUpperCase()}`, 20, yPosition);
    
    yPosition += 10;
    doc.text(`AGE: ${userData.age} YEARS`, 20, yPosition);
    
    yPosition += 10;
    doc.text(`WEIGHT: ${userData.weight} KG`, 20, yPosition);
    
    yPosition += 10;
    doc.text(`HEIGHT: ${(userData.height / 2.54 / 12).toFixed(1)}' ${Math.round((userData.height / 2.54) % 12)}"`, 20, yPosition);
    
    yPosition += 10;
    doc.text(`BMI: ${userData.bmi.toFixed(1)} (${userData.bmiCategory})`, 20, yPosition);
    
    yPosition += 10;
    doc.text(`TDEE: ${userData.tdee.toFixed(0)} KCAL`, 20, yPosition);
    
    yPosition += 10;
    doc.setTextColor(255, 0, 0);
    doc.text(`MISSION CALORIES: ${userData.dailyCalories} KCAL DAILY`, 20, yPosition);
    
    yPosition += 20;
    doc.setFontSize(16);
    doc.setTextColor(0, 255, 0);
    doc.text('BMI CATEGORIES:', 20, yPosition);
    
    yPosition += 15;
    doc.setFontSize(12);
    doc.text('< 18.5: Underweight', 25, yPosition);
    yPosition += 8;
    doc.text('18.5-24.9: Normal weight', 25, yPosition);
    yPosition += 8;
    doc.text('25-29.9: Overweight', 25, yPosition);
    yPosition += 8;
    doc.text('≥ 30: Obese', 25, yPosition);
    
    yPosition += 20;
    doc.setFontSize(16);
    doc.text('CALORIE CALCULATION FORMULAS:', 20, yPosition);
    
    yPosition += 15;
    doc.setFontSize(12);
    doc.text('1g Fat = 9 kcal', 25, yPosition);
    yPosition += 8;
    doc.text('1g Carbohydrate = 4 kcal', 25, yPosition);
    yPosition += 8;
    doc.text('1g Protein = 4 kcal', 25, yPosition);
    
    yPosition += 15;
    doc.setTextColor(255, 255, 0);
    doc.text(`PROTEIN REQUIREMENTS: ${(userData.weight * 1.2).toFixed(0)}-${(userData.weight * 2.2).toFixed(0)}g DAILY`, 20, yPosition);
    
    // Page 2: Motivation and Exercise
    doc.addPage();
    yPosition = 20;
    
    doc.setFontSize(20);
    doc.setTextColor(255, 0, 0);
    doc.text('⚠️ GODMODE WARNING ⚠️', 20, yPosition);
    
    yPosition += 20;
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    const motivationalText = [
      'THIS IS NOT A GAME. THIS IS WAR.',
      'EVERY DAY YOU DELAY IS ANOTHER DAY THE OLD YOU WINS.',
      'COMFORT IS THE ENEMY. PAIN IS THE TEACHER.',
      'YOU EITHER COMMIT 100% OR YOU FAIL 100%.',
      'THE PERSON YOU BECOME IS MORE IMPORTANT THAN THE BODY YOU BUILD.',
      'DISCIPLINE IS DOING WHAT YOU HATE TO DO, BUT DOING IT LIKE YOU LOVE IT.',
      'YOUR EXCUSES ARE THE LIES YOU TELL YOURSELF TO AVOID GREATNESS.'
    ];
    
    motivationalText.forEach(text => {
      doc.text(text, 20, yPosition, { maxWidth: 170 });
      yPosition += 15;
    });
    
    yPosition += 10;
    doc.setFontSize(16);
    doc.setTextColor(0, 255, 0);
    doc.text('EXERCISE PROTOCOLS FOR TRANSFORMATION:', 20, yPosition);
    
    yPosition += 15;
    doc.setFontSize(12);
    const exercises = [
      'RESISTANCE TRAINING: 3-4x/week, compound movements',
      'CARDIO: HIIT 2-3x/week, LISS 2-3x/week',
      'PROGRESSIVE OVERLOAD: Increase weight/reps weekly',
      'RECOVERY: 7-9 hours sleep, 1-2 rest days',
      'HYDRATION: 35-40ml per kg bodyweight daily',
      'STEPS: Minimum 10,000 daily for baseline activity'
    ];
    
    exercises.forEach(exercise => {
      doc.text(exercise, 25, yPosition);
      yPosition += 10;
    });
    
    yPosition += 10;
    doc.setTextColor(255, 0, 0);
    doc.text('REMEMBER: GODMODE IS A STATE OF MIND.', 20, yPosition);
    yPosition += 10;
    doc.text('ACTIVATE IT DAILY OR REMAIN ORDINARY FOREVER.', 20, yPosition);
    
    // Save the PDF
    doc.save(`GODMODE_Protocol_${userData.name}.pdf`);
  };

  return (
    <Button
      className="cyber-button h-16 bg-yellow-900 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
      onClick={generatePDF}
    >
      DOWNLOAD PROTOCOL
    </Button>
  );
};

export default PDFGenerator;
