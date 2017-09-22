const five = require('johnny-five')
const chipio = require('chip-io')

const board = new five.Board({
  io: new chipio()
})

board.on('ready', function () {
  const led = new five.Led('PWM0')
  led.blink()
})
