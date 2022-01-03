import React from 'react'
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import TrashIcon from '../assets/trash-icon.svg'
import  db  from '../firebase/config'
import { doc, deleteDoc } from "firebase/firestore";
import './RecipeList.css'

const RecipeList = ({ recipes }) => {
  const { mode } = useTheme();

  if (recipes.length === 0) {
    return (<div className="error">No recipes to load...</div>)
  }

  // handle delete
  const handleClick = (id) => {
    const docRef = doc(db, 'recipes', id)

    deleteDoc(docRef)

  }



  return (
    <div className={`recipe-list ${mode}`}>
      {recipes.map(recipe => (
        <div className="card" key={recipe.id}>
          <img src={TrashIcon} onClick={() => handleClick(recipe.id)}/>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
        </div>
      ))}
    </div>
  )
}

export default RecipeList;
