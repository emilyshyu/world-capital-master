
import React, { useState, useMemo } from 'react';
import { Country, QuizQuestion } from '../types.ts';
import { countries } from '../data.ts';

interface Props {
  onFinish: () => void;
}

const QuizView: React.FC<Props> = ({ onFinish }) => {
  const [step, setStep] = useState<'quiz' | 'result'>('quiz');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const quizQuestions = useMemo(() => {
    const shuffled = [...countries].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);
    
    return selected.map(country => {
      const others = countries
        .filter(c => c.land !== country.land)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(c => c.hauptstadt);
      
      const options = [country.hauptstadt, ...others].sort(() => Math.random() - 0.5);
      
      return { country, options };
    });
  }, []);

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === quizQuestions[currentQuestionIndex].country.hauptstadt) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setStep('result');
    }
  };

  const getGermanGrade = (score: number) => {
    if (score === 10) return '1+';
    if (score === 9) return '1';
    if (score >= 7) return '2';
    if (score >= 5) return '3';
    if (score >= 3) return '4';
    return '5';
  };

  const gradeMessage = (grade: string) => {
    switch(grade) {
      case '1+': return 'Hervorragend! Perfekte Punktzahl.';
      case '1': return 'Sehr Gut! Fast perfekt.';
      case '2': return 'Gut gemacht! Weiter so.';
      case '3': return 'Befriedigend. Du lernst dazu.';
      case '4': return 'Ausreichend. Da ist noch Luft nach oben.';
      default: return 'Nicht bestanden. Übe noch ein wenig!';
    }
  };

  if (step === 'result') {
    const grade = getGermanGrade(score);
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center space-y-6 animate-in zoom-in duration-300">
        <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center border-4 border-indigo-200">
          <span className="text-6xl font-black text-indigo-600">{grade}</span>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800">Testergebnis</h2>
          <p className="text-slate-500 mt-2 font-medium">Du hast {score} von 10 richtig beantwortet.</p>
          <p className="text-indigo-600 font-semibold mt-4 text-lg">{gradeMessage(grade)}</p>
        </div>
        <div className="w-full pt-6">
          <button 
            onClick={onFinish}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-all"
          >
            Zurück zum Menü
          </button>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestionIndex];

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-bottom duration-300">
      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-8">
        <div 
          className="bg-indigo-500 h-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + (isAnswered ? 1 : 0)) / 10) * 100}%` }}
        />
      </div>

      <div className="text-center mb-8">
        <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Frage {currentQuestionIndex + 1} von 10</span>
        <h2 className="text-2xl font-extrabold text-slate-800 mt-2">Was ist die Hauptstadt von <span className="text-indigo-600">{currentQ.country.land}</span>?</h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {currentQ.options.map((opt, i) => {
          let bgColor = 'bg-white';
          let textColor = 'text-slate-700';
          let borderColor = 'border-slate-200';

          if (isAnswered) {
            if (opt === currentQ.country.hauptstadt) {
              bgColor = 'bg-emerald-500';
              textColor = 'text-white';
              borderColor = 'border-emerald-600';
            } else if (opt === selectedOption) {
              bgColor = 'bg-rose-500';
              textColor = 'text-white';
              borderColor = 'border-rose-600';
            } else {
              bgColor = 'bg-slate-50';
              textColor = 'text-slate-400';
              borderColor = 'border-slate-100';
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleOptionSelect(opt)}
              disabled={isAnswered}
              className={`w-full py-4 px-6 rounded-xl border-2 text-left font-bold transition-all shadow-sm flex justify-between items-center ${bgColor} ${textColor} ${borderColor} ${!isAnswered ? 'active:translate-y-1 hover:border-indigo-300' : ''}`}
            >
              <span>{opt}</span>
              {isAnswered && opt === currentQ.country.hauptstadt && <span>✓</span>}
              {isAnswered && opt === selectedOption && opt !== currentQ.country.hauptstadt && <span>✗</span>}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <button 
          onClick={nextQuestion}
          className="mt-10 w-full bg-slate-800 text-white py-4 rounded-xl font-bold shadow-lg animate-in fade-in slide-in-from-bottom duration-300"
        >
          {currentQuestionIndex === 9 ? 'Ergebnis anzeigen' : 'Nächste Frage'}
        </button>
      )}
    </div>
  );
};

export default QuizView;
