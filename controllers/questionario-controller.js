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
    },
    {
        descricao: "VOCÊ DORME?",
        opcoes: [
            {
                descricao: "Sim",
                diagnostico: "Que pena, você precisa melhorar"
            },
            {
                descricao: "Não",
                diagnostico: "Ótimo, esse é o caminho"
            }
        ]
    }
]
let posicaoQuestaoAtual = 0

function cancelarQuestionario() {
    history.go(-1)
}

function fecharQuestionario() {
    location.assign('home.html')
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

function finalizarQuestionario() {
    document.querySelector(".questionario-resultado").classList.remove("d-none")
    let divDiagnosticos = document.getElementById("diagnosticos")

    for(let cont = 0; cont < questionario.length; cont++) {
        let questao = questionario[cont]
        let opcaoSelecionada = questao.opcoes.find((opcao) => {
            return opcao.selecionado == true
        })
        
        divDiagnosticos.innerHTML += `
        <div>
            <p class="font-2 bold texto-cinza">${questao.descricao}</p>
            <p class="font-1 texto-cinza">SUA RESPOSTA: <strong>${opcaoSelecionada.descricao}</strong></p>
            <p class="texto-verde bold line-2 font-3">${opcaoSelecionada.diagnostico}</p>
        </div>
        `
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
document.getElementById("btnFinalizar").onclick = finalizarQuestionario
document.getElementById("btnFechar").onclick = fecharQuestionario
window.onload = carregarQuestao