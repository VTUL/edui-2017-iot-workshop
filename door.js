const five = require('johnny-five')
const chipio = require('chip-io')

const board = new five.Board({
  io: new chipio()
})

board.on('ready', function () {
  const led = new five.Led('PWM0')
  const doorAlarm = new five.Switch('CSID7')
  doorAlarm.on('open', function () {
    console.log('Door closed')
    led.on()
  })

  doorAlarm.on('close', function () {
    console.log('Door open')
    led.off()
  })
})
