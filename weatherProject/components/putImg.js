const imgs = [
    "public/cloud.png",
    "public/rain.png",
    "public/sun.png",
    "public/snow.png"
];

export function putImg(data){
    const img = document.createElement("img");

    if(data == "Clouds"){
        img.src = imgs[0];
    }
    if(data == "Clear"){
        img.src = imgs[2];
    }
    if(data == "Rain"){
        img.src = imgs[1];
    }
    if(data == "Snow"){
        img.src = imgs[3];
    }
    return img;
}