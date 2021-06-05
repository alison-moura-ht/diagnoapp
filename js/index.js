let db
let request = indexedDB.open("diagnoapp-db", 1)

request.onerror = function(event) {
  alert("Database error: " + event.target.errorCode)
}

request.onsuccess = function() {
  db = request.result
  alert("Banco de dados conectado com sucesso!")
}