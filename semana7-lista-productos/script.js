const carrito = document.querySelector("#carrito");
const template = document.querySelector("#template");
const footer = document.querySelector("#footer");
const templateFooter = document.querySelector("#templateFooter");
const fragment = document.createDocumentFragment();
let carritoArray = [];

document.addEventListener("click", (e) => {
  if (e.target.matches(".boton-pastel")) agregarCarrito(e);
  if (e.target.matches(".list-group-item .btn-success")) btnAumentar(e);
  if (e.target.matches(".list-group-item .btn-danger")) btnDisminuir(e);
});

const agregarCarrito = (e) => {
  const producto = {
    titulo: e.target.dataset.perfume,
    id: e.target.dataset.perfume,
    cantidad: 1,
    precio: parseInt(e.target.dataset.precio),
  };

  const index = carritoArray.findIndex((item) => item.id === producto.id);
  if (index === -1) carritoArray.push(producto);
  else carritoArray[index].cantidad++;

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
  const footerExistente = footer.querySelector(".footer-compra");
  if (footerExistente) footerExistente.remove();

  const total = carritoArray.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  if (total === 0) return;

  const clone = templateFooter.content.cloneNode(true);
  clone.querySelector("p span").textContent = total;
  clone.querySelector(".card").classList.add("footer-compra");
  footer.appendChild(clone);
};

const btnAumentar = (e) => {
  carritoArray = carritoArray.map((item) => {
    if (item.id === e.target.dataset.id) item.cantidad++;
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

// === Frascos Dinámicos ===
const listaFrascos = document.getElementById('lista-frascos');
const btnAgregarFrasco = document.getElementById('btn-agregar-frasco');
const btnQuitarFrasco = document.getElementById('btn-quitar-frasco');
let contadorFrascos = 3;

const frascosIniciales = [
  { id: 1, nombre: "Frasco 1" },
  { id: 2, nombre: "Frasco 2" },
  { id: 3, nombre: "Frasco 3" },
];

function pintarFrascos() {
  listaFrascos.innerHTML = '';
  frascosIniciales.forEach(frasco => {
    const li = document.createElement('li');
    li.textContent = frasco.nombre;
    li.classList.add('list-group-item');
    listaFrascos.appendChild(li);
  });
  toggleBotonQuitar();
}

function toggleBotonQuitar() {
  btnQuitarFrasco.classList.toggle('d-none', frascosIniciales.length <= 3);
}

btnAgregarFrasco.addEventListener('click', () => {
  contadorFrascos++;
  frascosIniciales.push({ id: contadorFrascos, nombre: `Frasco ${contadorFrascos}` });
  pintarFrascos();
});

btnQuitarFrasco.addEventListener('click', () => {
  if (frascosIniciales.length > 3) {
    frascosIniciales.pop();
    contadorFrascos--;
    pintarFrascos();
  }
});

pintarFrascos();
