// Selección de elementos importantes del DOM
const carrito = document.querySelector("#carrito"); // Lista donde se mostrarán los productos añadidos
const template = document.querySelector("#template"); // Template HTML para clonar cada producto del carrito
const footer = document.querySelector("#footer"); // Contenedor donde se mostrará el total
const templateFooter = document.querySelector("#templateFooter"); // Template del total del carrito
const fragment = document.createDocumentFragment(); // Fragmento para optimizar el renderizado

// Array que guarda los productos en el carrito
let carritoArray = [];

// Delegación de eventos para toda la página
document.addEventListener("click", (e) => {
    // Si el botón tiene atributo data-perfume, se añade al carrito
    if (e.target.matches("button[data-perfume]")) {
        agregarCarrito(e);
    }

    // Si se presiona el botón "+" dentro del carrito
    if (e.target.matches(".list-group-item .btn-success")) {
        aumentarCantidad(e);
    }

    // Si se presiona el botón "-" dentro del carrito
    if (e.target.matches(".list-group-item .btn-danger")) {
        disminuirCantidad(e);
    }
});

// Función para agregar un producto al carrito
const agregarCarrito = (e) => {
    const id = e.target.dataset.perfume; // Se obtiene el nombre del perfume como ID
    const precio = parseInt(e.target.dataset.precio, 10); // Se convierte el precio en número

    // Se crea el objeto del producto
    const producto = {
        titulo: id,
        id,
        cantidad: 1,
        precio,
    };

    // Se verifica si el producto ya está en el carrito
    const index = carritoArray.findIndex((item) => item.id === id);

    // Si no está, se agrega al arreglo
    if (index === -1) {
        carritoArray.push(producto);
    } else {
        // Si ya está, se incrementa la cantidad
        carritoArray[index].cantidad++;
    }

    // Se actualiza visualmente el carrito
    pintarCarrito();
};

// Función para mostrar el carrito en el DOM
const pintarCarrito = () => {
    carrito.textContent = ""; // Limpiar contenido anterior del carrito

    // Por cada producto en el carrito se crea un elemento nuevo usando el template
    carritoArray.forEach((item) => {
        const clone = template.content.cloneNode(true); // Se clona el contenido del template

        // Se rellenan los datos del producto
        clone.querySelector(".text-white .lead").textContent = item.titulo;
        clone.querySelector(".rounded-pill").textContent = item.cantidad;
        clone.querySelector("div .lead span").textContent = item.precio * item.cantidad;

        // Se asignan los ID a los botones + y - para identificar el producto
        clone.querySelector(".btn-success").dataset.id = item.id;
        clone.querySelector(".btn-danger").dataset.id = item.id;

        // Se agrega el clone al fragment
        fragment.appendChild(clone);
    });

    // Finalmente se inserta el fragmento completo al DOM
    carrito.appendChild(fragment);

    // Se actualiza el footer con el total
    pintarFooter();
};

// Función para mostrar el total y botón en el footer
const pintarFooter = () => {
    footer.innerHTML = ""; // Limpiar completamente el contenido anterior del footer

    // Se calcula el total sumando precio * cantidad de cada producto
    const total = carritoArray.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    // Si no hay productos, no se muestra nada en el footer
    if (total === 0) return;

    // Se clona el template del footer y se actualiza el total
    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector("p span").textContent = total;

    // Se añade el footer al DOM
    footer.appendChild(clone);
};

// Incrementar cantidad del producto en carrito
const aumentarCantidad = (e) => {
    const id = e.target.dataset.id; // Se obtiene el ID del producto

    // Se recorre el arreglo y se incrementa la cantidad del producto correspondiente
    carritoArray = carritoArray.map((item) => {
        if (item.id === id) {
            item.cantidad++;
        }
        return item;
    });

    // Se actualiza el carrito visualmente
    pintarCarrito();
};

// Disminuir cantidad del producto en carrito (y eliminar si queda 0)
const disminuirCantidad = (e) => {
    const id = e.target.dataset.id; // Se obtiene el ID del producto

    // Se filtra el array: si la cantidad llega a 0, se elimina
    carritoArray = carritoArray.filter((item) => {
        if (item.id === id) {
            item.cantidad--;
            return item.cantidad > 0; // Solo mantener si la cantidad es mayor que 0
        }
        return true; // Los demás productos no cambian
    });

    // Se actualiza el carrito visualmente
    pintarCarrito();
};
