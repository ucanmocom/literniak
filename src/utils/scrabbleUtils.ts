// Polskie litery dla blanków
export const POLISH_LETTERS = [
  'A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł',
  'M', 'N', 'Ń', 'O', 'Ó', 'P', 'R', 'S', 'Ś', 'T', 'U', 'W', 'Y', 'Z', 'Ź', 'Ż'
];

// Punkty Scrabble dla polskich liter
export const SCRABBLE_POINTS: Record<string, number> = {
  // 1 punkt
  'A': 1, 'E': 1, 'I': 1, 'N': 1, 'O': 1, 'R': 1, 'S': 1, 'W': 1, 'Z': 1,
  // 2 punkty
  'C': 2, 'D': 2, 'K': 2, 'L': 2, 'M': 2, 'P': 2, 'T': 2, 'Y': 2,
  // 3 punkty
  'B': 3, 'G': 3, 'H': 3, 'J': 3, 'Ł': 3, 'U': 3,
  // 5 punktów
  'Ą': 5, 'Ę': 5, 'F': 5, 'Ó': 5, 'Ś': 5, 'Ź': 5, 'Ż': 5,
  // 6 punktów
  'Ć': 6, 'Ń': 6
};

// Oblicza punkty Scrabble, uwzględniając blanki (0 punktów za blanki)
export const getScrabblePoints = (word: string, inputLetters: string = ''): number => {
  if (!word) return 0;

  const input = inputLetters.trim().toUpperCase();
  const available = input.split('').map(c => c === '.' || c === '?' ? '*' : c);

  let sum = 0;
  for (const ch of word.toUpperCase()) {
    const idx = available.indexOf(ch);
    if (idx >= 0) {
      available.splice(idx, 1);
      sum += SCRABBLE_POINTS[ch] || 0;
    } else {
      const blankIdx = available.indexOf('*');
      if (blankIdx >= 0) {
        available.splice(blankIdx, 1);
        // Blank daje 0 punktów
      } else {
        sum += SCRABBLE_POINTS[ch] || 0;
      }
    }
  }
  return sum;
};

// Grupy słów po długości
export const groupWordsByLength = (words: string[]): Map<number, string[]> => {
  const grouped = new Map<number, string[]>();

  for (const word of words) {
    const length = word.length;
    if (!grouped.has(length)) {
      grouped.set(length, []);
    }
    grouped.get(length)!.push(word);
  }

  // Sort each group alphabetically
  grouped.forEach(group => group.sort());

  // Return sorted by length descending
  return new Map([...grouped.entries()].sort((a, b) => b[0] - a[0]));
};
