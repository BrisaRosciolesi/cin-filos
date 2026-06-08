document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. LÓGICA DE LAS ESTRELLAS
    // ==========================================
    const estrellas = document.querySelectorAll("#calificacion-estrellas span");
    let calificacionActual = 0;

    const actualizarEstrellas = (calificacion) => {
        estrellas.forEach((estrella, indice) => {
            estrella.textContent = indice < calificacion ? "★" : "☆";
        });
    };

    estrellas.forEach(estrella => {
        estrella.addEventListener("mouseover", function() { actualizarEstrellas(this.getAttribute("data-value")); });
        estrella.addEventListener("mouseout", function() { actualizarEstrellas(calificacionActual); });
        estrella.addEventListener("click", function() {
            calificacionActual = this.getAttribute("data-value");
            actualizarEstrellas(calificacionActual);
        });
    });


    // ==========================================
    // 2. LÓGICA DEL MODAL DE RANKING
    // ==========================================
    const modalRanking = document.getElementById("modal-ranking");
    const btnCerrarModal = document.getElementById("cerrar-modal");
    const btnCalificarEstrellas = document.querySelector(".btn-calificar");

    // Función para mostrar el modal
    const mostrarModalRanking = () => {
        if (modalRanking) {
            modalRanking.style.display = "flex";
        }
    };

    // Función para cerrar el modal
    const ocultarModalRanking = () => {
        if (modalRanking) {
            modalRanking.style.display = "none";
        }
    };

    // Cerrar con la X
    if (btnCerrarModal) {
        btnCerrarModal.addEventListener("click", ocultarModalRanking);
    }

    // Cerrar al hacer click afuera de la caja (en el fondo oscuro)
    window.addEventListener("click", (evento) => {
        if (evento.target === modalRanking) {
            ocultarModalRanking();
        }
    });

    // Abrir modal al tocar el botón amarillo "CALIFICAR"
    if (btnCalificarEstrellas) {
        btnCalificarEstrellas.addEventListener("click", mostrarModalRanking);
    }


    // ==========================================
    // 3. FORMULARIO "LA EMPLEADA" Y MEMORIA 
    // ==========================================
    const btnMostrarFormulario = document.getElementById("btn-mostrar-formulario");
    const formularioComentario = document.getElementById("formulario-comentario");
    const inputComentario = document.getElementById("input-comentario");
    const contadorCaracteres = document.getElementById("contador-caracteres");
    const inputNombre = document.getElementById("input-nombre");
    const nombreMostrado = document.getElementById("nombre-mostrado");
    const btnEnviarResena = document.getElementById("btn-enviar-formulario");

    // Mostrar formulario y chequear nombre guardado
    if (btnMostrarFormulario) {
        btnMostrarFormulario.addEventListener("click", () => {
            btnMostrarFormulario.style.display = "none"; 
            formularioComentario.style.display = "block"; 
            
            const nombreGuardado = localStorage.getItem("nombreUsuario");
            
            if (nombreGuardado) {
                inputNombre.style.display = "none"; 
                nombreMostrado.textContent = nombreGuardado; 
                nombreMostrado.style.display = "block"; 
            } else {
                inputNombre.style.display = "block";
                nombreMostrado.style.display = "none";
            }
        });
    }

    // Contador de caracteres
    if (inputComentario) {
        inputComentario.addEventListener("input", function() {
            contadorCaracteres.textContent = `${this.value.length}/100`;
        });
    }

    // Botón "Enviar" la reseña
    if (btnEnviarResena) {
        btnEnviarResena.addEventListener("click", () => {
            let valorNombre = "";
            const nombreGuardado = localStorage.getItem("nombreUsuario");
            
            // Definir de dónde sacamos el nombre
            if (nombreGuardado) {
                valorNombre = nombreGuardado;
            } else {
                valorNombre = inputNombre.value.trim();
            }

            const valorComentario = inputComentario.value.trim();

            if (valorComentario === "") {
                alert("Por favor, escribí tu reseña antes de enviar.");
                return;
            }

            // Si es un usuario nuevo, guardamos su nombre para la próxima vez
            if (!nombreGuardado && valorNombre !== "") {
                localStorage.setItem("nombreUsuario", valorNombre);
            }

            // ¡ABRIMOS EL MODAL DE ÉXITO EN LUGAR DEL ALERT!
            mostrarModalRanking();
            
            // Limpiamos el formulario
            inputComentario.value = "";
            contadorCaracteres.textContent = "0/100";
        });
    }


    // ==========================================
    // 4. LÓGICA DE LA COMUNIDAD 
    // ==========================================
    const btnEnviarComunidad = document.getElementById("btn-enviar-comunidad");
    const inputComunidad = document.getElementById("input-comunidad");
    const listaComentarios = document.getElementById("lista-comentarios");

    if (btnEnviarComunidad) {
        btnEnviarComunidad.addEventListener("click", () => {
            const valorComentario = inputComunidad.value.trim();
            
            if (valorComentario === "") return; 

            // Verificamos si ya tenemos un nombre guardado en localStorage
            let nombreUsuario = localStorage.getItem("nombreUsuario");

            // Si no hay nombre guardado, lo pedimos
            if (!nombreUsuario) {
                nombreUsuario = prompt("Para comentar en la comunidad, por favor ingresá tu nombre:");
                
                if (!nombreUsuario || nombreUsuario.trim() === "") {
                    return; 
                }
                
                localStorage.setItem("nombreUsuario", nombreUsuario.trim());
            }

            // Creamos el HTML del nuevo comentario
            const htmlNuevoComentario = `
                <div class="comentario" style="animation: fadeIn 0.5s;">
                    <div class="marcador-avatar"></div>
                    <div class="texto-comentario">
                        <strong>${nombreUsuario}</strong>
                        <p>${valorComentario}</p>
                    </div>
                </div>
            `;

            // Lo insertamos al final de la lista
            listaComentarios.insertAdjacentHTML('beforeend', htmlNuevoComentario);

            // Limpiamos el input y bajamos el scroll de la lista
            inputComunidad.value = "";
            listaComentarios.scrollTop = listaComentarios.scrollHeight;
        });
    }
});