let db = new Dexie("diagnoapp-db")

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

async function salvar() {

  let nome = document.getElementById("nome").value
  let email = document.getElementById("email").value
  let senha = document.getElementById("senha").value

  //TODO: VALIDAÇÃO

  db.usuarios.put({nome: nome, email: email, ativo: true, senha: senha})

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
