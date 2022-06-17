import React from 'react'
import './landing-page.css'
import image from '../../img/Login.jpg'

function LandingPage() {
  return (
    <div className='container'>
      <img
        src={image}
        alt='imagen de fondo'
        className='img-landing'
      />
      <h1 className='titulo'>Bienvenidos a Poke Page</h1>
      <div className='btn'>
        <button className='boton'>Ir a inicio</button>
      </div>
    </div>
  )
}

export default LandingPage
