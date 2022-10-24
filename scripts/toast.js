const toast = (title, message) => {
   const body = document.querySelector('body')

   const container = document.createElement('div')
   container.classList.add('toast-container')

   const icon = document.createElement('img')
   icon.src = '/assets/img/sucess.svg'
   icon.alt = `Mensagem de ${title}`


   const textContainer = document.createElement('div')

   const h3 = document.createElement('h3')
   h3.innerText = title

   const p = document.createElement('p')
   p.innerHTML = message

   textContainer.append(h3, p)
   container.append(icon, textContainer)

   body.appendChild(container)
}