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

// ===== ZONA DE PRÁCTICA DOM =====
document.addEventListener("DOMContentLoaded", () => {
  const tituloDom = document.getElementById("tituloDom");
  const imagenDom = document.getElementById("imagenDom");
  const contenedorDom = document.getElementById("contenedorDom");

  const imagenOriginalSrc = "imaPrueba1.png";
  const imagenOriginalAlt = "Imagen de prueba";
  const tituloOriginalTexto = "Muestra perfumes";

  // Modificar texto y estilo
  document.getElementById("modificarTexto").addEventListener("click", () => {
    tituloDom.innerText = "Muestra perfumes";
    tituloDom.style.color = "blue";
    tituloDom.style.fontSize = "24px";
  });

  // Cambiar imagen (usando imagen local)
  document.getElementById("cambiarImagen").addEventListener("click", () => {
    imagenDom.setAttribute("src", "imaPrueba2.png");
    imagenDom.setAttribute("alt", "Imagen cambiada");
  });

  // Crear nuevo párrafo
  document.getElementById("crearElemento").addEventListener("click", () => {
    const nuevoParrafo = document.createElement("p");
    nuevoParrafo.innerText = "Este es un párrafo nuevo agregado dinámicamente.";
    nuevoParrafo.style.color = "green";
    nuevoParrafo.style.marginTop = "10px";
    contenedorDom.appendChild(nuevoParrafo);
  });

  // Eliminar el título
  document.getElementById("eliminarTitulo").addEventListener("click", () => {
    const tituloActual = document.getElementById("tituloDom");
    if (tituloActual) tituloActual.remove();
  });

  // Resetear toda la zona DOM
  document.getElementById("resetearDom").addEventListener("click", () => {
    // Restaurar título si fue eliminado
    let actualTitulo = document.getElementById("tituloDom");
    if (!actualTitulo) {
      const nuevoTitulo = document.createElement("h3");
      nuevoTitulo.id = "tituloDom";
      nuevoTitulo.innerText = tituloOriginalTexto;
      nuevoTitulo.style.color = "";
      nuevoTitulo.style.fontSize = "";
      const zonaDom = document.getElementById("zonaDom");
      zonaDom.insertBefore(nuevoTitulo, imagenDom);
    } else {
      actualTitulo.innerText = tituloOriginalTexto;
      actualTitulo.style.color = "";
      actualTitulo.style.fontSize = "";
    }

    // Restaurar imagen
    imagenDom.setAttribute("src", imagenOriginalSrc);
    imagenDom.setAttribute("alt", imagenOriginalAlt);

    // Limpiar párrafos creados
    contenedorDom.innerHTML = "";
  });
});
