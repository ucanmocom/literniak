const POOCOO_API = 'https://api.poocoo.pl/api/v1';

export interface WordsResponse {
  data: {
    wordGroups: Array<{
      words: string[];
    }>;
  };
}

export interface SearchResponse {
  results: Array<{
    word: string;
  }>;
}

// Wyszukuje słowa na podstawie liter
export const searchWords = async (letters: string, limit: number = 100): Promise<string[]> => {
  try {
    const url = `${POOCOO_API}/words-from-letters?letters=${encodeURIComponent(letters)}&limit=${limit}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data: WordsResponse = await response.json();
    const words = new Set<string>();

    if (data.data?.wordGroups) {
      for (const group of data.data.wordGroups) {
        if (group.words) {
          group.words.forEach(word => words.add(word));
        }
      }
    }

    return Array.from(words);
  } catch (error) {
    console.error('Error searching words:', error);
    return [];
  }
};

// Sprawdza czy słowo istnieje
export const checkWord = async (word: string): Promise<boolean> => {
  try {
    const url = `${POOCOO_API}/search?q=${encodeURIComponent(word.toUpperCase())}&limit=1`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data: SearchResponse = await response.json();
    return (data.results?.length ?? 0) > 0;
  } catch (error) {
    console.error('Error checking word:', error);
    return false;
  }
};
