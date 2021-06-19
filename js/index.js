let db = new Dexie("diagnoapp-db")
let usuario = {} // Objeto vazio

db.version(2).stores(
  { usuarios: '++id,nome,&email,ativo,senha,[email+senha]' }
)

async function login() {
  let email = document.getElementById("email").value
  let senha = document.getElementById("senha").value

  let usuarioEncontrado = await db.usuarios.get({ email: email, senha: senha })
  console.log(usuarioEncontrado)
  if(usuarioEncontrado) {
    if(usuarioEncontrado.ativo) {
      alert("Usuário encontrado")
    } else {
      alert("Usuário está inativo")
    }
  }
}

function validarCampo(campo) {
  let input = document.getElementById(campo)
  if(!input.value) {
    input.classList.add("erro")
    input.classList.add("animate__animated")
    input.classList.add("animate__shakeX")
  } else {
    input.classList.remove("erro")
  }
}

function validarEmail() {
  let inputEmail = document.getElementById("email")
  if(
    inputEmail.value && 
    inputEmail.value.indexOf("@") > -1 && 
    inputEmail.value.indexOf(".") > -1
    ) {
      inputEmail.classList.remove("erro")
  } else {
    inputEmail.classList.add("erro")
    inputEmail.classList.add("animate__animated")
    inputEmail.classList.add("animate__shakeX")
  }
}

function validar() {
  
  let inputNome = document.getElementById("nome")
  let inputEmail = document.getElementById("email")
  let inputSenha = document.getElementById("senha")
  let valido = true

  if(!usuario.nome) {
    inputNome.classList.add("erro")
    inputNome.classList.add("animate__animated")
    inputNome.classList.add("animate__shakeX")
    valido = false
  } else {
    inputNome.classList.remove("erro")
  }

  if(!usuario.email) {
    inputEmail.classList.add("erro")
    inputEmail.classList.add("animate__animated")
    inputEmail.classList.add("animate__shakeX")
    valido = false
  } else {
    inputEmail.classList.remove("erro")
  }
  
  if(!usuario.senha) {
    inputSenha.classList.add("erro")
    inputSenha.classList.add("animate__animated")
    inputSenha.classList.add("animate__shakeX")
    valido = false
  } else {
    inputSenha.classList.remove("erro")
  }

  return valido
}

async function salvar() {

  usuario.nome = document.getElementById("nome").value
  usuario.email = document.getElementById("email").value
  usuario.senha = document.getElementById("senha").value

  let valido = validar()

  if(valido == false) return

  db.usuarios.put({nome: usuario.nome, email: usuario.email, ativo: true, senha: usuario.senha})

  document.querySelector(".alerta").style.display = "block"

  setTimeout(() => {
    location.href = "index.html"
  }, 3000);

  let barraProgresso = document.querySelector(".alerta-barra-progresso")
  let progresso = 3000
  
  setInterval(() => {
    console.log("Passou um segundo")
    progresso -= 10
    barraProgresso.style.width = (progresso*100/3000) + "%"
  }, 10);

}
