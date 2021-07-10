let db = new Dexie("diagnoapp-db")
let usuario = {} // Objeto vazio

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

db.version(3).stores({ usuarios: '++id,nome,&email,ativo,senha,[email+senha]' }, { resultados: '++id,data,usuario' }, { perguntas: '++id,descricao,resultado' }, { respostas: '++id,descricao,diagnostico,pergunta' })

async function login() {
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value

    let usuarioEncontrado = await db.usuarios.get({ email: email, senha: senha })
    console.log(usuarioEncontrado)
    if (usuarioEncontrado) {
        if (usuarioEncontrado.ativo) {
            alert("Usuário encontrado")
        } else {
            alert("Usuário está inativo")
        }
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

    db.usuarios.put({ nome: usuario.nome, email: usuario.email, ativo: true, senha: usuario.senha })

    document.querySelector(".alerta-titulo").innerHTML = "Sua conta foi criada com sucesso!"
    document.querySelector(".alerta-detalhe").innerHTML = "Você será redirecionado em segundos..."
    document.querySelector(".alerta").style.display = "block"

    setTimeout(() => {
        location.href = "index.html"
    }, 3000);

    timeoutProgresso()
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

window.onload = listarUsuarios();

async function listarUsuarios() {

    let resposta = await db.usuarios.toArray()
    let tableBody = document.getElementById("lista")

    for (let cont = 0; cont < resposta.length; cont++) {
        tableBody.innerHTML += `
    <tr>
      <td>${resposta[cont].id}</td>
      <td>${resposta[cont].nome}</td>
      <td>${resposta[cont].email}</td>
      <td>${resposta[cont].ativo ? "Ativo" : "Inativo"}</td>
      <td>
        <button onclick="editar(${resposta[cont].id})">Editar</button>
        <button onclick="remover(${resposta[cont].id})">Remover</button>
      </td>
    </tr>
    `
    }
}

function editar(id) {
    document.querySelector(".alerta").style.display = "block"
        // Busca no banco de dados o usuário pelo id
        // Preenche o form com os dados do usuário retornado
}

function remover(id) {
    if(confirm("Você tem certeza?")) {
      console.log("chamou o remover " + id)
      db.usuarios.delete(id)
      window.location.reload()
    }
}

function irParaListaDeUsuarios() {
    location.assign("/lista-cadastrados.html")
}

function irParaQuestionario() {
    location.assign("/questionario.html")
}