const five = require('johnny-five') // add johnny-five package
const chipio = require('chip-io') // add chip-io package

const board = new five.Board({ // use johnny-five to declare a new "board"
  io: new chipio() // tell johnny-five to use the chip-io package for pin definitions for this board
})

board.on('ready', function () { // function to be exectued when the board is connected and returns a "ready signal"
  const led = new five.Led('PWM0') // create an led object on pin PMW0
  const doorAlarm = new five.Switch('CSID7') // create a switch object on pin CSID7
  doorAlarm.on('open', function () { // function to run when the circuit is open (pin is low), in this case, indicates the door is closed
    console.log('Door closed')
    led.on()
  })

  doorAlarm.on('close', function () { // function to run when the circuit is closed (pin is high), in this case, indicates the door is open
    console.log('Door open')
    led.off()
  })
})
