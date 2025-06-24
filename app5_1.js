// Selección de elementos importantes del DOM
const carrito = document.querySelector("#carrito");
const template = document.querySelector("#template");
const footer = document.querySelector("#footer");
const templateFooter = document.querySelector("#templateFooter");
const fragment = document.createDocumentFragment();

// Array que guarda los productos en el carrito
let carritoArray = [];

// Delegación de eventos para toda la página
document.addEventListener("click", (e) => {
    if (e.target.matches("button[data-perfume]")) {
        agregarCarrito(e);
    }

    if (e.target.matches(".list-group-item .btn-success")) {
        aumentarCantidad(e);
    }

    if (e.target.matches(".list-group-item .btn-danger")) {
        disminuirCantidad(e);
    }
});

// Función para agregar un producto al carrito
const agregarCarrito = (e) => {
    const id = e.target.dataset.perfume;
    const precio = parseInt(e.target.dataset.precio, 10);

    const producto = {
        titulo: id,
        id,
        cantidad: 1,
        precio,
    };

    const index = carritoArray.findIndex((item) => item.id === id);

    if (index === -1) {
        carritoArray.push(producto);
    } else {
        carritoArray[index].cantidad++;
    }

    pintarCarrito();
};

// Función para mostrar el carrito en el DOM
const pintarCarrito = () => {
    carrito.textContent = ""; // Limpiar contenido previo

    carritoArray.forEach((item) => {
        const clone = template.content.cloneNode(true);

        clone.querySelector(".text-white .lead").textContent = item.titulo;
        clone.querySelector(".rounded-pill").textContent = item.cantidad;
        clone.querySelector("div .lead span").textContent = item.precio * item.cantidad;

        clone.querySelector(".btn-success").dataset.id = item.id;
        clone.querySelector(".btn-danger").dataset.id = item.id;

        fragment.appendChild(clone);
    });

    carrito.appendChild(fragment);
    pintarFooter();
};

// Función para mostrar el total y botón en el footer
const pintarFooter = () => {
    footer.innerHTML = ""; // Limpiar completamente el footer

    const total = carritoArray.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    if (total === 0) return; // Si carrito vacío, no mostrar nada

    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector("p span").textContent = total;

    footer.appendChild(clone);
};

// Incrementar cantidad del producto en carrito
const aumentarCantidad = (e) => {
    const id = e.target.dataset.id;
    carritoArray = carritoArray.map((item) => {
        if (item.id === id) {
            item.cantidad++;
        }
        return item;
    });
    pintarCarrito();
};

// Disminuir cantidad del producto en carrito (y eliminar si queda 0)
const disminuirCantidad = (e) => {
    const id = e.target.dataset.id;
    carritoArray = carritoArray.filter((item) => {
        if (item.id === id) {
            item.cantidad--;
            return item.cantidad > 0;
        }
        return true;
    });
    pintarCarrito();
};
