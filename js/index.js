import db from './../db/index.js'
import './../models/usuario.js'

let questionario = [
    {
        descricao: "VOCÊ SEPARA A SUA CONTA PF DA SUA CONTA PJ?",
        opcoes: [
            {
                descricao: "Sim",
                diagnostico: "Ótimo, esse é o caminho"
            },
            {
                descricao: "Não",
                diagnostico: "Que pena, você precisa melhorar"
            }
        ]
    },
    {
        descricao: "VOCÊ REALIZA CONTROLE DE FLUXO DE CAIXA?",
        opcoes: [
            {
                descricao: "Sim",
                diagnostico: "Ótimo, esse é o caminho"
            },
            {
                descricao: "Não",
                diagnostico: "Que pena, você precisa melhorar"
            }
        ]
    },
    {
        descricao: "VOCÊ POUPA O DINHEIRO DE ALGUMA FORMA?",
        opcoes: [
            {
                descricao: "Sim",
                diagnostico: "Ótimo, esse é o caminho"
            },
            {
                descricao: "Não",
                diagnostico: "Que pena, você precisa melhorar"
            }
        ]
    }
]