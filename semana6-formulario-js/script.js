document.addEventListener("DOMContentLoaded", () => {
  // === ELEMENTOS DEL FORMULARIO PRINCIPAL ===
  const form = document.getElementById("registroForm");
  const usuario = document.getElementById("usuario");
  const nombre = document.getElementById("nombre");
  const contrasena = document.getElementById("contrasena");
  const confirmarContrasena = document.getElementById("confirmarContrasena");

  const usuarioFeedback = document.getElementById("usuarioFeedback");
  const nombreFeedback = document.getElementById("nombreFeedback");
  const contrasenaFeedback = document.getElementById("contrasenaFeedback");
  const confirmarContrasenaFeedback = document.getElementById("confirmarContrasenaFeedback");

  // === REGEX ===
  const regexUsuario = /^[a-zA-Z0-9_]{4,16}$/;
  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(\s+[A-Za-zÁÉÍÓÚáéíóúñÑ]+)+$/; // mínimo 2 palabras
  const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

  // === VALIDACIONES DINÁMICAS ===
  usuario.addEventListener("input", () => {
    if (regexUsuario.test(usuario.value)) {
      usuario.classList.add("is-valid");
      usuario.classList.remove("is-invalid");
      usuarioFeedback.textContent = "";
    } else {
      usuario.classList.add("is-invalid");
      usuario.classList.remove("is-valid");
      usuarioFeedback.textContent = "4-16 caracteres, solo letras, números y guion bajo.";
    }
    validarFormularioCompleto();
  });

  nombre.addEventListener("input", () => {
    if (regexNombre.test(nombre.value.trim())) {
      nombre.classList.add("is-valid");
      nombre.classList.remove("is-invalid");
      nombreFeedback.textContent = "";
    } else {
      nombre.classList.add("is-invalid");
      nombre.classList.remove("is-valid");
      nombreFeedback.textContent = "Debe ingresar al menos nombre y apellido. Solo letras.";
    }
    validarFormularioCompleto();
  });

  contrasena.addEventListener("input", () => {
    if (regexContrasena.test(contrasena.value)) {
      contrasena.classList.add("is-valid");
      contrasena.classList.remove("is-invalid");
      contrasenaFeedback.textContent = "";
    } else {
      contrasena.classList.add("is-invalid");
      contrasena.classList.remove("is-valid");
      contrasenaFeedback.textContent = "8-16 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo.";
    }
    validarFormularioCompleto();
  });

  confirmarContrasena.addEventListener("input", () => {
    const contrasenaValida = regexContrasena.test(contrasena.value);
    if (
      confirmarContrasena.value === contrasena.value &&
      contrasena.value !== "" &&
      contrasenaValida
    ) {
      confirmarContrasena.classList.remove("is-invalid");
      confirmarContrasena.classList.add("is-valid");
      confirmarContrasenaFeedback.textContent = "";
    } else {
      confirmarContrasena.classList.remove("is-valid");
      confirmarContrasena.classList.add("is-invalid");
      confirmarContrasenaFeedback.textContent = "Las contraseñas no coinciden o la contraseña no es válida.";
    }
    validarFormularioCompleto();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const usuarioOk = regexUsuario.test(usuario.value);
    const nombreOk = regexNombre.test(nombre.value.trim());
    const contrasenaOk = regexContrasena.test(contrasena.value);
    const confirmarOk =
      confirmarContrasena.value === contrasena.value && contrasenaOk;

    if (usuarioOk && nombreOk && contrasenaOk && confirmarOk) {
      alert("Formulario válido. Enviando...");
      form.reset();
      [usuario, nombre, contrasena, confirmarContrasena].forEach((input) =>
        input.classList.remove("is-valid", "is-invalid")
      );
      validarFormularioCompleto();
    } else {
      alert("Revisa los campos en rojo.");
    }
  });

  // === CORREO ===
  const emailInput = document.getElementById("email");
  const feedback = document.getElementById("feedback");

  const sugerencias = {
    "gmal.com": "gmail.com",
    "gmial.com": "gmail.com",
    "hotnail.com": "hotmail.com",
    "hotmial.com": "hotmail.com",
    "yahho.com": "yahoo.com",
    "yaho.com": "yahoo.com",
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
          </span>`;
        emailInput.classList.add("is-invalid");
        emailInput.classList.remove("is-valid");
        validarFormularioCompleto();
        return;
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

    validarFormularioCompleto();
  });

  // === EDAD Y TELÉFONO ===
  const edad = document.getElementById("edad");
  const edadFeedback = document.getElementById("edadFeedback");

  const telefono = document.getElementById("telefono");
  const telefonoFeedback = document.getElementById("telefonoFeedback");
  const regexTelefono = /^\+?\d{7,15}$/;

  const btnEnviar = document.getElementById("btnEnviar");

  edad.addEventListener("input", () => {
    const valor = parseInt(edad.value);
    if (!isNaN(valor) && valor >= 18) {
      edad.classList.add("is-valid");
      edad.classList.remove("is-invalid");
      edadFeedback.textContent = "";
    } else {
      edad.classList.add("is-invalid");
      edad.classList.remove("is-valid");
      edadFeedback.textContent = "Debes tener al menos 18 años.";
    }
    validarFormularioCompleto();
  });

  telefono.addEventListener("input", () => {
    if (regexTelefono.test(telefono.value.trim())) {
      telefono.classList.add("is-valid");
      telefono.classList.remove("is-invalid");
      telefonoFeedback.textContent = "";
    } else {
      telefono.classList.add("is-invalid");
      telefono.classList.remove("is-valid");
      telefonoFeedback.textContent = "Número de teléfono inválido. Ej: +593987654321";
    }
    validarFormularioCompleto();
  });

  // === HABILITAR BOTÓN DE SUBMIT SOLO SI TODO ES VÁLIDO ===
  function validarFormularioCompleto() {
    const camposValidos = [
      usuario.classList.contains("is-valid"),
      nombre.classList.contains("is-valid"),
      contrasena.classList.contains("is-valid"),
      confirmarContrasena.classList.contains("is-valid"),
      emailInput.classList.contains("is-valid"),
      edad.classList.contains("is-valid"),
      telefono.classList.contains("is-valid"),
    ];

    btnEnviar.disabled = !camposValidos.every(Boolean);
  }

  btnEnviar.addEventListener("click", (e) => {
    e.preventDefault();

    if (!btnEnviar.disabled) {
      alert("Formulario enviado con éxito ✅");

      [edad, telefono, usuario, nombre, contrasena, confirmarContrasena, emailInput].forEach(input => {
        input.value = "";
        input.classList.remove("is-valid", "is-invalid");
      });

      edadFeedback.textContent = "";
      telefonoFeedback.textContent = "";
      usuarioFeedback.textContent = "";
      nombreFeedback.textContent = "";
      contrasenaFeedback.textContent = "";
      confirmarContrasenaFeedback.textContent = "";
      feedback.textContent = "";

      btnEnviar.disabled = true;
    }
  });
});
