const cv = require('opencv') // add the opencv package, requires opencv already be installed on the system to work

try { // try to connect to camera, throw error on fail
  const camera = new cv.VideoCapture(0) // instantiate the pi camera, requires the V4L2 (Video for Linux) driver be installed for the pi camera to be recognized by opencv
  const rectColor = [255, 0, 0] // rgb values for the rectangle that will be drawn around faces
  const rectThickness = 2 // thickness of the rectangle lines that will be drawn around faces
  camera.read(function (err, im) { // read function, access camera and pulls an image, that is passed as im
    if (err) throw err // error handling for camera image read
    if (im.size()[0] > 0 && im.size()[1] > 0) { // check the size of the image to make sure it is not 0x0 pixels
      im.detectObject(cv.FACE_CASCADE, {}, function (err, faces) { // run detectObject function, pass it cv.FACE_CASCADE, which is a set of definitions that recognizes face. There are other options, and also different sets of rules for faces, including pre-trained options that you can download. The function passes a faces array with the coordinates of each face it identified
        if (err) throw err // error checking to make sure face detection didn't fail
        for (let i = 0; i < faces.length; i++) { // cycle through array of faces
          face = faces[i]
          im.rectangle([face.x, face.y], [face.width, face.height], rectColor, rectThickness) // draw a rectangle around each face using our variables from earlier
        }
        im.save('tmp/faces.png') // save new image with faces to a tmp folder
      })
    }
  })
} catch (e) { // failed to connect to camera
  console.log('Camera error: ', e)
}
