import React, { useEffect, useState } from 'react'
import { doc, onSnapshot, updateDoc  } from 'firebase/firestore'
import  db  from '../../firebase/config.js'
import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import './Recipe.css'

const Recipe = () => {
  const { id } = useParams()
  const { mode } = useTheme()
  const [recipe, setRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)


  useEffect(() => {
    const docRef = doc(db, "recipes", id)
    setIsLoading(true)
    onSnapshot(docRef,(doc) => {
      if (doc.exists) {
        setIsLoading(false)
        setRecipe(doc.data())
      } else {
        setIsLoading(false)
        setError("Couldn't find recipe to load")
      }

    })
  }, [id])

  // handle click
  // const handleClick = () => {
  //   const docRef = doc(db, 'recipes', id)

  //   updateDoc(docRef, {
  //     title: "Chivita Fruit"
  //   })
  // }



  return (
    <div className={`recipe ${mode}`}>
      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {recipe && (
        <div>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime}</p>
          <ul>
            {recipe.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>

          {/* <button onClick={handleClick}>Update Me</button> */}
        </div>
      )}
    </div>
  )
}

export default Recipe;
