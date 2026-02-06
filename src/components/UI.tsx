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
      Literniak to szybkie i proste narzędzie do tworzenia słów z podanych liter. Idealne do gier słownych
      takich jak Scrabble, Literaki czy Word Games. Wpisz swoje litery, a Literniak w kilka sekund
      wygeneruje wszystkie możliwe słowa. Bez kombinowania, bez bólu głowy, po prostu
      działa.
      <br />
      <br />
      <strong>🧠 Jak korzystać z Literniaka?</strong>
      <br />
      <strong>1.</strong> Wpisz litery, które masz (np. z gry).
      <br />
      <strong>2.</strong> Kliknij Generuj słowa.
      <br />
      <strong>3.</strong> Gotowe – Literniak pokaże możliwe słowa z Twoich liter.
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
