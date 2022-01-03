import React from 'react'
import { useLocation } from 'react-router-dom'
import RecipeList from '../../components/RecipeList'
import { useFetch } from '../../hooks/useFetch'
import { useTheme } from '../../hooks/useTheme'
import './Search.css'

const Search = () => {
  const querystring = useLocation().search
  const queryParams = new URLSearchParams(querystring)
  const query = queryParams.get('q')

  const url = 'http://localhost:3000/recipes?q=' + query
  const { data, isLoading, error} = useFetch(url)
  const { mode } = useTheme()

  return (
    <div className={`search ${mode}`}>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data}/>}
    </div>
  )
}

export default Search;