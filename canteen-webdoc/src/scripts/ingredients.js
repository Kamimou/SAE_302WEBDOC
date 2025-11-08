const ingredients = [
    { name: 'Tomato', color: '#FF6347', link: 'https://example.com/tomato' },
    { name: 'Lettuce', color: '#90EE90', link: 'https://example.com/lettuce' },
    { name: 'Carrot', color: '#FFA07A', link: 'https://example.com/carrot' },
    { name: 'Cucumber', color: '#98FB98', link: 'https://example.com/cucumber' },
    { name: 'Olive', color: '#808000', link: 'https://example.com/olive' },
];

function createIngredientElement(ingredient) {
    const ingredientElement = document.createElement('div');
    ingredientElement.textContent = ingredient.name;
    ingredientElement.style.backgroundColor = ingredient.color;
    ingredientElement.classList.add('ingredient');

    ingredientElement.addEventListener('mouseover', () => {
        ingredientElement.style.transform = 'scale(1.1)';
        ingredientElement.style.transition = 'transform 0.2s';
        ingredientElement.style.backgroundColor = '#FFD700'; // Change to a highlight color
    });

    ingredientElement.addEventListener('mouseout', () => {
        ingredientElement.style.transform = 'scale(1)';
        ingredientElement.style.backgroundColor = ingredient.color; // Revert to original color
    });

    ingredientElement.addEventListener('click', () => {
        window.open(ingredient.link, '_blank');
    });

    return ingredientElement;
}

function loadIngredients() {
    const plate = document.getElementById('plate'); // Ensure there's an element with this ID in your HTML
    ingredients.forEach(ingredient => {
        const ingredientElement = createIngredientElement(ingredient);
        plate.appendChild(ingredientElement);
    });
}

document.addEventListener('DOMContentLoaded', loadIngredients);