
import React, { useState, useMemo } from 'react';
import { AppMode, Country, FlashcardUnit, Continent } from './types.ts';
import { countries } from './data.ts';
import FlashcardView from './components/FlashcardView.tsx';
import QuizView from './components/QuizView.tsx';
import SearchView from './components/SearchView.tsx';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.Home);
  const [selectedUnit, setSelectedUnit] = useState<FlashcardUnit | null>(null);

  const continents: Continent[] = ['Europa', 'Asien', 'Afrika', 'Nordamerika', 'Südamerika', 'Ozeanien'];

  const handleStartFlashcards = (unit: FlashcardUnit) => {
    setSelectedUnit(unit);
    setMode(AppMode.Flashcards);
  };

  const handleStartQuiz = () => {
    setMode(AppMode.Quiz);
  };

  const handleOpenSearch = () => {
    setMode(AppMode.Search);
  };

  const goHome = () => {
    setMode(AppMode.Home);
    setSelectedUnit(null);
  };

  return (
    <div className="min-h-screen max-w-lg mx-auto bg-slate-50 flex flex-col shadow-xl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-indigo-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 
          className="text-xl font-bold cursor-pointer flex items-center gap-2"
          onClick={goHome}
        >
          <span>🌍</span> Hauptstadt-Meister
        </h1>
        {mode !== AppMode.Home && (
          <button 
            onClick={goHome}
            className="bg-indigo-500 hover:bg-indigo-400 px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            Zurück
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {mode === AppMode.Home && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <section>
              <h2 className="text-lg font-bold mb-4 text-slate-700">Lernkarten (Flashcards)</h2>
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="font-semibold mb-2 text-indigo-600">Schnell-Modus</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleStartFlashcards('Random10')}
                      className="flex-1 bg-indigo-50 text-indigo-700 py-3 rounded-lg font-medium border border-indigo-100 active:scale-95 transition-transform"
                    >
                      10 Zufällige
                    </button>
                    <button 
                      onClick={() => handleStartFlashcards('Random20')}
                      className="flex-1 bg-indigo-50 text-indigo-700 py-3 rounded-lg font-medium border border-indigo-100 active:scale-95 transition-transform"
                    >
                      20 Zufällige
                    </button>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="font-semibold mb-3 text-indigo-600">Nach Kontinent</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {continents.map(c => (
                      <button 
                        key={c}
                        onClick={() => handleStartFlashcards(c)}
                        className="bg-slate-50 text-slate-700 py-2 px-3 rounded-lg text-sm font-medium border border-slate-100 active:bg-indigo-50 active:text-indigo-600 transition-colors"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => handleStartFlashcards('Alphabetisch')}
                  className="w-full bg-white text-slate-700 py-4 rounded-xl font-semibold border border-slate-200 shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  🔡 Alphabetisch (Alle)
                </button>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-4 text-slate-700">Testen & Suchen</h2>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={handleStartQuiz}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-5 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                >
                  <span className="text-2xl">🏆</span> Hauptstadt-Quiz (10 Fragen)
                </button>
                <button 
                  onClick={handleOpenSearch}
                  className="w-full bg-white text-slate-700 py-4 rounded-xl font-semibold border border-slate-200 shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  <span className="text-xl">🔍</span> Länder & Hauptstädte suchen
                </button>
              </div>
            </section>
          </div>
        )}

        {mode === AppMode.Flashcards && selectedUnit && (
          <FlashcardView unit={selectedUnit} onFinish={goHome} />
        )}

        {mode === AppMode.Quiz && (
          <QuizView onFinish={goHome} />
        )}

        {mode === AppMode.Search && (
          <SearchView />
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 bg-slate-100 text-slate-400 text-center text-xs border-t">
        &copy; 2024 Hauptstadt-Meister App • Alle Länder auf Deutsch
      </footer>
    </div>
  );
};

export default App;
