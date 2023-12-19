const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const FOODELcontainer = document.querySelector('.FOODEL-container');
const FOODELdetailscontent = document.querySelector('.FOODEL-details-content');
const FOODELclosebtn = document.querySelector('.FOODEL-close-btn');

//get random meal
const getRandomMeal = async () => {
    const randomMealContainer = document.querySelector('.randomMealContainer');
    randomMealContainer.innerHTML ="<h2>Fetching Random Meal....</h2>";

    const data = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const response = await data.json();

    randomMealContainer.innerHTML = "";
    const meal = response.meals[0];

    const FOODELdiv = document.createElement('div');
    FOODELdiv.classList.add('FOODEL');
    FOODELdiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to<span>${meal.strCategory}</span> Category </p>
    `;
    const button = document.createElement('button');
    button.textContent = "View Recipe";
    FOODELdiv.appendChild(button);

    button.addEventListener('click', () => {
        openFOODELPopup(meal);
    });

    randomMealContainer.appendChild(FOODELdiv);
};

// Call getRandomMeal function when the page loads
window.addEventListener('load', getRandomMeal);


const fetchFOODEL = async (query) => {
    FOODELcontainer.innerHTML = "<h2>Fetching Recipes....</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    FOODELcontainer.innerHTML = "";
    response.meals.forEach((meal) => {
        const FOODELdiv = document.createElement('div');
        FOODELdiv.classList.add('FOODEL');
        FOODELdiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to<span>${meal.strCategory}</span> Category </p>
       `;
       const button = document.createElement('button');
       button.textContent = "View Recipe";
       FOODELdiv.appendChild(button);

       button.addEventListener('click', () => {
           openFOODELPopup(meal);
       });

        FOODELcontainer.appendChild(FOODELdiv);
    });
};

// To fetch ingredients and measurements

const fetchIngredients = (meal) => {
    let IngredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            IngredientsList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return IngredientsList;
};

const openFOODELPopup = (meal) => {
    FOODELdetailscontent.innerHTML = `
    <h2 class="ingredientList">${meal.strMeal}</h2>
    <h3>Ingredients :</h3>
    <ul>${fetchIngredients(meal)}</ul>
    <div>
        <h3>Instructions:</h3>
        <p class = "FOODELInstructions">${meal.strInstructions}</p>
        </div>
    `
    FOODELdetailscontent.parentElement.style.display = "block";
};

FOODELclosebtn.addEventListener('click' , ()=>{
    FOODELdetailscontent.parentElement.style.display = "none";
});


// Call getRandomMeal function when the page loads
window.addEventListener('load', getRandomMeal);

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchFOODEL(searchInput);
    // console.log("Button Clicked");
});
