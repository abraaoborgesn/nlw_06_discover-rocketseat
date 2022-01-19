const Database = require('../db/config')

module.exports = {
    async create(req, res) {
        const db = await Database()
        const pass = req.body.password
        let roomId = ''
        let isRoom = true

        // Testar se o campo do password está vazio ou não  ***** ADICIONAL *****
        if (pass.length == 0) {
            res.render('pass-empty')
        } else {
            while (isRoom) {

                // Gera o número da sala
                for (var i = 0; i < 6; i++) {

                    roomId += Math.floor(Math.random() * 10).toString() //Cria um número aleatório até 10 e transforma em string, pois se não vai ser somado ao invés de ser concatenado

                }
                // verificar se o número já existe
                const roomExistIds = await db.all(`SELECT id FROM rooms`)

                isRoom = roomExistIds.some(roomExistIds => roomExistIds === roomId)

                if (!isRoom) {
                    // Insere a sala no banco
                    await db.run(`INSERT INTO rooms (
                id,
                pass
            ) VALUES (
                ${parseInt(roomId)},
                "${pass}"
            )`)
                }
            }

            await db.close()

            res.redirect(`/room/${roomId}`)
        }
    },

    async open(req, res) {
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        let isNoQuestions

        if (questions.length == 0 && questionsRead == 0) {
            isNoQuestions = true
        }


        res.render("room", { roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions }) // Os colchetes é para colocar esses itens que vai ser utilizado na página room

    },

    enter(req, res) {
        const roomId = req.body.roomId

        // Testar se digitou algo no campo do código da sala ***** ADICIONAL****
        if (roomId.length == 0) {
            res.render('code-empty')
        } else {

            res.redirect(`/room/${roomId}`)
        }
    }


}