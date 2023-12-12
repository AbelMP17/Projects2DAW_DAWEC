
export function renderCardOrder(container, orders) {
  if (orders.length > 0) {
    orders.forEach(async (order) => {
      const card = document.createElement("div");
      card.setAttribute("data-id", order.id);
      card.className = "col-md-4 w-100 card-order";
      card.innerHTML = `
        <div class="card">
        <img
          src="${order.strCategoryThumb}"
          class="card-img-top"
          alt="Imagen de comida"
        />
        <div class="card-body">
          <h5 class="card-title">${order.strCategory}</h5>
          <p class="card-text">Precio: $${order.price}</p>
          <button class="btn btn-danger btn-cancel">Cancel</button>
        </div>
      </div>
      `;
      container.appendChild(card);

      if(document.querySelector('.btn-buy') === null){
        const btnBuy = document.createElement('button');
        btnBuy.className = "btn btn-warning btn-buy";
        btnBuy.textContent = "Buy Order";

        container.insertBefore(btnBuy, card);
      }
    });
  }

}
