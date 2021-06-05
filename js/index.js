let db = new Dexie("diagnoapp-db")

db.version(2).stores(
  { usuarios: '++id,nome,&email,ativo' }
)

// db.usuarios.put({nome: "José da Silva", email: "jose.silva@hightechcursos.com.br", ativo: true})