import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import * as UI from './UI';
import { getScrabblePoints, groupWordsByLength } from '../utils/scrabbleUtils';
import { searchWords } from '../services/poocooApi';

interface SearchState {
  letters: string;
  startsWith: string;
  endsWith: string;
  contains: string;
  length: number | '';
  words: string[];
  isLoading: boolean;
  error?: string;
}

export const SearchForm: FC = () => {
  const [search, setSearch] = useState<SearchState>({
    letters: '',
    startsWith: '',
    endsWith: '',
    contains: '',
    length: '',
    words: [],
    isLoading: false,
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'search' | 'favorites'>('search');
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('literniak_favorites');
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save favorites to localStorage
  const saveFavorites = (newFavorites: Set<string>) => {
    setFavorites(newFavorites);
    localStorage.setItem('literniak_favorites', JSON.stringify(Array.from(newFavorites)));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.letters.trim()) return;

    setSearch((prev) => ({ ...prev, isLoading: true, error: undefined }));

    try {
      const allWords = new Set<string>();
      const words = await searchWords(search.letters, 200);
      words.forEach((w) => allWords.add(w));

      let filtered = Array.from(allWords);

      // Apply filters
      if (search.startsWith.trim()) {
        filtered = filtered.filter((w) => w.toLowerCase().startsWith(search.startsWith.toLowerCase()));
      }
      if (search.endsWith.trim()) {
        filtered = filtered.filter((w) => w.toLowerCase().endsWith(search.endsWith.toLowerCase()));
      }
      if (search.contains.trim()) {
        filtered = filtered.filter((w) => w.toLowerCase().includes(search.contains.toLowerCase()));
      }
      if (search.length !== '') {
        filtered = filtered.filter((w) => w.length === Number(search.length));
      }

      setSearch((prev) => ({ ...prev, words: filtered, isLoading: false }));

      // Scroll to results
      setTimeout(() => {
        if (resultsRef.current) {
          const elementPosition = resultsRef.current.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - 100,
            behavior: 'smooth',
          });
        }
      }, 100);

      // Hide mobile keyboard
      inputRef.current?.blur();
    } catch (error) {
      setSearch((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Błąd podczas wyszukiwania. Spróbuj ponownie.',
      }));
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle Enter key (works on desktop and most mobile keyboards)
    // Also check keyCode 13 for Android compatibility
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      handleSearch(e as unknown as React.FormEvent);
    }
  };

  const toggleFavorite = (word: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(word)) {
      newFavorites.delete(word);
    } else {
      newFavorites.add(word);
    }
    saveFavorites(newFavorites);
  };

  const wordsByLength = groupWordsByLength(search.words);
  const favoritesGrouped = groupWordsByLength(Array.from(favorites));

  return (
    <>
      <UI.Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <UI.Header />
      <UI.Container>
        {activeTab === 'search' ? (
          <>
            <form onSubmit={handleSearch}>
                <UI.InputGroup
                  ref={inputRef}
                  value={search.letters}
                  onChange={(value) => setSearch((prev) => ({ ...prev, letters: value }))}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Wpisz litery..."
                  maxLength={15}
                />

                <UI.ButtonGroup>
                  <UI.Button type="submit" disabled={search.isLoading || !search.letters.trim()}>
                    {search.isLoading ? 'Szukam...' : 'Szukaj słów'}
                  </UI.Button>
                </UI.ButtonGroup>

                <UI.FiltersGroup isOpen={filtersOpen} onToggle={() => setFiltersOpen(!filtersOpen)}>
                  <UI.FilterInput
                    value={search.startsWith}
                    onChange={(value) => setSearch((prev) => ({ ...prev, startsWith: value }))}
                    placeholder="Zaczyna się od..."
                    maxLength={10}
                  />
                  <UI.FilterInput
                    value={search.endsWith}
                    onChange={(value) => setSearch((prev) => ({ ...prev, endsWith: value }))}
                    placeholder="Kończy się na..."
                    maxLength={10}
                  />
                  <UI.FilterInput
                    value={search.contains}
                    onChange={(value) => setSearch((prev) => ({ ...prev, contains: value }))}
                    placeholder="Zawiera fragment..."
                    maxLength={10}
                  />
                  <UI.FilterInput
                    type="number"
                    value={String(search.length)}
                    onChange={(value) => setSearch((prev) => ({ ...prev, length: value ? Number(value) : '' }))}
                    placeholder="Długość"
                    min={2}
                    max={20}
                  />
                </UI.FiltersGroup>

                <UI.Description isHidden={search.words.length > 0 || search.isLoading} />

                {search.error && <UI.NoResults message={search.error} />}

                {search.words.length > 0 && <div ref={resultsRef} />}
              </form>

              {search.words.length > 0 && (
                <div className="results-section">
                  <UI.ResultsTitle count={search.words.length} />
                  {Array.from(wordsByLength.entries()).map(([length, wordsInLength]) => (
                    <UI.WordGroup key={length} length={length} count={wordsInLength.length}>
                      {wordsInLength.map((word) => (
                        <UI.WordTag
                          key={word}
                          word={word}
                          points={getScrabblePoints(word, search.letters)}
                          isFavorite={favorites.has(word)}
                          onFavoriteToggle={(e) => {
                            e.stopPropagation();
                            toggleFavorite(word);
                          }}
                        />
                      ))}
                    </UI.WordGroup>
                  ))}
                </div>
              )}

              {search.words.length === 0 && !search.isLoading && search.letters.trim() && (
                <UI.NoResults />
              )}
            </>
        ) : (
          <div className="favorites-section">
            {favorites.size === 0 ? (
              <>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#3d4759' }}>❤️ Polubione słowa</h2>
                <UI.NoResults message="Brak polubionych słów. Dodaj kilka słów do ulubionych używając serca na karcie Szukaj!" />
              </>
            ) : (
              <>
                <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#3d4759' }}>❤️ Polubione słowa</h2>
                <div style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '0.95rem', color: '#64748b' }}>
                  Masz <strong>{favorites.size}</strong> polubionych słów
                </div>
                {Array.from(favoritesGrouped.entries()).map(([length, wordsInLength]) => (
                  <UI.WordGroup key={length} length={length} count={wordsInLength.length}>
                    {wordsInLength.map((word) => (
                      <UI.WordTag
                        key={word}
                        word={word}
                        points={getScrabblePoints(word)}
                        isFavorite={true}
                        onFavoriteToggle={(e) => {
                          e.stopPropagation();
                          toggleFavorite(word);
                        }}
                      />
                    ))}
                  </UI.WordGroup>
                ))}
              </>
            )}
          </div>
        )}

        <UI.Footer />
      </UI.Container>
    </>
  );
};
