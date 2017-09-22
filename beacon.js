const Bleacon = require('bleacon')
const five = require('johnny-five')
const chipio = require('chip-io')
// const request = require('request')

const board = new five.Board({
  io: new chipio()
})

const uuid = 'b9407f30f5f8466eaff925556b57fe6d'
const beacons = [
  {
    'major': 52850,
    'minor': 30647,
    'identifier': 'purple',
    'target': true
  },
  {
    'major': 23887,
    'minor': 4076,
    'identifier': 'yellow',
    'target': false
  },
  {
    'major': 15656,
    'minor': 37696,
    'identifier': 'white',
    'target': false
  }
]
board.on('ready', function () {
  const led = new five.Led('PWM0')

  Bleacon.startScanning(uuid)
  Bleacon.on('discover', function (foundBeacon) {
    for (let i = 0; i < beacons.length; i++) {
      if (foundBeacon.major === beacons[i].major && beacons[i].target && foundBeacon.proximity === 'immediate') {
        led.blink(100, setTimeout(function () { led.stop().off() }, 2000))
        console.log('Beacon Found')
      }
    }

  // request.post(config.postOptions, function (error, response, body) {
  //         if (error) {
  //           console.log('Error: ' + error)
  //         } else {
  //           console.log('Beacon POST response: ' + response.statusCode)
  //         }
  //       }).form({beacon_major: foundBeacon.major, beacon_proximity: foundBeacon.proximity})
  })
})
