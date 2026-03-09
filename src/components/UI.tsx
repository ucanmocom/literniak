import { useEffect } from 'react';

interface ModalProps {
  message: string;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ message, onClose }) => {
  useEffect(() => {
    const handleKey = () => {
      onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <p>{message}</p>
        <button className="modal-close-btn" onClick={onClose}>Zamknij</button>
      </div>
    </div>
  );
};
import type { FC, ReactNode } from 'react';
import { forwardRef } from 'react';

interface NavbarProps {
  activeTab: 'search' | 'favorites';
  onTabChange: (tab: 'search' | 'favorites') => void;
}

export const Navbar: FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="literniak-navbar">
      <div className="navbar-container">
        <div className="navbar-logo-title">
          <div className="navbar-logo">
            <img src="/logo.png" alt="Literniak" />
          </div>
          <div className="navbar-brand">
            <h2>Literniak</h2>
            <p>Anagramator i wyszukiwarka słów</p>
          </div>
        </div>
        <div className="navbar-menu">
          <button
            className={`navbar-item ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => onTabChange('search')}
          >
            SŁOWA Z LITER
          </button>
          <button
            className={`navbar-item ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => onTabChange('favorites')}
          >
            ULUBIONE
          </button>
        </div>
      </div>
    </nav>
  );
};

interface HeaderProps {
  logoSrc?: string;
}

export const Header: FC<HeaderProps> = () => {
  return (
    <div className="literniak-header">
      <h1>Literniak - Wyszukiwarka Słów z Liter</h1>
      <p>Szybko znajdź każde słowo z Twoich liter</p>
    </div>
  );
};

interface ContainerProps {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="literniak-container">{children}</div>;
};

interface InputGroupProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  placeholder?: string;
  hint?: string;
  maxLength?: number;
  isLoading?: boolean;
}

export const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(({
  label,
  value,
  onChange,
  onKeyDown,
  onClear,
  placeholder = 'Wpisz litery...',
  hint,
  maxLength = 15,
  isLoading = false,
}, ref) => {
  return (
    <div className="input-group-main">
      {label && <label>{label}</label>}
      <div className="input-wrapper">
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          maxLength={maxLength}
          className="input-main"
        />
        {isLoading && (
          <div className="input-spinner">
            <div className="spinner-small"></div>
          </div>
        )}
        {!isLoading && value && onClear && (
          <button
            type="button"
            className="input-clear-btn"
            onClick={onClear}
            aria-label="Wyczyść pole"
          >
            ✕
          </button>
        )}
      </div>
      {hint && <span className="input-hint">{hint}</span>}
    </div>
  );
});

InputGroup.displayName = 'InputGroup';

interface ButtonGroupProps {
  children: ReactNode;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({ children }) => {
  return <div className="button-group">{children}</div>;
};

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  children,
}) => {
  const className = `btn-large btn-${variant}-main`;
  return (
    <button type={type} onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
};

interface FiltersGroupProps {
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export const FiltersGroup: FC<FiltersGroupProps> = ({ isOpen, onToggle, children }) => {
  return (
    <>
      <div className="filters-toggle" onClick={onToggle}>
        <span className={`filters-arrow ${isOpen ? 'rotated' : ''}`}>▼</span>
        <span>⚙️ Zaawansowane szukanie</span>
      </div>
      <div className={`filters-group ${!isOpen ? 'collapsed' : ''}`}>{children}</div>
    </>
  );
};

interface FilterInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: 'text' | 'number';
  maxLength?: number;
  min?: number;
  max?: number;
}

export const FilterInput: FC<FilterInputProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  maxLength,
  min,
  max,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="filter-input"
      {...(maxLength && { maxLength })}
      {...(min !== undefined && { min })}
      {...(max !== undefined && { max })}
    />
  );
};

interface DescriptionProps {
  isHidden?: boolean;
}

export const Description: FC<DescriptionProps> = ({ isHidden = false }) => {
  return (
    <div className={`description ${isHidden ? 'hidden' : ''}`}>
      <strong>🔤 Literniak – generator słów z liter</strong>
      <br />
      <br />
      Literniak to rozbudowany anagramator online i praktyczna wyszukiwarka słów dla wszystkich, którzy
      chcą sprawnie układać słowa w grach językowych. Narzędzie zostało przygotowane z myślą o osobach,
      które grają w Scrabble, Literaki i inne gry planszowe, gdzie liczy się szybkość, dokładność i dobra
      strategia. Jeśli potrzebujesz miejsca, w którym wyszukiwanie słów jest wygodne, czytelne i szybkie,
      ta aplikacja działa właśnie jako nowoczesny wyszukiwacz słów oraz precyzyjna wyszukiwarka słów z liter.
      <br />
      <br />
      W praktyce działa to bardzo prosto: wpisujesz dostępne litery, a Literniak natychmiast zwraca słowa
      z liter, które możesz realnie zagrać. Dzięki temu szukanie wyrazów nie wymaga już ręcznego analizowania
      kombinacji. Zamiast zgadywać, dostajesz gotowe listy wyników i możesz szybciej zdecydować, które słowo
      da Ci najlepszy wynik punktowy. To właśnie dlatego Literniak jest traktowany jako generator słów z
      podanych liter zarówno przez początkujących, jak i bardziej zaawansowanych graczy.
      <br />
      <br />
      Narzędzie wspiera codzienną grę na kilka sposobów: pokazuje szeroki zestaw wyników, pozwala filtrować
      słowa i pomaga znaleźć trafniejsze opcje pod konkretną sytuację na planszy. Niezależnie od tego, czy
      grasz rekreacyjnie, czy rywalizujesz o najwyższy wynik, dobrze działająca wyszukiwarka słów z liter
      daje realną przewagę. Literniak łączy funkcję anagramatora z wygodnym interfejsem, dlatego cały proces
      układania słów staje się szybszy i bardziej przewidywalny.
      <br />
      <br />
      Jeśli szukasz rozwiązania pod hasła takie jak: anagramator, wyszukiwarka słów, wyszukiwacz słów,
      wyszukiwanie słów, słowa z liter, szukanie wyrazów, generator słów z podanych liter, to Literniak
      został przygotowany dokładnie pod takie zastosowania. Dodatkowo dobrze sprawdza się w grach typu
      Scrabble i Literaki, gdzie wybór jednej dobrej opcji może zdecydować o całej rundzie.
      <br />
      <br />
      <strong>🧠 Jak korzystać z Literniaka?</strong>
      <br />
      <strong>1.</strong> Wpisz litery, które masz (np. z gry).
      <br />
      <strong>2.</strong> Kliknij Generuj słowa.
      <br />
      <strong>3.</strong> Gotowe – Literniak pokaże możliwe słowa z Twoich liter.
      <br />
      <br />
      <strong>❓ FAQ</strong>
      <br />
      <strong>Czy Literniak działa jako wyszukiwarka słów z liter?</strong>
      <br />
      Tak. Wpisujesz dostępne litery, a system zwraca możliwe słowa z liter, które możesz wykorzystać
      w grze. To klasyczna wyszukiwarka słów z liter połączona z funkcją anagramatora.
      <br />
      <br />
      <strong>Czy to jest anagramator do Scrabble i Literaki?</strong>
      <br />
      Tak. Literniak został stworzony pod Scrabble i Literaki, dlatego działa jako anagramator oraz
      wyszukiwacz słów do szybkiego przygotowania najlepszego ruchu.
      <br />
      <br />
      <strong>Czy mogę filtrować wyniki wyszukiwania słów?</strong>
      <br />
      Tak. Po wyszukiwaniu słów możesz zawęzić wyniki po początku, końcu, fragmencie i długości słowa,
      co usprawnia szukanie wyrazów pod konkretną planszę.
      <br />
      <br />
      <strong>Czy generator słów z podanych liter jest darmowy?</strong>
      <br />
      Tak, Literniak jest darmowy i dostępny online.
      <br />
      <br />
      <strong>Czy Literniak pomaga przy szybkim wyszukiwaniu słów w trakcie rozgrywki?</strong>
      <br />
      Tak. Narzędzie zostało zaprojektowane tak, aby wyszukiwanie słów było szybkie i wygodne nawet
      podczas aktywnej gry, gdy liczy się czas.
      <br />
      <br />
      <strong>Czy mogę traktować Literniak jako codzienny wyszukiwacz słów?</strong>
      <br />
      Tak. Literniak sprawdza się jako codzienna wyszukiwarka słów do nauki, zabawy i gier planszowych.
      Działa jako anagramator, wyszukiwarka słów z liter i praktyczny generator słów z podanych liter.
      <br />
      <br />
      <strong>Czy działa na telefonie?</strong>
      <br />
      Tak, aplikacja jest responsywna i działa na urządzeniach mobilnych.
    </div>
  );
};

interface CheckResultProps {
  word: string;
  isValid: boolean;
  points?: number;
}

export const CheckResult: FC<CheckResultProps> = ({ word, isValid, points }) => {
  const resultClass = isValid ? 'valid' : 'invalid';
  const resultIcon = isValid ? '✅' : '❌';
  const resultText = isValid
    ? `Słowo '${word}' jest ważne! Możesz go użyć w grach.`
    : `Słowo '${word}' nie zostało znalezione w słowniku.`;

  return (
    <div className={`check-result ${resultClass}`}>
      <span className="check-result-icon">{resultIcon}</span>
      <div className="check-result-text">{resultText}</div>
      {isValid && <div className="check-result-points">{points} pkt</div>}
    </div>
  );
};

interface ResultsTitleProps {
  count: number;
}

export const ResultsTitle: FC<ResultsTitleProps> = ({ count }) => {
  return (
    <div className="results-title">
      Znalezione <span className="results-count">{count}</span> słów
    </div>
  );
};

interface NoResultsProps {
  message?: string;
}

export const NoResults: FC<NoResultsProps> = ({
  message = 'Brak wyników dla podanych kryteriów. Spróbuj zmienić filtry lub wpisać inne litery.',
}) => {
  return (
    <div className="no-results">
      <p>{message}</p>
    </div>
  );
};

interface WordTagProps {
  word: string;
  points: number;
  isFavorite?: boolean;
  onFavoriteToggle?: (e: React.MouseEvent) => void;
}

export const WordTag: FC<WordTagProps> = ({
  word,
  points,
  isFavorite = false,
  onFavoriteToggle,
}) => {
  return (
    <span className="word-tag">
      <span className="word-text">{word}</span>
      <span className="points">{points} pkt</span>
      <span
        className={`word-favorite ${isFavorite ? 'active' : ''}`}
        onClick={onFavoriteToggle}
        role="button"
        tabIndex={0}
      >
        ♥
      </span>
    </span>
  );
};

interface WordGroupProps {
  length: number;
  count: number;
  children: ReactNode;
}

export const WordGroup: FC<WordGroupProps> = ({ length, count, children }) => {
  return (
    <div className="word-group">
      <div className="word-group-title">
        {length}-literowe słowa ({count})
      </div>
      <div className="words-list">{children}</div>
    </div>
  );
};

interface FooterProps {
  children?: ReactNode;
}

export const Footer: FC<FooterProps> = ({ children }) => {
  return (
    <div className="footer">
      {children || (
        <>
          <p>Dane słownikowe: <a href="https://poocoo.pl" target="_blank" rel="noreferrer">poocoo.pl</a></p>
          <p className="footer-disclaimer">
            SCRABBLE® jest zastrzeżonym znakiem towarowym. Wszystkie prawa do marki należą do jej właścicieli. Ta strona nie jest powiązana z firmą Mattel. LITERAKI® jest zastrzeżonym znakiem towarowym. Wszystkie prawa do marki należą do jej właścicieli. Ta strona nie jest powiązana z twórcami gry Literaki ani serwisem Kurnik.pl. KURNIK® jest zastrzeżonym znakiem towarowym. Wszystkie prawa do marki należą do jej właścicieli. Ta strona nie jest powiązana z serwisem Kurnik.pl ani jego właścicielami.
          </p>
          <p style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.1)', fontSize: '0.9em' }}>
            <strong>Projekt Open Source:</strong> <a href="https://github.com/ucanmocom/literniak" target="_blank" rel="noopener noreferrer">GitHub - Literniak</a>
          </p>
        </>
      )}
    </div>
  );
};

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: ReactNode;
}

export const Tabs: FC<TabsProps> = ({ activeTab, onTabChange, children }) => {
  return (
    <div className="tabs">
      <button
        className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
        onClick={() => onTabChange('search')}
      >
        🔍 Szukaj
      </button>
      <button
        className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
        onClick={() => onTabChange('favorites')}
      >
        ❤️ Ulubione
      </button>
      <div className="tab-content">{children}</div>
    </div>
  );
};
