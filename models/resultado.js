import db from './../db/index.js'

db.version(3).stores(
    { resultados: '++id,data,usuario' },
)