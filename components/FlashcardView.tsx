
import React, { useState, useMemo } from 'react';
import { FlashcardUnit, Country } from '../types.ts';
import { countries } from '../data.ts';

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
      // Give time for the card to unflip before changing content
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 150);
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
      }, 150);
    }
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center h-full justify-center space-y-8 py-10 animate-in slide-in-from-right duration-300">
      <div className="text-sm font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
        {currentIndex + 1} / {cardSet.length} • {unit}
      </div>

      <div 
        className="relative w-full aspect-[3/4] max-w-xs perspective-1000 cursor-pointer"
        onClick={toggleFlip}
      >
        <div className={`relative w-full h-full transition-transform duration-500 preserve-3d shadow-2xl rounded-3xl ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front Side - Ländersame */}
          <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-slate-100 backface-hidden">
            <span className="text-indigo-500 text-sm font-bold uppercase tracking-widest mb-4">Land</span>
            <h2 className="text-3xl font-extrabold text-center text-slate-800">{currentCard.land}</h2>
            <div className="absolute bottom-10 text-slate-300 text-sm animate-pulse flex items-center gap-2">
              <span>👆</span> Tippe zum Umdrehen
            </div>
          </div>
          
          {/* Back Side - Hauptstadt */}
          <div className="absolute inset-0 bg-indigo-600 flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-indigo-500 backface-hidden rotate-y-180 text-white shadow-inner">
            <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-4">Die Hauptstadt ist:</span>
            <h2 className="text-4xl font-black text-center mb-6">{currentCard.hauptstadt}</h2>
            <div className="bg-white/20 px-6 py-2 rounded-full backdrop-blur-md">
              <span className="text-sm font-bold">{currentCard.kontinent}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full max-w-xs">
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          disabled={currentIndex === 0}
          className="flex-1 bg-white border border-slate-200 py-3 rounded-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed shadow-sm active:scale-95 transition-all text-slate-600"
        >
          Zurück
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="flex-[2] bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-all"
        >
          {currentIndex === cardSet.length - 1 ? 'Beenden' : 'Nächste'}
        </button>
      </div>
    </div>
  );
};

export default FlashcardView;
