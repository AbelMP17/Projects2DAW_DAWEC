const imgs = [
    "public/nublado.jpg",
    "public/despejado.jpg",
    "public/lluvioso.jpg",
    "public/nevado.avif",
];

export function putBackground(data){
    const img = document.createElement("img");

    if(data == "Clouds"){
        img.src = imgs[0];
    }
    if(data == "Clear"){
        img.src = imgs[1];
    }
    if(data == "Rain"){
        img.src = imgs[2];
    }
    if(data == "Snow"){
        img.src = imgs[3];
    }
    return img;
}