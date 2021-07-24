let questionario = [
    {
        descricao: "VOCÊ SEPARA A SUA CONTA PF DA SUA CONTA PJ?",
        opcoes: [
            {
                descricao: "Sim",
                diagnostico: "Ótimo, esse é o caminho",
            },
            {
                descricao: "Não",
                diagnostico: "Que pena, você precisa melhorar",
            },
            {
                descricao: "Mais ou menos",
                diagnostico: "Mais pra mais? Ou mais pra menos?"
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

    carregarOpcoes()
}

function carregarOpcoes() {
    let opcoes = questionario[posicaoQuestaoAtual].opcoes
    let divOpcoes = document.getElementById("opcoes")

    divOpcoes.innerHTML = "" // "Limpar" opções anteriores

    for (let cont = 0; cont < opcoes.length; cont++) {
        let opcaoAtual = opcoes[cont]
        let btnOpcao = document.createElement("button") // cria a tag <button>
        btnOpcao.onclick = () => selecionarOpcao(cont)
        btnOpcao.innerHTML = opcaoAtual.descricao // Texto do botão
        btnOpcao.classList.add("btn-opcao", "texto-branco", "w-full", "mt-20", "border-none", "border-2", "border-white", "border-solid", "py-10", "bg-transparent")
        if (opcaoAtual.selecionado) {
            btnOpcao.classList.remove("bg-transparent", "texto-branco")
            btnOpcao.classList.add("bg-branco", "texto-verde")
        }
        divOpcoes.appendChild(btnOpcao)
    }
}

function selecionarOpcao(posicaoEscolhida) {
    limparSelecao()
    let questaoAtual = questionario[posicaoQuestaoAtual]
    let opcaoEscolhida = questaoAtual.opcoes[posicaoEscolhida]
    opcaoEscolhida.selecionado = true
    carregarOpcoes()
}

function limparSelecao() {
    let opcoes = questionario[posicaoQuestaoAtual].opcoes
    for (let cont = 0; cont < opcoes.length; cont++) {
        opcoes[cont].selecionado = false
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