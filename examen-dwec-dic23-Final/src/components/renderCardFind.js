import { getOrdersApi } from "../helpers/getOrdersApi";

export async function renderCardFind(food) {
  const container = document.querySelector('.cards');
  const card = document.createElement("div");
  card.setAttribute("data-id", food.id);
  card.style.opacity = "1";
  card.className = "col-md-4 card-food";
  card.innerHTML = `
        <div class="card">
        <img
          src="${food.strCategoryThumb}"
          class="card-img"
          alt="Imagen de comida"
        />
        <div class="card-body">
          <h5 class="card-title">${food.strCategory}</h5>
          <p class="card-description text-dark" style="display: none">${food.strCategoryDescription.slice(
            0,
            40
          )}</p>
          <p class="card-price text-dark">Precio: $${food.price}</p>
          <a href="#" class="btn btn-secondary btn-link card-link">Añadir</a>
          <a href="#" class="btn btn-warning btn-edit">Editar</a>
        </div>
      </div>
      `;

  const orders = await getOrdersApi();
  if (orders.length > 0) {
    const ordersFind = orders.filter((order) => order.id === food.id);
    if (ordersFind.length > 0) {
      card.style.opacity = ".5";
    }
  }
  container.appendChild(card);
}
