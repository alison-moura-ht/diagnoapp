import usuarioModel from './../models/usuario.js'

let usuario = {}
document.getElementById("nome").addEventListener("blur", () => validarCampo("nome"))
document.getElementById("senha").addEventListener("blur", () => validarCampo("senha"))
document.getElementById("email").onblur = validarEmail
document.getElementById("btnSalvar").onclick = salvar
window.onload = listarUsuarios

async function listarUsuarios() {

    let resposta = await usuarioModel.buscarTodos()
    let tableBody = document.getElementById("lista")

    for (let cont = 0; cont < resposta.length; cont++) {
        tableBody.innerHTML += `
    <tr>
      <td>${resposta[cont].id}</td>
      <td>${resposta[cont].nome}</td>
      <td>${resposta[cont].email}</td>
      <td>${resposta[cont].ativo ? "Ativo" : "Inativo"}</td>
      <td>
        <button class="btn-editar">Editar</button>
        <button id="${resposta[cont].id}" class="btn-remover">Remover</button>
      </td>
    </tr>
    `
    }

    let btnsRemover = document.querySelectorAll(".btn-remover")
    for(let cont = 0; cont < btnsRemover.length; cont++) {
        btnsRemover[cont].onclick = remover
    }
}

function editar(id) {
    document.querySelector(".alerta").style.display = "block"
    // Busca no banco de dados o usuário pelo id
    // Preenche o form com os dados do usuário retornado
}

async function remover(evento) {
    if (confirm("Você tem certeza?")) {
        console.log(`Chamou o remover com evento: ${evento}`);
        console.log(evento.target.id);
        await usuarioModel.remover(evento.target.id)
        // location.reload()
    }
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

    document.querySelector(".alerta-titulo").innerHTML = "Usuário salvo com sucesso!"
    document.querySelector(".alerta").style.display = "block"
}