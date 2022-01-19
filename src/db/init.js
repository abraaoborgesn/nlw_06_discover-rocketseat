// Este é um arquivo somente para inicializar o banco de dados

const Database = require("./config")

const initDb = {
    async init() { // async é necessário por causa do await. Sempre tem que vir junto com ele
        const db = await Database()   //await serve para "esperar" o resultado do processo de rodar essa linha antes de ir para a próxima linha. Servindo para garantir que o db já tenha o conteúdo correto para o restante da operação

        await db.exec(`CREATE TABLE rooms (
            id INTEGER PRIMARY KEY,
            pass TEXT 
        )`);

        await db.exec(`CREATE TABLE questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            title TEXT,
            read INT,
            room INT
        )`);

        // usou o AUTOINCREMENT pois esse ID não vai aparecer na tela e pode ser o numero "1, 2, 3, 4..." seguindo ordem. Já o ID do ROOMS tem que ser 6 dígitos e por isso vai ser criado no random()

        await db.close()
    }
}

initDb.init();

