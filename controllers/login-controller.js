import usuario from './../models/usuario.js'

async function login() {
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value

    let usuarioEncontrado = await usuario.buscarPorEmailESenha(email, senha)
    if (usuarioEncontrado) {
        if (usuarioEncontrado.ativo) {
            alert("Usuário encontrado")
        } else {
            alert("Usuário está inativo")
        }
    } else {
        alert("Usuário não encontrado")
    }
}

document.getElementById("btnEntrar").onclick = login