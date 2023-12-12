export async function updateFood(id, data){
    await fetch('http://localhost:4000/categories/'+id,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data,
    })
}