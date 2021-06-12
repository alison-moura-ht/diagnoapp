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

// db.usuarios.put({nome: "Zé da Silva", email: "ze@htcursos.com", ativo: false, senha: "123"})