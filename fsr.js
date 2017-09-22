const five = require('johnny-five') // add johnny-five package
const chipio = require('chip-io') // add chip-io package

const board = new five.Board({ // use johnny-five to declare a new "board"
  io: new chipio() // tell johnny-five to use the chip-io package for pin definitions for this board
})

board.on('ready', function () { // function to be exectued when the board is connected and returns a "ready signal"
  const led = new five.Led('PWM0') // create an led object on pin PMW0
  const fsr = new five.Sensor('LRADC') // create a sensor object on pin LRADC
  fsr.on('change', function (value) { // function to run when the amount of current on the pin changes, in this case adjust the brightness of the led to value of the sensor
    console.log('Force detected: ' + value)
    led.brightness(value)
  })
})
