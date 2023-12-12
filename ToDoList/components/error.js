
export default function error(mensaje, element){
    const error = document.createElement('div');
    error.id = "error";

    error.textContent = mensaje;

    element.appendChild(error);

    setTimeout(()=> {
        error.remove();
    }, 3000);
}