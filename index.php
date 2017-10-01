<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
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
        <span id="locs"></span>
        <div id="slider"></div>
        <div class="board">
            <canvas id="gameboard" width="640" height="480" class="board" ></canvas>
        </div>
        <div id="score" class="score">
            This is my score:
        </div>
        <br>
        <div id="hits" class="score">
            
        </div>
   
    
    <script src="http://wellcaffeinated.net/PhysicsJS/assets/scripts/vendor/physicsjs-0.6.0/physicsjs-full-0.6.0.min.js"></script>

    <script src="proto.js"></script>
    </body>
</html>