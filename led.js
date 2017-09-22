const five = require('johnny-five') // add johnny-five package
const chipio = require('chip-io') // add chip-io package

const board = new five.Board({ // use johnny-five to declare a new "board"
  io: new chipio() // tell johnny-five to use the chip-io package for pin definitions for this board
})

board.on('ready', function () { // function to be exectued when the board is connected and returns a "ready signal"
  const led = new five.Led('PWM0') // create an led object on pin PMW0
  led.blink() // blink the led
})
