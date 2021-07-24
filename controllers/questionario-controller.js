document.getElementById("btnCancelar").onclick = cancelarQuestionario

function cancelarQuestionario() {
    history.go(-1)
}