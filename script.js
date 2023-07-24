// Optimiza animaciones para navegadores, garantiza fluidez y compatibilidad cruzada.

window.requestAnimFrame = (function (callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
function (callback) {
  window.setTimeout(callback, 1000 / 60)
}
})()

// Crea una instancia de imagen y carga 'dex.svg'
var image = new Image()
image.src = 'dex.svg'

// Asegura que el canvas tenga la misma proporcion que la imagen. 
// No se pasa al rebotar contra la pantalla
image.onload = function () {
  rect.width = image.width
  rect.height = image.height
}

// Oculta y muestra la imagen en la página.
// image.style.display = 'none'
// document.body.appendChild(image)

// Actualiza el ícono del sitio web con la imagen cargada
document.getElementById('favicon').setAttribute('href', image.src)

// Muestra la imagen en el lienzo (canvas) en la posición dada por parametro.
function showImage (rect, context) {
  context.drawImage(image, rect.x, rect.y)
}

// Declara una variable 'direction' y le asigna el valor 'se' para mas adelante.
var direction = 'se'

function display (rect, canvas, context) {
  var speed = 3

  // Si choca con el top
  if (rect.y <= 0) {
    if (direction === 'ne') {
      direction = 'se'
    } else if (direction === 'nw') {
      direction = 'sw'
    }

  // Si choca con el bottom
  } else if (rect.y >= canvas.height - rect.height) {
    if (direction === 'se') {
      direction = 'ne'
    } else if (direction === 'sw') {
      direction = 'nw'
    }

  // Si choca con la izquierda
  } else if (rect.x <= 0) {
    if (direction === 'nw') {
      direction = 'ne'
    } else if (direction === 'sw') {
      direction = 'se'
    }

  // Si choca con la derecha
  } else if (rect.x >= canvas.width - rect.width) {
    if (direction === 'ne') {
      direction = 'nw'
    } else if (direction === 'se') {
      direction = 'sw'
    }
  }

  // Cambia las coordenadas de la imagen según la dirección y velocidad dadas.
  switch(direction) {
    
    case 'ne':
      rect.x += speed
      rect.y -= speed
    break

    case 'nw':
      rect.x -= speed
      rect.y -= speed
    break

    case 'se':
      rect.x += speed
      rect.y += speed
    break

    case 'sw':
      rect.x -= speed
      rect.y += speed
    break

    default:
      // This shouldn't ever happen
  }

  // Borra el lienzo y muestra la imagen actualizada. Sino se arrastra por toda la pantalla
  context.clearRect(0, 0, canvas.width, canvas.height)
  showImage(rect, context)

  // Actualiza el siguiente cuadro de animacion
  requestAnimFrame(function () {
    display(rect, canvas, context)
  })
}

// Declarar canvas y contexto del canvas
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

// modifica el tamaño del canvas al tamaño de la ventana actual
function resize (canvas) {
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
}
resize(canvas)
window.onresize = function () {
  resize(canvas)
}

// Objeto que almacena posición y tamaño aleatorio, basado en ventana e imagen.
var rect = {
  x: Math.floor(Math.random() * window.innerWidth) + 1,
  y: Math.floor(Math.random() * window.innerHeight) + 1,
  width: image.width,
  height: image.height
}

// Inicia app. Muestra la imagen (definida en rect) y comienza la animación en el lienzo
showImage(rect, context)
display(rect, canvas, context)
