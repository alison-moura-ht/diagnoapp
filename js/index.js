let db = new Dexie("diagnoapp-db")
let usuario = {} // Objeto vazio

db.version(3).stores(
  { usuarios: '++id,nome,&email,ativo,senha,[email+senha]' },
  { resultados: '++id,data,usuario' },
  { perguntas: '++id,descricao,resultado' },
  { respostas: '++id,descricao,diagnostico,pergunta' }
)

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
    alert("Formulário inválido")
    return
  }

  db.usuarios.put({ nome: usuario.nome, email: usuario.email, ativo: true, senha: usuario.senha })

  document.querySelector(".alerta").style.display = "block"

  setTimeout(() => {
    location.href = "index.html"
  }, 3000);

  let barraProgresso = document.querySelector(".alerta-barra-progresso")
  let progresso = 3000

  setInterval(() => {
    console.log("Passou um segundo")
    progresso -= 10
    barraProgresso.style.width = (progresso * 100 / 3000) + "%"
  }, 10);

}
window.onload = listarUsuarios()

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
  console.log("chamou o remover " + id)
  // Remove o usuário pelo id
}
