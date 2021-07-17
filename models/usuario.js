import db from './../db/index.js'

db.version(3).stores(
    { usuarios: '++id,nome,&email,ativo,senha,[email+senha]' },
)