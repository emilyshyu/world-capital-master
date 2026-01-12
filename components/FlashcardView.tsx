
import React, { useState, useMemo } from 'react';
import { FlashcardUnit, Country } from '../types';
import { countries } from '../data';

interface Props {
  unit: FlashcardUnit;
  onFinish: () => void;
}

const FlashcardView: React.FC<Props> = ({ unit, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const cardSet = useMemo(() => {
    let filtered = [...countries];
    if (unit === 'Alphabetisch') {
      return filtered.sort((a, b) => a.land.localeCompare(b.land));
    } else if (unit === 'Random10') {
      return filtered.sort(() => Math.random() - 0.5).slice(0, 10);
    } else if (unit === 'Random20') {
      return filtered.sort(() => Math.random() - 0.5).slice(0, 20);
    } else {
      // Continent filtering
      return filtered.filter(c => c.kontinent === unit).sort((a, b) => a.land.localeCompare(b.land));
    }
  }, [unit]);

  const currentCard = cardSet[currentIndex];

  const handleNext = () => {
    if (currentIndex < cardSet.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 150);
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev - 1), 150);
    }
  };

  return (
    <div className="flex flex-col items-center h-full justify-center space-y-8 py-10 animate-in slide-in-from-right duration-300">
      <div className="text-sm font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
        {currentIndex + 1} / {cardSet.length} • {unit}
      </div>

      <div 
        className="relative w-full aspect-[3/4] max-w-xs perspective-1000 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-transform duration-500 preserve-3d shadow-xl rounded-3xl ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-slate-100 backface-hidden">
            <span className="text-indigo-500 text-sm font-bold uppercase tracking-widest mb-4">Land</span>
            <h2 className="text-3xl font-extrabold text-center text-slate-800">{currentCard.land}</h2>
            <p className="mt-8 text-slate-300 text-sm italic">Tippe zum Umdrehen</p>
          </div>
          {/* Back */}
          <div className="absolute inset-0 bg-indigo-600 flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-indigo-500 backface-hidden rotate-y-180 text-white">
            <span className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-4">Hauptstadt</span>
            <h2 className="text-4xl font-black text-center">{currentCard.hauptstadt}</h2>
            <div className="mt-6 bg-indigo-500/50 px-4 py-1 rounded-full text-xs font-semibold">
              {currentCard.kontinent}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full max-w-xs">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex-1 bg-white border border-slate-200 py-3 rounded-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed shadow-sm active:scale-95 transition-all"
        >
          Zurück
        </button>
        <button 
          onClick={handleNext}
          className="flex-[2] bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-all"
        >
          {currentIndex === cardSet.length - 1 ? 'Beenden' : 'Nächste'}
        </button>
      </div>
    </div>
  );
};

export default FlashcardView;
