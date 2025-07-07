document.addEventListener("DOMContentLoaded", () => {
  
    // ===== VALIDACIÓN DE FORMULARIO DINÁMICA =====
const form = document.getElementById("registroForm");
const usuario = document.getElementById("usuario");
const nombre = document.getElementById("nombre");
const contrasena = document.getElementById("contrasena");
const confirmarContrasena = document.getElementById("confirmarContrasena");

const usuarioFeedback = document.getElementById("usuarioFeedback");
const nombreFeedback = document.getElementById("nombreFeedback");
const contrasenaFeedback = document.getElementById("contrasenaFeedback");
const confirmarContrasenaFeedback = document.getElementById("confirmarContrasenaFeedback");

// Validaciones con expresiones regulares
const regexUsuario = /^[a-zA-Z0-9_]{4,16}$/;
const regexNombre = /^[a-zA-Z\s]+$/;
const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,32}$/;

// Usuario
usuario.addEventListener("input", () => {
  if (regexUsuario.test(usuario.value)) {
    usuario.classList.remove("is-invalid");
    usuario.classList.add("is-valid");
    usuarioFeedback.textContent = "";
  } else {
    usuario.classList.remove("is-valid");
    usuario.classList.add("is-invalid");
    usuarioFeedback.textContent = "Debe tener de 4 a 16 caracteres. Solo letras, números y guion bajo.";
  }
});

// Nombre
nombre.addEventListener("input", () => {
  if (regexNombre.test(nombre.value)) {
    nombre.classList.remove("is-invalid");
    nombre.classList.add("is-valid");
    nombreFeedback.textContent = "";
  } else {
    nombre.classList.remove("is-valid");
    nombre.classList.add("is-invalid");
    nombreFeedback.textContent = "El nombre solo puede contener letras y espacios.";
  }
});

// Contraseña
contrasena.addEventListener("input", () => {
  if (regexContrasena.test(contrasena.value)) {
    contrasena.classList.remove("is-invalid");
    contrasena.classList.add("is-valid");
    contrasenaFeedback.textContent = "";
  } else {
    contrasena.classList.remove("is-valid");
    contrasena.classList.add("is-invalid");
    contrasenaFeedback.textContent = "8-32 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo.";
  }
});

// Confirmar contraseña
confirmarContrasena.addEventListener("input", () => {
  if (confirmarContrasena.value === contrasena.value && contrasena.value !== "") {
    confirmarContrasena.classList.remove("is-invalid");
    confirmarContrasena.classList.add("is-valid");
    confirmarContrasenaFeedback.textContent = "";
  } else {
    confirmarContrasena.classList.remove("is-valid");
    confirmarContrasena.classList.add("is-invalid");
    confirmarContrasenaFeedback.textContent = "Las contraseñas no coinciden.";
  }
});

// Validar todo antes de enviar
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const usuarioOk = regexUsuario.test(usuario.value);
  const nombreOk = regexNombre.test(nombre.value);
  const contrasenaOk = regexContrasena.test(contrasena.value);
  const confirmarOk = confirmarContrasena.value === contrasena.value;

  if (usuarioOk && nombreOk && contrasenaOk && confirmarOk) {
    alert("Formulario válido. Enviando...");
    form.reset();
    [usuario, nombre, contrasena, confirmarContrasena].forEach(input => {
      input.classList.remove("is-valid", "is-invalid");
    });
  } else {
    alert("Revisa los campos en rojo.");
  }
});




 // ===== VALIDACIÓN DE CORREO L =====

const emailInput = document.getElementById("email");
const feedback = document.getElementById("feedback");

// Diccionario de dominios mal escritos y su corrección
const sugerencias = {
  "gmal.com": "gmail.com",
  "gmial.com": "gmail.com",
  "hotnail.com": "hotmail.com",
  "hotmial.com": "hotmail.com",
  "yahho.com": "yahoo.com",
  "yaho.com": "yahoo.com"
};

emailInput.addEventListener("input", () => {
  const value = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const partes = value.split("@");

  if (partes.length === 2) {
    const usuario = partes[0];
    const dominio = partes[1].toLowerCase();

    if (sugerencias[dominio]) {
      const sugerido = `${usuario}@${sugerencias[dominio]}`;
      feedback.innerHTML = `
        <span style="color: red;">
          ¿Quisiste decir <strong>${sugerido}</strong>?
        </span>
      `;
      emailInput.classList.add("is-invalid");
      emailInput.classList.remove("is-valid");
      return; // Evita continuar con validación si hay sugerencia
    }
  }

  if (emailPattern.test(value)) {
    feedback.textContent = "Correo válido";
    feedback.style.color = "green";
    emailInput.classList.add("is-valid");
    emailInput.classList.remove("is-invalid");
  } else {
    feedback.textContent = "Correo no válido";
    feedback.style.color = "red";
    emailInput.classList.add("is-invalid");
    emailInput.classList.remove("is-valid");
  }
});




// ===== EVENTOS DEL teléfono, edad y botón Submit =====

// EDAD
const edad = document.getElementById("edad");
const edadFeedback = document.getElementById("edadFeedback");

// TELÉFONO
const telefono = document.getElementById("telefono");
const telefonoFeedback = document.getElementById("telefonoFeedback");
const regexTelefono = /^\+?\d{7,15}$/;

// BOTÓN DE ENVÍO
const btnEnviar = document.getElementById("btnEnviar");

// Validación de edad
edad.addEventListener("input", () => {
  const valor = parseInt(edad.value);
  if (!isNaN(valor) && valor >= 18) {
    edad.classList.remove("is-invalid");
    edad.classList.add("is-valid");
    edadFeedback.textContent = "";
  } else {
    edad.classList.remove("is-valid");
    edad.classList.add("is-invalid");
    edadFeedback.textContent = "Debes tener al menos 18 años.";
  }
  validarFormularioCompleto();
});

// Validación de teléfono
telefono.addEventListener("input", () => {
  if (regexTelefono.test(telefono.value.trim())) {
    telefono.classList.remove("is-invalid");
    telefono.classList.add("is-valid");
    telefonoFeedback.textContent = "";
  } else {
    telefono.classList.remove("is-valid");
    telefono.classList.add("is-invalid");
    telefonoFeedback.textContent = "Número de teléfono inválido. Ej: +593987654321";
  }
  validarFormularioCompleto();
});

// Validar todos los campos antes de habilitar el botón de envío
function validarFormularioCompleto() {
  const camposValidos = [
    usuario.classList.contains("is-valid"),
    nombre.classList.contains("is-valid"),
    contrasena.classList.contains("is-valid"),
    confirmarContrasena.classList.contains("is-valid"),
    emailInput.classList.contains("is-valid"),
    edad.classList.contains("is-valid"),
    telefono.classList.contains("is-valid")
  ];

  btnEnviar.disabled = !camposValidos.every(Boolean);
}

// Revalidar cada campo cuando cambia
[usuario, nombre, contrasena, confirmarContrasena, emailInput, edad, telefono].forEach(input => {
  input.addEventListener("input", validarFormularioCompleto);
});

// Manejo del botón Submit
btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();

  if (!btnEnviar.disabled) {
    alert("Formulario enviado con éxito ✅");

    // Limpiar campos y estilos
    [edad, telefono, usuario, nombre, contrasena, confirmarContrasena, emailInput].forEach(input => {
      input.value = "";
      input.classList.remove("is-valid", "is-invalid");
    });

    // Limpiar mensajes de error
    edadFeedback.textContent = "";
    telefonoFeedback.textContent = "";
    usuarioFeedback.textContent = "";
    nombreFeedback.textContent = "";
    contrasenaFeedback.textContent = "";
    confirmarContrasenaFeedback.textContent = "";
    feedback.textContent = "";

    // Deshabilitar botón hasta que vuelva a validarse todo
    btnEnviar.disabled = true;
  }
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
