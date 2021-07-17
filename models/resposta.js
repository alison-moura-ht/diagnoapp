import db from './../db/index.js'

db.version(3).stores(
    { respostas: '++id,descricao,diagnostico,pergunta' }
)