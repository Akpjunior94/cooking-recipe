import { onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import RecipeList from '../../components/RecipeList'
import  db  from '../../firebase/config.js'
import { collection } from "firebase/firestore";
import './Home.css'
import { useTheme } from '../../hooks/useTheme';

const Home = () => {
  const { mode } = useTheme()
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  
  useEffect(() => {
    const colRef = collection(db, 'recipes')
   setIsLoading(true)

   onSnapshot(colRef,(snapshot) => {
    if (snapshot.empty) {
        setError('No recipes to load')
      } else {
        setData(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        setIsLoading(false)
      }
    })
  }, []);


  return (
    <div className={`home ${mode}`}>
      {isLoading && <div className="loading">Loading...</div>}
      {error && <p className="error">{error}</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}

export default Home;
