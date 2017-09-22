const five = require('johnny-five')
const chipio = require('chip-io')

const board = new five.Board({
  io: new chipio()
})

board.on('ready', function () {
  const led = new five.Led('PWM0')
  const fsr = new five.Sensor(51)
  fsr.on('change', function (value) {
    console.log('Force detected: ' + value)
    led.brightness(value)
  })
})
