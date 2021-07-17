import db from './../db/index.js'

db.version(3).stores(
    { perguntas: '++id,descricao,resultado' },
)