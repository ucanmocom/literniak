import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { SearchForm } from './components/SearchForm'
import './App.css'

const CanonicalLink = () => {
  const location = useLocation()

  useEffect(() => {
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null

    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }

    canonical.href = `${window.location.origin}${location.pathname}`
  }, [location.pathname])

  return null
}

const WordsFromLettersPage = () => {
  const { letters = '' } = useParams()
  return <SearchForm routeLetters={letters} />
}

function App() {
  return (
    <>
      <CanonicalLink />
      <Routes>
        <Route path="/" element={<SearchForm />} />
        <Route path="/slowazliter/:letters" element={<WordsFromLettersPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
