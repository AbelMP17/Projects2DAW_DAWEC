export async function getFoodById(id){
    const response = await fetch('http://localhost:4000/categories?id='+id);
    const data = await response.json();
    return data[0];
}