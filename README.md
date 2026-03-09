# Literniak 📝

[![Open Source](https://img.shields.io/badge/Open%20Source-MIT-blue)](https://github.com/ucanmocom/literniak)

Aplikacja do wyszukiwania polskich słów na podstawie dostępnych liter. Idealna dla graczy w Scrabble'a, Słowa z Wyrazów i innych słownych gier planszowych!

## 🎯 Funkcje

- **Wyszukiwanie słów** - Znajdź wszystkie słowa, które możesz ułożyć z posiadanych liter
- **Zaawansowane filtry**:
  - Filtruj słowa po pierwszej literze
  - Filtruj słowa po ostatniej literze
  - Filtruj słowa zawierające określoną sekwencję liter
  - Filtruj słowa po długości
- **Punktacja Scrabble** - Automatyczne liczenie punktów dla każdego słowa
- **Ulubione** - Zapisuj ulubione słowa i przeglądaj je w dedykowanej zakładce
- **Responsywny design** - Aplikacja działa zarówno na komputerze jak i na urządzeniach mobilnych

## 🛠️ Technologie

- **React 19** - Biblioteka UI
- **TypeScript** - Typowanie statyczne
- **Vite** - Szybkie narzędzie do budowania
- **CSS** - Stylizacja

## 📋 Wymagania

- Node.js (v16 lub nowsze)
- npm lub yarn

## 🚀 Instalacja i uruchomienie

```bash
# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev

# Zbuduj produkcyjną wersję
npm run build

# Podejrzyj produkcyjną wersję lokalnie
npm run preview
```

## 🔗 API

Aplikacja korzysta z bezpłatnego API słów polskich - **poocoo**

### Dokumentacja API
Pełna dokumentacja API dostępna jest tutaj: https://api.poocoo.pl/index.html

## 🧭 Opis SEO

Literniak to anagramator i wyszukiwarka słów zaprojektowana dla graczy Scrabble, Literaki i wszystkich fanów gier słownych. Aplikacja działa jako szybki wyszukiwacz słów i wyszukiwarka słów z liter: wpisujesz dostępne litery, a system zwraca możliwe słowa z liter oraz ich punktację. Jeśli interesuje Cię efektywne wyszukiwanie słów, szukanie wyrazów lub generator słów z podanych liter, Literniak pozwala błyskawicznie znaleźć najlepsze kombinacje.

## ❓ FAQ

### Czym jest Literniak?
Literniak to anagramator oraz wyszukiwarka słów z liter, która pomaga układać słowa do gier słownych.

### Czy Literniak działa do Scrabble i Literaki?
Tak. Narzędzie jest tworzone pod Scrabble, Literaki i podobne gry, gdzie liczy się szybkie znajdowanie słów.

### Jak działa wyszukiwarka słów z liter?
Wpisujesz litery, które masz, a aplikacja zwraca możliwe słowa z liter wraz z dodatkowymi filtrami.

### Czy to darmowy wyszukiwacz słów?
Tak, Literniak jest darmowy.

### Czy mogę zawęzić wyszukiwanie słów?
Tak. Możesz filtrować wyniki po pierwszej literze, ostatniej literze, fragmencie słowa i długości.

### Atrybutacja

Aplikacja korzysta z danych słów z API **poocoo**:
- 🔗 [poocoo.pl](https://poocoo.pl)
- 📖 [Dokumentacja API](https://api.poocoo.pl/index.html)

## 📦 Struktura projektu

```
src/
├── components/        # Komponenty React
│   ├── SearchForm.tsx # Główny formularz wyszukiwania
│   └── UI.tsx        # Komponenty UI
├── services/         # Serwisy API
│   └── poocooApi.ts  # Integracja z API poocoo
├── utils/            # Funkcje pomocnicze
│   └── scrabbleUtils.ts # Liczanie punktów Scrabble'a
├── App.tsx           # Główny komponent aplikacji
└── main.tsx          # Punkt wejścia aplikacji
```

## 💾 Dane lokalne

Aplikacja przechowuje ulubione słowa w `localStorage` przeglądarki, więc twoja lista ulubionych jest dostępna nawet po zamknięciu aplikacji.

## 🤝 Open Source

Ten projekt jest **całkowicie darmowy i otwarty dla każdego**! 

Możesz go:
- 🔧 Rozwijać i dodawać nowe funkcje
- 🐛 Zgłaszać i naprawiać błędy
- 📖 Ulepszać dokumentację
- 💾 Klonować i modyfikować na swoje potrzeby

**Repozytorium:** https://github.com/ucanmocom/literniak

Zachęcamy do współtworzenia projektu! 🚀

## 📄 Licencja

Ten projekt jest dostępny do użytku publicznego.

---

**Miej zabawę z Literniakiem! 🎮**
