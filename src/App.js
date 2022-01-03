import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import ThemeSelector from './components/ThemeSelector';
import { useTheme } from './hooks/useTheme';
import Create from './pages/create/Create';
import Home from './pages/home/Home';
import Recipe from './pages/recipe/Recipe';
import Search from './pages/search/Search';

function App() {
  const { mode } = useTheme()

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/recipes/:id" element={<Recipe/>}/>
          <Route path="*" element={<Navigate to ="/" />}/>
        </Routes>
      
      </BrowserRouter> 
    </div>
  );
}

export default App