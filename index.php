<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width; initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5 user-scalable=no; " />
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-touch-fullscreen" content="yes">
        <!--meta name="viewport" 
  content="width=device-width, initial-scale=1.0, user-scalable=no" -->
        <title>Paddle Battle</title>
        <script
        src="https://code.jquery.com/jquery-3.2.1.min.js"
        integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
        crossorigin="anonymous"></script>
        <script
        src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"
        integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E="
        crossorigin="anonymous"></script>
        <link rel="stylesheet" href="style.css" type="text/css"></link>
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.min.css">

    </head>
    <body onunload="killSocket()">
        <div id="slider" class="touchSurface"></div>
        <div class="board">
            <canvas id="gameboard"  class="board" ></canvas>
        </div>
        <div id="score" class="score">
            This is my score:
        </div>
        <br>
        <div id="hits" class="score">
            
        </div>
        
        <br>
        <br>
        <br>
        <div id="touch" class="score">
        touch points
        </div>
    
    <script src="http://wellcaffeinated.net/PhysicsJS/assets/scripts/vendor/physicsjs-0.6.0/physicsjs-full-0.6.0.min.js"></script>

    <script src="proto.js"></script>
    </body>
</html>