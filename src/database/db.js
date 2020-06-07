// Importar a dependencia de sqlite3
const sqlite3 = require("sqlite3").verbose()

// Criar objeto que irá fazer operacoes no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// Utilizar o objeto de banco de datos para nossas operacoes 
// db.serialize(() => {

//     // Comandos SQL: 
//     // 1.- Criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places(
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
//     // 2.- Inserir dados na tabela
//     const query = `INSERT INTO places (image, name, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);`
//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//         "Papersider",
//         "Guilherme Gamballa, Jardim America",
//         "N° 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis, Papelao"
//     ]

//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)

//     3.- Consultar dados na tablea
//     db.all(`SELECT * FROM places`, function(err, rows) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log("Aqui estao seus registros")
//         console.log(rows)
//     })

//     // 4.- Deletar dados da tabela
//     db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log("Registro Deletado com secesso")
//     })
// })