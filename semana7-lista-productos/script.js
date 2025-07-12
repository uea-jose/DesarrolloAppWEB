const carrito = document.querySelector("#carrito");
const template = document.querySelector("#template");
const footer = document.querySelector("#footer");
const templateFooter = document.querySelector("#templateFooter");
const fragment = document.createDocumentFragment();
let carritoArray = [];

// Delegación de eventos
document.addEventListener("click", (e) => {
  if (e.target.matches(".boton-pastel")) {
    agregarCarrito(e);
  }

  if (e.target.matches(".list-group-item .btn-success")) {
    btnAumentar(e);
  }

  if (e.target.matches(".list-group-item .btn-danger")) {
    btnDisminuir(e);
  }
});

const agregarCarrito = (e) => {
  const producto = {
    titulo: e.target.dataset.perfume,
    id: e.target.dataset.perfume,
    cantidad: 1,
    precio: parseInt(e.target.dataset.precio),
  };

  const index = carritoArray.findIndex((item) => item.id === producto.id);

  if (index === -1) {
    carritoArray.push(producto);
  } else {
    carritoArray[index].cantidad++;
  }

  pintarCarrito();
};

const pintarCarrito = () => {
  carrito.textContent = "";

  carritoArray.forEach((item) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".badge").textContent = item.cantidad;
    clone.querySelector(".lead").textContent = item.titulo;
    clone.querySelectorAll(".lead")[1].textContent = `Total: $${item.precio * item.cantidad}`;
    clone.querySelector(".btn-success").dataset.id = item.id;
    clone.querySelector(".btn-danger").dataset.id = item.id;
    fragment.appendChild(clone);
  });
  carrito.appendChild(fragment);

  pintarFooter();
};

const pintarFooter = () => {
  // Eliminar footer anterior si existe
  const footerExistente = footer.querySelector(".footer-compra");
  if (footerExistente) footerExistente.remove();

  const total = carritoArray.reduce(
    (acc, current) => acc + current.precio * current.cantidad,
    0
  );

  if (total === 0) return; // No mostrar footer si carrito vacío

  // Si tienes templateFooter descomentado, usa esto:
  if(templateFooter) {
    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector("p span").textContent = total;
    clone.querySelector("div.card").classList.add("footer-compra");
    footer.appendChild(clone);
  } else {
    // En caso no tengas templateFooter, puedes crear un footer simple así:
    const div = document.createElement("div");
    div.classList.add("footer-compra", "card");
    div.innerHTML = `
      <div class="card-body d-flex justify-content-between align-items-center">
        <p class="lead mb-0">TOTAL: $<span>${total}</span></p>
        <button class="btn btn-primary">Finalizar Compra</button>
      </div>
    `;
    footer.appendChild(div);
  }
};

const btnAumentar = (e) => {
  carritoArray = carritoArray.map((item) => {
    if (item.id === e.target.dataset.id) {
      item.cantidad++;
    }
    return item;
  });
  pintarCarrito();
};

const btnDisminuir = (e) => {
  carritoArray = carritoArray.flatMap((item) => {
    if (item.id === e.target.dataset.id) {
      if (item.cantidad > 1) {
        item.cantidad--;
        return [item];
      }
      return [];
    }
    return [item];
  });
  pintarCarrito();
};
