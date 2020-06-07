const express = require("express")
const server = express()

// Pegar o banco de dados
const db = require("./database/db")

// configurar pasta publica
server.use(express.static("public"))

// Habilitar o uso do req body na nossa app
server.use(express.urlencoded({ extended: true }))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da app
//pagina inicial
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Titulo" })
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    // O corpo do nosso formulario
    // 2.- Inserir dados na tabela
    const query = `INSERT INTO places (image, name, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);`
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
})

server.get("/search-results", (req, res) => {
    const search = req.query.search

    if(search == ""){
        // Mostrar a pag html com os dados do banco de dados
        return res.render("search-results.html", { total: 0 })
    }
    
    // Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length
        // Mostrar a pag html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })
})

//ligar o servidor
server.listen(3000)

