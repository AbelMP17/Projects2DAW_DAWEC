export async function addOrder(food){
    await fetch('http://localhost:4000/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(food),
    })
}