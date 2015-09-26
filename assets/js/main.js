$(document).ready(function() {
   var img = new Image();
   img.crossOrigin = "Anonymous";

   var canvas = document.getElementById('canvas');
   var context = canvas.getContext('2d');

   /* reused from gist https://gist.github.com/lrvick/2080648 */
   function rgbToHex(r, g, b) {
      var bin = r << 16 | g << 8 | b;
      return (function(h) {
         return new Array(7 - h.length).join("0") + h
      })(bin.toString(16).toUpperCase())
   }

   function pickColor(x, y) {
      var pixel = context.getImageData(x, y, 1, 1);
      var data = pixel.data;
      return rgbToHex(data[0], data[1], data[2]);
   }

   function drawSquares() {
      var gridSize = 10;
      var dimX = canvas.width / gridSize;
      var dimY = canvas.height / gridSize;

      for (var i = 1; i < gridSize - 1; i++) {
         for (var j = 1; j < gridSize - 1; j++) {
            if (Math.random() < 1/3) {
               var x = dimX * i;
               var y = dimY * j;

               context.fillStyle = "#" + pickColor(x + dimX / 2, y + dimY / 2);
               context.fillRect(x, y, dimX, dimY);
            }
         }
      }


   }

   function draw() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, img.width, img.height,
         0, 0, canvas.width, canvas.height);
      img.style.display = 'none';

      drawSquares();


   }

   img.onload = function() {
      draw();
      console.log('draw');
   };

   var input = document.getElementById('link-input');
   input.addEventListener('keypress', function(e) {
      if (e.keyCode != 13) {
         return;
      }
      img.style.display = 'initial';
      img.src = document.getElementById('link-input').value;
      draw();
   })

   var button = document.getElementById('btn-download');
   button.addEventListener('click', function(e) {
      var dataURL = canvas.toDataURL('image/jpg');
      button.href = dataURL;
   })

   img.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/265101/floral.jpg';

   canvas.addEventListener('click', draw);

});
