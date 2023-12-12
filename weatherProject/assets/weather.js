export async function getWeather(url){
    const response = await fetch(url);

    return response.json();
}