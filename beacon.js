const Bleacon = require('bleacon') // add bleacon package
const five = require('johnny-five') // add johnny-five package
const chipio = require('chip-io') // add chip-io package
// const request = require('request') // if you wanted to send data, the request package is great for API calls

const board = new five.Board({ // use johnny-five to declare a new "board"
  io: new chipio() // tell johnny-five to use the chip-io package for pin definitions for this board
})

const uuid = 'b9407f30f5f8466eaff925556b57fe6d' // define the UUID of the beacons, all of ours are from the same vendor, so we only need to define it once
const beacons = [ // create an array of "known" beacons definitions
  {
    'major': 52850, // major id, used to identify individual beacons, or used for grouping
    'minor': 30647, // minor id, used to identify individual beacons
    'identifier': 'purple', // here we use color, but could be the name of an area
    'target': true // boolean value for whether this is the beacon we are looking for or not
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
board.on('ready', function () { // function to be exectued when the board is connected and returns a "ready signal"
  const led = new five.Led('PWM0') // create an led object on pin PMW0

  Bleacon.startScanning(uuid) // start looking for beacons with the defined UUID
  Bleacon.on('discover', function (foundBeacon) { // function run whenever a beacon with the UUID is found, passes the found beacon's information as an object
    for (let i = 0; i < beacons.length; i++) { // iterate over our array of known beacons and compare them to the found one
      if (foundBeacon.major === beacons[i].major && beacons[i].target && foundBeacon.proximity === 'immediate') { // compare the beacon's major id with the found beacon's, identify if it is one of our target beacons, and weed out any beacons that are not in the "immediate" vicinity
        led.blink(100, setTimeout(function () { led.stop().off() }, 2000)) // if our target beacon is in the immediate vicinity/ blink the led for 2 seconds before turning it off
        console.log('Beacon Found')
        // below is an example of how, instead of making a led blink, you might pass data to an API using the requests nodejs package
        // request.post(config.postOptions, function (error, response, body) { // make a POST request to a server defined in a config.postOptions object, function passes errors, the body, and response from the POST request
        //  if (error) { // check for an error with the call
        //    console.log('Error: ' + error)
        //  } else {  // if no error, log the response status code
        //    console.log('Beacon POST response: ' + response.statusCode)
        //  }
        // }).form({beacon_major: foundBeacon.major, beacon_proximity: foundBeacon.proximity}) // the form data to be sent with the request in a key-value format
      }
    }
  })
})
