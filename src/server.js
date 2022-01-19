const express = require('express')
const route = require('./route')
const path = require('path')
const server = express()

server.set('view engine', 'ejs') // essa palavra 'view engine' n tem nada a ver com a pasta view. E não pode ser mudada

server.use(express.static('public'))

server.set('views', path.join(__dirname, 'views') )  // 'path' pega o caminho da pasta que tá o projeto. join é juntar. DIrname (variavel global) e vai se transformar no nome da pasta aonde o arquivo que tá dentro está: __dirname = src/. Então o Join tá juntando o __dirname que é a pasta src, com o nome do arquivo: src/views. 

// Ou seja, o comando "server.set" é para dizer que o caminho onde vai estar os arquivos ejs, não é mais a pasta 'views', e sim o caminho novo que o path vai colocar. pois a pasta views foi levada para fora de src. OBS.: SE TIVESSE FORA DE SRC não precisaria disso.

server.use(express.urlencoded({extended: true}))

server.use(route)

server.listen(3000, () => console.log("RODANDO"))