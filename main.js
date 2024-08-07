//-----Barra de navegación-------
import {
  btnSugerencia,
  btnTexto,
  btnImg
} from './src/Componentes/Boton/boton.js'
import { formulario } from './src/Componentes/form/form.js'

const navegador = document.getElementById('nav')
navegador.innerHTML = `
${btnImg('./assets/pinterest-logo.png', 'logo', 'logo')}
${btnTexto('Hoy', 'hoy')}
${btnTexto('Crear', 'crear')}
${formulario('Buscar una imagen', 'buscador')}
${btnImg('./assets/campana.png', 'campana')}
${btnImg('./assets/comentario.png', 'comentario')}
${btnImg('./assets/usuario.png', 'usuario')}
`
//-------------Galería de imagenes------
const busqueda = document.getElementById('ContainerBuscador')
const buscador = document.querySelector('.buscador')
const galeria = document.getElementById('gallery')
const logo = document.getElementById('logo')

let palabra = ''
let pagina = 1
const accesKey = 'PCM0mQp1bh-PERjXxOj2l_bKGhUy8_bLbCBpWrFnd_c'

async function buscarImagenes(query) {
  palabra = buscador.value || query
  const url = `https://api.unsplash.com/search/photos?page=1&query=${palabra}&client_id=${accesKey}`

  try {
    const respuesta = await fetch(url)
    const data = await respuesta.json()
    mostrarImagenes(data)
  } catch (error) {
    console.error('Error en la búsqueda:', error)
  }
}
function mostrarImagenes(data) {
  if (pagina === 1) {
    galeria.innerHTML = ''
  }
  const res = data.results
  if (res.length === 0) {
    mostrarSugerencia()
  } else {
    galeria.innerHTML = ''
    res.forEach((resultados) => {
      const imagenes = document.createElement('img')
      imagenes.src = resultados.urls.small
      const linkImg = document.createElement('a')
      linkImg.href = resultados.links.html
      linkImg.target = '_self'

      linkImg.appendChild(imagenes)
      galeria.appendChild(linkImg)
    })
  }
}

busqueda.addEventListener('submit', (e) => {
  e.preventDefault()
  pagina = 1
  buscarImagenes()
})
logo.addEventListener('click', (e) => {
  e.preventDefault()
  pagina = 1
  buscador.value = ''
  buscarImagenes('arte')
})

//----Botones de sugerencia------
function mostrarSugerencia() {
  const sugerencia = document.getElementById('sugerencia')
  sugerencia.innerHTML += ''
  const mensaje = document.createElement('p')
  mensaje.innerHTML =
    'No se a encontrado resultado, aquí le dejo unas sugerencias'
  sugerencia.appendChild(mensaje)
  sugerencia.innerHTML += `
${btnSugerencia('montañas')}
${btnSugerencia('playa')}
${btnSugerencia('comida')}`
  const btnsuge = document.querySelectorAll('.btnsugerencia')
  btnsuge.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const termino = btn.dataset.termino
      buscador.value = termino
      buscarImagenes()
    })
  })
}
//----imagenes por defecto----
buscarImagenes('arte')
