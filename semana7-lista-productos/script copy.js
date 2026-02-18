const carrito = document.querySelector("#carrito");
const template = document.querySelector("#template");
const footer = document.querySelector("#footer");
const templateFooter = document.querySelector("#templateFooter");
const fragment = document.createDocumentFragment();
let carritoArray = [];

// Delegación de eventos
document.addEventListener("click", (e) => {
  if (e.target.matches(".card button")) {
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
  footer.querySelector("template#templateFooter") && footer.querySelector("template#templateFooter").nextSibling?.remove();
  
  const total = carritoArray.reduce(
    (acc, current) => acc + current.precio * current.cantidad,
    0
  );

  const clone = templateFooter.content.cloneNode(true);
  clone.querySelector("p span").textContent = total;
  footer.appendChild(clone);
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
