export async function delOrder(id){
    await fetch(`http://localhost:4000/order/${id}`,{
        method: 'DELETE',
    })
}