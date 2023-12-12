import { renderCardFind } from "./src/components/renderCardFind";
import { renderCardFoods } from "./src/components/renderCardFoods";
import { renderCardOrder } from "./src/components/renderCardOder";
import { getFoodById } from "./src/helpers/getFoodById";
import { getFoodByName } from "./src/helpers/getFoodByName";
import { getFoodsApi } from "./src/helpers/getFoodsApi";
import { getOrdersApi } from "./src/helpers/getOrdersApi";
import { addOrder } from "./src/utils/addOrder";
import { addOrdered } from "./src/utils/addOrdered";
import { delOrder } from "./src/utils/delOrder";
import { updateFood } from "./src/utils/updateFood";
import "./style.css";

const main = document.querySelector(".cards");
const orderContainer = document.querySelector(".order");
const inputSearch = document.querySelector(".input-search");

const alimentos = await getFoodsApi();
const orders = await getOrdersApi();

renderCardFoods(main, alimentos);
renderCardOrder(orderContainer, orders);

main.addEventListener("click", async (e) => {
  e.preventDefault();
  if (e.target.textContent === "Añadir") {
    const card = e.target.closest(".card-food");
    const id = card.getAttribute("data-id");
    const food = await getFoodById(id);

    if (card.style.opacity === "1") {
      await addOrder(food);
      const orders = await getOrdersApi();

      orderContainer.innerHTML = "<h2>Order Foods</h2><hr>";
      renderCardOrder(orderContainer, orders);

      if (
        orderContainer.querySelector(".card-order") !== null &&
        document.querySelector(".btn-buy") === null
      ) {
        const btnBuy = document.createElement("button");
        btnBuy.className = "btn btn-warning btn-buy";
        btnBuy.textContent = "Buy Order";

        orderContainer.insertBefore(
          btnBuy,
          document.querySelector(".card-order")
        );
      }

      card.style.opacity = ".5";
    } else {
      alert("No se pueden añadir más alimentos de este estilo.");
    }
  } else if (e.target.textContent === "Editar") {
    const mainCard = e.target.closest(".card-food");
    const id = mainCard.getAttribute("data-id");
    const card = mainCard.querySelector(".card");
    const title = card.querySelector(".card-title");
    const precio = card.querySelector(".card-price");
    const food = await getFoodById(id);

    const inputTitle = document.createElement("input");
    inputTitle.className = "form-control input-title";
    inputTitle.value = food.strCategory;

    const inputPrice = document.createElement("input");
    inputPrice.className = "form-control input-price";
    inputPrice.value = food.price;

    const btnConfirm = document.createElement("button");
    btnConfirm.className = "btn btn-primary btn-confirm";
    btnConfirm.textContent = "Confirmar";

    card.appendChild(inputTitle);
    card.appendChild(inputPrice);
    card.appendChild(btnConfirm);

    btnConfirm.addEventListener("click",async (e) => {
      e.preventDefault();
      title.textContent = inputTitle.value;
      precio.textContent = "Precio: $" + inputPrice.value;

      const strCategory = inputTitle.value;
      const price = inputPrice.value;

      const data = {
        id: food.id,
        strCategory,
        strCategoryThumb: food.strCategoryThumb,
        strCategoryDescription: food.strCategoryDescription,
        price: parseFloat(price),
      };

      await updateFood(id, JSON.stringify(data));

      inputTitle.remove();
      inputPrice.remove();
      btnConfirm.remove();
    });
  } else if (
    e.target.closest(".card-food") !== null &&
    !e.target.classList.contains("input-title") &&
    !e.target.classList.contains("input-price") &&
    !e.target.classList.contains("btn-confirm")
  ) {
    const card = e.target.closest(".card-food");
    const description = card.querySelector(".card-description");
    const img = card.querySelector(".card-img");
    const name = card.querySelector(".card-title");
    const price = card.querySelector(".card-price");
    const link = card.querySelector(".card-link");
    const edit = card.querySelector(".btn-edit");

    if (description.style.display === "none") {
      description.style.display = "block";
      img.style.display = "none";
      name.style.display = "none";
      price.style.display = "none";
      link.style.display = "none";
      edit.style.display = "none"
    } else {
      description.style.display = "none";
      img.style.display = "block";
      name.style.display = "block";
      price.style.display = "block";
      link.style.display = "block";
      edit.style.display = "block";
    }
  }
});

orderContainer.addEventListener("click", async (e) => {
  if (e.target.textContent === "Cancel") {
    const card = e.target.closest(".card-order");
    const id = card.getAttribute("data-id");
    await delOrder(id);
    card.remove();
    if (orderContainer.querySelector(".card-order") === null) {
      document.querySelector(".btn-buy").remove();
    }
    const cardFood = document.querySelector(`.card-food[data-id="${id}"]`);
    cardFood.style.opacity = "1";
  } else if (e.target.textContent === "Buy Order") {
    const orders = await getOrdersApi();
    const ticket = {
      Pedidos: orders,
      precioTotal: orders.reduce((acc, food) => (acc += food.price), 0),
    };
    const cards = e.target.closest(".order").querySelectorAll(".card-order");
    cards.forEach(async (card) => {
      const id = card.getAttribute("data-id");
      await delOrder(id);
      card.remove();

      if (orderContainer.querySelector(".card-order") === null) {
        document.querySelector(".btn-buy").remove();
      }

      const cardFood = document.querySelector(`.card-food[data-id="${id}"]`);
      cardFood.style.opacity = "1";
    });
    localStorage.setItem("totalOrdered", JSON.stringify(ticket));
    await addOrdered(ticket);
  }
});

inputSearch.addEventListener("keydown", async (e) => {
  if (e.key === "Enter" && inputSearch.value !== "") {
    const food = await getFoodByName(inputSearch.value);
    main.innerHTML = "";
    await renderCardFind(food);
  }
});
