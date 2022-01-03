import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  db  from '../../firebase/config.js'
import { collection, addDoc } from "firebase/firestore";
import { useTheme } from '../../hooks/useTheme'
import './Create.css'

const Create = () => {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientInput = useRef(null) //used to control the input focus after adding.
  const navigate = useNavigate()

  const { mode } = useTheme()

  // handling submit and post request
  const handleSubmit = async(e) => {
    e.preventDefault()

    // adding a new document
    const colRef = collection(db, "recipes")
    const newRecipe = {title, method, ingredients, cookingTime: cookingTime + ' minutes'}
    await addDoc(colRef, newRecipe)

    setTitle('')
    setIngredients([])
    setMethod('')
    setCookingTime('')

    redirect()
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim() // to remove white spaces a user inputs

    if (ing && !ingredients.includes(ing)) {
     setIngredients(prevIngredients => [...prevIngredients, ing]) 
    }

    setNewIngredient('')
    ingredientInput.current.focus()
  }

  // redirect to home page after submitting the form or when we get data response
  const redirect = () => {
    setTimeout(() => {
      navigate('/')
    }, 3000);
  }

  return (
    <div className={`create ${mode}`}>
      <h2 className="page-title">Add a New Recipe</h2>

    <form onSubmit={handleSubmit}>
      <label>
        <span>Recipe Title:</span>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>

      <label>
        <span>Recipe Ingredient:</span>
        <div className="ingredients">
          <input 
            type="text"
            onChange={(e) => setNewIngredient(e.target.value)}
            value={newIngredient}
            ref={ingredientInput}
          />
          <button onClick={handleAdd} className="btn">add</button>
        </div>
      </label>
      <p>Current Ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

      <label>
        <span>Recipe Method:</span>
        <textarea
          required 
          type="text"
          onChange={(e) => setMethod(e.target.value)}
          value={method}
        />
      </label>

      <label>
        <span>Cooking Time (minutes):</span>
        <input
          required
          type="number"
          onChange={(e) => setCookingTime(e.target.value)}
          value={cookingTime}
        />
      </label>

      <button>Submit</button>
    </form>

    </div>
  )
}

export default Create;
