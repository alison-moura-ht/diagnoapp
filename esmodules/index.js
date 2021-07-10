
import * as usuario from "./usuario.js"
import * as cliente from "./cliente.js"

document.getElementById("btnSalvar").onclick = usuario.salvar
document.getElementById("btnBuscar").onclick = usuario.buscar

document.getElementById("btnSalvarCliente").onclick = cliente.salvar
document.getElementById("btnBuscarCliente").onclick = cliente.buscar