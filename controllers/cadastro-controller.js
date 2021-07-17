import usuarioModel from './../models/usuario.js'

let usuario = {} // Objeto vazio
document.getElementById("nome").addEventListener("blur", () => validarCampo("nome"))
document.getElementById("senha").addEventListener("blur", () => validarCampo("senha"))
document.getElementById("email").onblur = validarEmail
document.getElementById("btnSalvar").onclick = salvar

function salvar() {

    usuario.nome = document.getElementById("nome").value
    usuario.email = document.getElementById("email").value
    usuario.senha = document.getElementById("senha").value

    let valido = validar()

    if (!valido) {
        document.querySelector(".alerta-titulo").innerHTML = "Formulário com erro!"
        document.querySelector(".alerta-detalhe").innerHTML = "Verifique as informações do formulário"
        document.querySelector(".alerta").style.display = "block"

        setTimeout(() => {
            document.querySelector(".alerta").style.display = "none"
        }, 3000);

        timeoutProgresso()
        return
    }

    usuarioModel.salvar(usuario)

    document.querySelector(".alerta-titulo").innerHTML = "Sua conta foi criada com sucesso!"
    document.querySelector(".alerta-detalhe").innerHTML = "Você será redirecionado em segundos..."
    document.querySelector(".alerta").style.display = "block"

    setTimeout(() => {
        location.href = "index.html"
    }, 3000);

    timeoutProgresso()
}

function validarCampo(id) {
    let input = document.getElementById(id)
    if (!input.value) {
        input.classList.add("erro")
        input.classList.add("animate__animated")
        input.classList.add("animate__shakeX")
        return false
    } else {
        input.classList.remove("erro")
        return true
    }
}

function validarEmail() {
    let inputEmail = document.getElementById("email")
    if (
        inputEmail.value &&
        inputEmail.value.indexOf("@") > -1 &&
        inputEmail.value.indexOf(".") > -1
    ) {
        inputEmail.classList.remove("erro")
        return true
    } else {
        inputEmail.classList.add("erro")
        inputEmail.classList.add("animate__animated")
        inputEmail.classList.add("animate__shakeX")
        return false
    }
}

function validar() {

    let valido = true

    if (!validarCampo("nome")) valido = false
    if (!validarCampo("senha")) valido = false
    if (!validarEmail()) valido = false

    return valido
}

function timeoutProgresso() {
    let barraProgresso = document.querySelector(".alerta-barra-progresso")
    let progresso = 3000

    setInterval(() => {
        console.log("Passou um segundo")
        progresso -= 10
        barraProgresso.style.width = (progresso * 100 / 3000) + "%"
    }, 10);
}