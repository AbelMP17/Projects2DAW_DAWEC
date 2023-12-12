export async function getFoodsApi(){
    const response = await fetch('http://localhost:4000/categories');
    const data = await response.json();
    return data;
}