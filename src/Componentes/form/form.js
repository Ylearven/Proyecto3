import './form.css'
import { boton } from '../Boton/boton.js'

export const formulario = (placeH, clase) => {
  return `<form action="" id="ContainerBuscador"> 
  <input type= "text" class="${clase}" placeholder="${placeH}">
  ${boton('Buscar')}
  </form>`
}
