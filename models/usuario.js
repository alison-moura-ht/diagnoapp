import db from './../db/index.js'

db.version(3).stores(
    { usuarios: '++id,nome,&email,ativo,senha,[email+senha]' },
)

export default {
    async buscarPorEmailESenha(email, senha) {
        let resultado = await db.usuarios.get({ email: email, senha: senha })
        return resultado
    }
}