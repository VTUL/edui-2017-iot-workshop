const five = require('johnny-five') // add johnny-five package
const chipio = require('chip-io') // add chip-io package

const board = new five.Board({ // use johnny-five to declare a new "board"
  io: new chipio() // tell johnny-five to use the chip-io package for pin definitions for this board
})

board.on('ready', function () { // function to be exectued when the board is connected and returns a "ready signal"
  const led = new five.Led('PWM0') // create an led object on pin PMW0
  const pir = new five.Motion('CSID6') // create a motion object on pin CSID6
  pir.on('calibrated', function () { // function to run after the system has calibrated the motion object on initialization
    console.log('Motion calibrated')
  })
  pir.on('motionstart', function () { // function to run when the sensor starts seeing movement, in this case blink the led
    console.log('Motion detected')
    led.blink()
  })
  pir.on('motionend', function () { // function to run when the movement stops, in this case turn off the led
    console.log('No motion detected')
    led.stop().off()
  })
})
