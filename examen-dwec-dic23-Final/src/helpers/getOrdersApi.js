export async function getOrdersApi(){
    const response = await fetch('http://localhost:4000/order')
    const data = await response.json()
    return data;
}