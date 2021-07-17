document.getElementById("btnIniciar").onclick = irParaQuestionario
document.getElementById("btnUsuarios").onclick = irParaListaDeUsuarios

function irParaListaDeUsuarios() {
    location.assign("/lista-usuarios.html")
}

function irParaQuestionario() {
    location.assign("/questionario.html")
}