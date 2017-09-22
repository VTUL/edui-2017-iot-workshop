const cv = require('opencv')

try {
  const camera = new cv.VideoCapture(0)
  const rectColor = [255, 0, 0]
  const rectThickness = 2
  camera.read(function (err, im) {
    if (err) throw err
    if (im.size()[0] > 0 && im.size()[1] > 0) {
      im.detectObject(cv.FACE_CASCADE, {}, function (err, faces) {
        if (err) throw err
        for (let i = 0; i < faces.length; i++) {
          face = faces[i]
          im.rectangle([face.x, face.y], [face.width, face.height], rectColor, rectThickness)
        }
        im.save('tmp/faces.png')
      })
    }
  })
} catch (e) {
  console.log('Camera error: ', e)
}
