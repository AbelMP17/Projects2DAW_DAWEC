import "./style.css";

/**
 * Ejericio 1.
 */
/*
const img = "public/vite.svg";
const loading = document.createElement("span");
loading.textContent = "Loading...";
loading.id = "loading";

function loadAsync(src) {
  return new Promise((resolve, reject) => {
    try {
      document.body.appendChild(loading);
      setTimeout(() => {
        resolve((document.body.style.backgroundImage = "url(" + src + ")"));
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        loading.remove();
      }, 2000);
    } catch {
      reject(new Error("Failed to load " + src));
    }
  });
}

loadAsync(img);
*/
/**
 * Ejercicio 2
 */

function operacionesArtimeticas(val1, val2, operacion) {
  return new Promise((resolve, reject) => {
    if (operacion.toLowerCase() == "suma") {
      resolve(eval(val1 + val2));
      return;
    } else if (operacion.toLowerCase() == "resta") {
      resolve(eval(val1 - val2));
      return;
    } else if (operacion.toLowerCase() == "multiplicacion") {
      resolve(eval(val1 * val2));
      return;
    } else if (operacion.toLowerCase() == "division") {
      if (val1 <= 0 || val2 <= 0) {
        reject(new Error("No se puede dividir entre 0 o negativo."));
        return;
      } else {
        resolve(eval(val1 / val2));
        return;
      }
    }
  });
}

//operacionesArtimeticas(1, 2, "suma").then((result) => console.log(result));

/**
 * Ejercicio 3
 */

const elemento = document.createElement("img");
elemento.src = "public/vite.svg";
elemento.style.width = "300px";

function desvanecerElemento(elemento, duracion) {
  return new Promise((resolve) => {
    elemento.style.transition = "opacity " + duracion + "s ease-in-out";
    elemento.style.opacity = 1;

    setTimeout(() => {
      elemento.style.opacity = 0;

      elemento.addEventListener("transitionend", () => {
        resolve();
      });
    });
  });
}

/*document.body.appendChild(elemento);*/

/*desvanecerElemento(elemento, 1).then(() => {
  console.log("Animación completada");
});*/

/**
 * Ejercicio 4
 */

function paso1() {
  setTimeout(() => {
    console.log("paso 1");
  }, 1000);
  return document.createElement("span");
}

function paso2(elemento) {
  setTimeout(() => {
    elemento.style.color = "red";
    console.log("paso 2");
  }, 1000);
  return elemento;
}

function paso3(elemento) {
  setTimeout(() => {
    elemento.textContent = "Hola mundo";
    console.log("paso 3");
  }, 1000);
  return elemento;
}

/*document.body.appendChild(paso3(paso2(paso1())));*/

/**
 * Ejercicio 5
 */

const form = document.createElement("form");

const inputName = document.createElement("input");
inputName.type = "text";
inputName.placeholder = "Name";
inputName.id = "name";

const inputPasswd = document.createElement("input");
inputPasswd.type = "password";
inputPasswd.placeholder = "Password";
inputPasswd.id = "passwd";

const btnSubmit = document.createElement("button");
btnSubmit.textContent = "Submit";

form.appendChild(inputName);
form.appendChild(inputPasswd);
form.appendChild(btnSubmit);

document.body.appendChild(form);

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  fecthApi().then((data) => {
    const users = data.filter(
      (user) =>
        user.firstname.toLowerCase() == inputName.value.toLowerCase() &&
        user.login.password == inputPasswd.value
    );

    const user = users[0];

    const card = document.createElement("div");
    card.id = "card";

    const nameLastName = document.createElement("p");
    nameLastName.textContent = "Name: " + user.firstname;

    const email = document.createElement("p");
    email.textContent = "Email: " + user.email;

    const map = L.map("map").setView(
      [user.address.geo.lat, user.address.geo.lng],
      13
    );


    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const btnVolver = document.createElement("button");
    btnVolver.textContent = "Salir";

    card.appendChild(nameLastName);
    card.appendChild(email);
    card.appendChild(btnVolver);

    btnVolver.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.reload();
    });

    form.remove();

    document.body.appendChild(card);
  });
});

function fecthApi() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.org/users")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          reject(new Error("Error fetching the api."));
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
