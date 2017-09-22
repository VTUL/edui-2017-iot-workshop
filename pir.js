const five = require('johnny-five')
const chipio = require('chip-io')

const board = new five.Board({
  io: new chipio()
})

board.on('ready', function () {
  const led = new five.Led('PWM0')
  const pir = new five.Motion('CSID6')
  pir.on('calibrated', function () {
    console.log('Motion calibrated')
  })
  pir.on('motionstart', function () {
    console.log('Motion detected')
    led.blink()
  })
  pir.on('motionend', function () {
    console.log('No motion detected')
    led.stop().off()
  })
})
