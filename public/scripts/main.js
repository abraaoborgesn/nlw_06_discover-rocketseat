import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

const checkButtons = document.querySelectorAll('.actions a.check')

checkButtons.forEach(button => button.addEventListener('click', (event) => handleClick(event, true))) // Ou só colocar "handleClick" que já fica subentendido que é "true"

const deleteButtons = document.querySelectorAll('.actions a.delete')

deleteButtons.forEach(button => button.addEventListener('click', (event) => handleClick(event, false)))

function handleClick(event, check = true) {
    event.preventDefault()

    const slug = check ? "check" : "delete"

    // Colocando número em cada sala
    const roomId = document.querySelector('#room-id').dataset.id
    const questionId = event.target.dataset.id

    // setando atributos... url do formulário
    const form = document.querySelector('.modal form')
    form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

    // modificando os textos da caixa modal
    modalTitle.innerHTML = check ? 'Marcar como lido' : 'Excluir pergunta'
    modalDescription.innerHTML = check ? 'Tem certeza que você deseja marcar essa pergunta como lida?' : 'Tem certeza que você deseja excluir esta pergunta?'
    modalButton.innerHTML = check ? 'Sim, marcar como lida' : 'Sim, excluir'

    check ? modalButton.classList.remove('red'): modalButton.classList.add('red')
    

    modal.open()
}

