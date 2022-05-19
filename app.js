document.addEventListener("DOMContentLoaded", () =>{

const grid = document.querySelector(".grid")
let squares = Array.from(document.querySelectorAll(".grid div"))
const ScoreDisplay = document.querySelector("#score")
const StartBtn = document.querySelector("#start-button")
const width= 10

// Los Bloquecitos

const lTetromino = [
  [1, width+1, width*2+1, 2],
  [width, width+1, width+2, width*2+1],
  [1, width+1, width*2+1, width*2],
  [width, width*2, width*2+1, width*2+2]
]
const zTetromino = [
  [0, width, width+1, width*2+1],
  [width+1, width+2, width*2, width*2+1],
  [0, width, width+1, width*2+1],
  [width+1, width+2, width*2, width*2+1]
]
const tTetromino = [
  [1, width, width+1,width+2],
  [1, width+1,width+2, width*2+1],
  [width, width+1, width+2, width*2+1],
  [1, width, width+1, width*2+1]
]

const oTetromino = [
  [0,1,width,width+1],
  [0,1,width, width+1],
  [0,1, width, width +1],
  [0,1, width, width +1]
]
const iTetromino = [
[1, width+1, width*2+1,width*3+1 ],
[width, width+1, width+2, width+3],
[1, width+1,width*2+1, width*3+1],
[width, width+1, width+2, width+3 ]

]

const theTetrominoes = [ lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

// Definimos la posicion incial

let currentPosition = 4
let currentRotation =0
// Vamos a seleccionar uno de los Tetrominos de manera aleatoria

let random= Math.floor(Math.random()*theTetrominoes.length)

let current = theTetrominoes[random][currentRotation]


// Dibujamos la primera figura

function draw () {
  current.forEach(index => {
    squares[currentPosition + index].classList.add("tetromino")
  })
}

// Desdibujar el Tetronomio

function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove("tetromino")
  });
}


// Hacer que el tetromino se mueva para abajo cada segundo

timerId= setInterval(moveDown, 1000)

// Asignar funciones a los codigos

function control(e) {
if (e.keyCode === 37){
  moveLeft()
} else if (e.keyCode === 38) {
  // Rotar
} else if (e.keyCode ===39) {
  moveRight()
} else if ( e.keyCode===40 ) {
  moveDown()
}

}
document.addEventListener("keyup", control)

// Funcion para que se mueva para abajo.

function moveDown() {
  undraw()
  currentPosition += width
  draw()
  freeze()
}

// Freeze function

function freeze(){
  if(current.some(index=> squares [currentPosition + index + width].classList.contains("taken"))) {
    current.forEach(index=> squares[currentPosition + index].classList.add("taken"))

    // Empezar otra figura que se desplaza para abajo
    random = Math.floor(Math.random()* theTetrominoes.length)
    current = theTetrominoes[random][currentRotation]
    currentPosition = 4
    draw()
  }
}



// Mover el tetromino a la izquierda a menos que este al limite del panel

function moveLeft() {
  undraw()
  const isALeftEdge = current.some(index=> ( currentPosition + index) % width ===0)

  if(!isALeftEdge) currentPosition -=1

  if(current.some (index => squares[currentPosition + index].classList.contains("taken"))) {
    currentPosition +=1
  }
  draw()
}


// Mover el tetromino para la derecha a menos que este al limite del bloque


});
