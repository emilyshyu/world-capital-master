
import React, { useState, useMemo } from 'react';
import { countries } from '../data';
import { Country } from '../types';

const SearchView: React.FC = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return countries
      .filter(c => 
        c.land.toLowerCase().includes(lowerQuery) || 
        c.hauptstadt.toLowerCase().includes(lowerQuery)
      )
      .sort((a, b) => a.land.localeCompare(b.land))
      .slice(0, 10); // Limit results for mobile
  }, [query]);

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <div className="relative mb-6">
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Land oder Hauptstadt eingeben..."
          className="w-full bg-white border-2 border-indigo-100 rounded-2xl py-4 px-6 text-lg font-medium shadow-sm focus:border-indigo-500 focus:outline-none transition-all"
          autoFocus
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-indigo-300">
          🔍
        </div>
      </div>

      <div className="flex-1 space-y-3">
        {filtered.length > 0 ? (
          filtered.map((c, i) => (
            <div 
              key={i}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 animate-in slide-in-from-bottom duration-200"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="bg-indigo-50 w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0">
                🏳️
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800 leading-tight">{c.land}</h3>
                <p className="text-indigo-600 font-semibold">{c.hauptstadt}</p>
                <span className="text-xs text-slate-400 font-medium">{c.kontinent}</span>
              </div>
            </div>
          ))
        ) : query.trim() !== '' ? (
          <div className="text-center py-20 text-slate-400 italic">
            Keine Ergebnisse für "{query}" gefunden.
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            <p className="mb-2">💡 Tipp:</p>
            <p className="text-sm">Suche nach einem Land wie "Deutschland" oder einer Stadt wie "Paris".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;
