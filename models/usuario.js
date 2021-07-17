import db from './../db/index.js'

db.version(3).stores(
    { usuarios: '++id,nome,&email,ativo,senha,[email+senha]' },
)

export default {
    async buscarPorEmailESenha(email, senha) {
        let resultado = await db.usuarios.get({ email: email, senha: senha })
        return resultado
    },
    async salvar(usuario) {
        db.usuarios.put({ nome: usuario.nome, email: usuario.email, ativo: true, senha: usuario.senha })
    },
    async buscarTodos() {
        let resultado = await db.usuarios.toArray()
        return resultado
    },
    async remover(id) {
        await db.usuarios.where("id").equals(id).delete()
    }
}