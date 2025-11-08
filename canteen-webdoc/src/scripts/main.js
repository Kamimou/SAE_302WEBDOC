// This file contains the main JavaScript functionality for the canteen web project.
// It initializes the page, sets up event listeners, and handles overall functionality.

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the page
    init();

    // Set up event listeners
    setupEventListeners();
});

function init() {
    // Load ingredients and render them on the plate
    loadIngredients();
}

function setupEventListeners() {
    // Add event listeners for ingredient interactions
    const ingredients = document.querySelectorAll('.ingredient');
    ingredients.forEach(ingredient => {
        ingredient.addEventListener('mouseover', handleMouseOver);
        ingredient.addEventListener('mouseout', handleMouseOut);
        ingredient.addEventListener('click', handleClick);
    });
}

function handleMouseOver(event) {
    const ingredient = event.target;
    ingredient.style.transform = 'scale(1.1)';
    ingredient.style.transition = 'transform 0.3s';
    ingredient.style.backgroundColor = ingredient.dataset.hoverColor; // Change to hover color
}

function handleMouseOut(event) {
    const ingredient = event.target;
    ingredient.style.transform = 'scale(1)';
    ingredient.style.backgroundColor = ingredient.dataset.originalColor; // Revert to original color
}

function handleClick(event) {
    const ingredient = event.target;
    alert(`You clicked on ${ingredient.dataset.name}!`);
}

function loadIngredients() {
    // Fetch ingredients from the JSON file and render them
    fetch('./data/ingredients.json')
        .then(response => response.json())
        .then(data => {
            const plate = document.querySelector('.plate');
            data.forEach(ingredient => {
                const ingredientElement = document.createElement('div');
                ingredientElement.classList.add('ingredient');
                ingredientElement.dataset.name = ingredient.name;
                ingredientElement.dataset.originalColor = ingredient.color;
                ingredientElement.dataset.hoverColor = ingredient.hoverColor;
                ingredientElement.style.backgroundColor = ingredient.color;
                ingredientElement.textContent = ingredient.name;
                plate.appendChild(ingredientElement);
            });
        })
        .catch(error => console.error('Error loading ingredients:', error));
}