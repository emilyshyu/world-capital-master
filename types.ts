
export type Continent = 'Europa' | 'Asien' | 'Afrika' | 'Nordamerika' | 'Südamerika' | 'Ozeanien';

export interface Country {
  land: string;
  hauptstadt: string;
  kontinent: Continent;
}

export enum AppMode {
  Home,
  Flashcards,
  Quiz,
  Search
}

export type FlashcardUnit = 'Random10' | 'Random20' | 'Alphabetisch' | Continent;

export interface QuizQuestion {
  country: Country;
  options: string[];
}
