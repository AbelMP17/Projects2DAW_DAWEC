export async function getFoodByName(name){
    const response = await fetch('http://localhost:4000/categories');
    const data = await response.json();
    return data.find(food => food.strCategory === name);
}