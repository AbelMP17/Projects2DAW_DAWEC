export async function addOrdered(food){
    await fetch(`http://localhost:4000/ordered`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(food),
    })
}