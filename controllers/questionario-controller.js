let questionario = [
    {
        descricao: "VOCÊ SEPARA A SUA CONTA PF DA SUA CONTA PJ?",
        opcoes: [
            {
                descricao: "Sim",
                diagnostico: "Ótimo, esse é o caminho"
            },
            {
                descricao: "Não",
                diagnostico: "Que pena, você precisa melhorar"
            }
        ]
    },
    {
        descricao: "VOCÊ REALIZA CONTROLE DE FLUXO DE CAIXA?",
        opcoes: [
            {
                descricao: "Sim",
                diagnostico: "Ótimo, esse é o caminho"
            },
            {
                descricao: "Não",
                diagnostico: "Que pena, você precisa melhorar"
            }
        ]
    },
    {
        descricao: "VOCÊ POUPA O DINHEIRO DE ALGUMA FORMA?",
        opcoes: [
            {
                descricao: "Sim",
                diagnostico: "Ótimo, esse é o caminho"
            },
            {
                descricao: "Não",
                diagnostico: "Que pena, você precisa melhorar"
            }
        ]
    }
]
let posicaoQuestaoAtual = 0

function cancelarQuestionario() {
    history.go(-1)
}

function carregarQuestao() {
    let questaoAtual = questionario[posicaoQuestaoAtual]
    document.getElementById("pergunta").innerHTML = questaoAtual.descricao
    document.querySelector(".page-number").innerHTML = `${posicaoQuestaoAtual + 1}/${questionario.length}`

    if (posicaoQuestaoAtual == questionario.length - 1) {
        document.getElementById("btnFinalizar").classList.remove("d-none")
        document.getElementById("btnProximo").classList.add("d-none")
    } else {
        document.getElementById("btnFinalizar").classList.add("d-none")
        document.getElementById("btnProximo").classList.remove("d-none")
    }

    if (posicaoQuestaoAtual == 0) {
        document.getElementById("btnVoltar").classList.add("d-none")
    } else {
        document.getElementById("btnVoltar").classList.remove("d-none")
    }
}

function proximo() {
    posicaoQuestaoAtual++
    carregarQuestao()
}

function voltar() {
    posicaoQuestaoAtual--
    carregarQuestao()
}

document.getElementById("btnCancelar").onclick = cancelarQuestionario
document.getElementById("btnProximo").onclick = proximo
document.getElementById("btnVoltar").onclick = voltar
window.onload = carregarQuestao