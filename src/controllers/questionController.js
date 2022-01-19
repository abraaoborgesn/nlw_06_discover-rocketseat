const Database = require('../db/config')

module.exports = {

    async index(req, res) {

        const db = await Database() // importando o banco de dados e colocando await e async
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password // pegou lá do room.ejs. O nome do input pra senha

        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`) // db.get trás só um dado. Db.all trás vários, em forma de array

        // Verificar se a senha está correta
        if(verifyRoom.pass == password){
            if(action == "delete"){
                
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)

            }   else if(action == 'check'){

                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)

            }
            res.redirect(`/room/${roomId}`)
        }   else {
            res.render('passincorrect', {roomId: roomId})
        }


        
    },

    async create(req, res) {
        const db = await Database()
        const question = req.body.question  // pegando a question do formulário
        const roomId = req.params.room // pegando o número da sala (room) do URL (route.js)

        await db.run(`INSERT INTO questions(
            title,
            room,
            read
        )VALUES(
            "${question}",
            ${roomId},
            0
        )`)

        res.redirect(`/room/${roomId}`)
    }
}