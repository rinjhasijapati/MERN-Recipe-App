import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGetUserID } from '../hooks/useGetUserID';

const home = () => {
  const [recipes, setRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.get("http://localhost:3001/recipes", { recipeID, userID });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => {
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={() => saveRecipe(recipe._id)}>Save</button>
            </div>
            <div className='instructions'>
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
          </li>
        })}
      </ul>
    </div>
  )
}

export default home