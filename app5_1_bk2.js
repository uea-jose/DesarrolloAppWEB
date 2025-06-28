document.addEventListener("DOMContentLoaded", () => {
  // ===== GALERÍA DE IMÁGENES =====
  const gallery = document.getElementById("gallery");
  const addBtn = document.getElementById("add-image-btn");
  const removeBtn = document.getElementById("remove-image-btn");
  const imageUrlInput = document.getElementById("image-url");
  let selectedImage = null;

  function selectImage(img) {
    if (selectedImage) selectedImage.classList.remove("selected");
    selectedImage = img;
    selectedImage.classList.add("selected");
  }

  // Marcar como seleccionables las imágenes por defecto
  document.querySelectorAll("#gallery img").forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => selectImage(img));
  });

  // Agregar nueva imagen a la galería
  addBtn.addEventListener("click", () => {
    const url = imageUrlInput.value.trim();
    if (!url.match(/\.(jpeg|jpg|png|gif|bmp|webp)$/i)) {
      alert("URL no válida. Debe ser imagen .jpg, .png, etc.");
      return;
    }

    const newImg = document.createElement("img");
    newImg.src = url;
    newImg.alt = "Imagen agregada";
    newImg.style.maxHeight = "150px";
    newImg.style.margin = "10px";
    newImg.style.cursor = "pointer";
    newImg.style.borderRadius = "8px";

    newImg.addEventListener("click", () => selectImage(newImg));
    selectImage(newImg);

    const newArticle = document.createElement("article");
    newArticle.className = "col-12 col-md-4 text-center mb-4";
    newArticle.appendChild(newImg);
    gallery.appendChild(newArticle);

    imageUrlInput.value = "";
  });

  // Eliminar imagen seleccionada
  removeBtn.addEventListener("click", () => {
    if (!selectedImage) {
      alert("Selecciona una imagen primero.");
      return;
    }
    const parentArticle = selectedImage.closest("article");
    if (parentArticle) {
      gallery.removeChild(parentArticle);
    } else {
      selectedImage.remove();
    }
    selectedImage = null;
  });

  // ===== CARRITO DE COMPRAS =====
  const carrito = document.querySelector("#carrito");
  const template = document.querySelector("#template");
  const footer = document.querySelector("#footer");
  const templateFooter = document.querySelector("#templateFooter");
  const fragment = document.createDocumentFragment();
  let carritoArray = [];

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

  const agregarCarrito = (e) => {
    const id = e.target.dataset.perfume;
    const precio = parseInt(e.target.dataset.precio, 10);
    const producto = { titulo: id, id, cantidad: 1, precio };

    const index = carritoArray.findIndex((item) => item.id === id);
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
      clone.querySelector(".lead").textContent = item.titulo + ` - $${item.precio * item.cantidad}`;
      clone.querySelector(".rounded-pill").textContent = item.cantidad;
      clone.querySelector(".btn-success").dataset.id = item.id;
      clone.querySelector(".btn-danger").dataset.id = item.id;
      fragment.appendChild(clone);
    });
    carrito.appendChild(fragment);
    pintarFooter();
  };

  const pintarFooter = () => {
    footer.querySelectorAll(".card").forEach((card) => card.remove());

    const total = carritoArray.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    if (total === 0) return;

    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector("p span").textContent = total;
    footer.appendChild(clone);
  };

  const aumentarCantidad = (e) => {
    const id = e.target.dataset.id;
    carritoArray = carritoArray.map((item) => {
      if (item.id === id) item.cantidad++;
      return item;
    });
    pintarCarrito();
  };

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

  // ===== EVENTOS DEL MOUSE =====
  document.getElementById("btnClick").addEventListener("click", () => {
    alert("Hiciste CLICK");
  });

  document.getElementById("btnRightClick").addEventListener("contextmenu", (e) => {
    e.preventDefault();
    alert("Click derecho detectado");
  });

  document.getElementById("btnMouseOver").addEventListener("mouseover", () => {
    alert("Mouse OVER: entraste al botón");
  });

  // ===== EVENTOS DEL TECLADO =====
  const input = document.getElementById("keyboardInput");
  const output = document.getElementById("keyboardOutput");

  input.addEventListener("keydown", (event) => {
    output.textContent = `Presionaste la tecla "${event.key}"`;
  });

  input.addEventListener("keyup", (event) => {
    if (event.key === "Backspace") {
      output.textContent = `Borraste la tecla "${event.key}"`;
    }
  });
});
