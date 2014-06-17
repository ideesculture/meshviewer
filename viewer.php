<?php
    session_start();
    if(isset($_POST['example']) && !empty($_POST['example'])){

        $example = $_POST['example'];
    }
    else{
        $example = "cow";
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Three.js OBJ viewer</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <LINK rel="stylesheet" href="index.css" type="text/css">
    <LINK rel="stylesheet" href="lib/jquery-ui/jquery-ui.min.css" type="text/css">
    <style type="text/css">

    </style>
</head>

<body>
<div id="info">
    Three.js OBJ viewer
</div>
<script src="lib/jquery/jquery.min.js"></script>
<script src="lib/jquery-ui/jquery-ui.min.js"></script>
<script src="lib/threejs/three.js"></script>

<script src="lib/threejs/loaders/MTLLoader.js"></script>
<script src="lib/threejs/loaders/OBJMTLLoader.js"></script>

<script src="lib/threejs/Detector.js"></script>
<script src="lib/threejs/TrackballControls.js"></script>
<script src="lib/threejs/libs/stats.min.js"></script>

<script id="objectView" data-example="<?php echo $example; ?>" src="index.js"></script>

<div id="viewer"></div>
<div id="progress"></div>

<div id="buttons">
    <div id="face-buttons">
        <div class="buttons-header">VIEW</div>
        <div class="buttons-detail">
            <div id="face-buttons-table">
                <div class="face-button" id="face-button-1"></div>
                <div class="face-button" id="face-button-2" onclick="javascript:showTop()"></div>
                <div class="face-button" id="face-button-3"></div>
                <div class="clearfix"></div>
                <div class="face-button" id="face-button-4" onclick="javascript:showLeft()"></div>
                <div class="face-button" id="face-button-5" onclick="javascript:showFront()"></div>
                <div class="face-button" id="face-button-6" onclick="javascript:showRight()"></div>
                <div class="clearfix"></div>
                <div class="face-button" id="face-button-7"></div>
                <div class="face-button" id="face-button-8" onclick="javascript:showBottom()"></div>
                <div class="face-button" id="face-button-9" onclick="javascript:showBack()"></div>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
    <div id="advanced-buttons">
        <div class="buttons-header">ADVANCED</div>
        <div class="buttons-detail">
            <p>ROTATE</p>
            <div id="rotate-buttons">
                <div id="sphere-button-1" class="sphere-button" onclick="javascript:rotateLeft()"></div>
                <div id="sphere-button-2" class="sphere-button" onclick="javascript:rotateRight()"></div>
                <div class="clearfix"></div>
            </div>
            <div id="pan-buttons">
                <p>PAN</p>
                    <img src="assets/icons/24/square_empty_icon&24.png" /><img src="assets/icons/24/sq_br_up_icon&24.png" onclick="javascript:translateUp()"/><br/>
                    <img src="assets/icons/24/sq_br_prev_icon&24.png" onclick="javascript:translateLeft()"/><img src="assets/icons/24/square_shape_icon&24.png" /><img src="assets/icons/24/sq_br_next_icon&24.png" onclick="javascript:translateRight()"/><br/>
                    <img src="assets/icons/24/square_empty_icon&24.png" /><img src="assets/icons/24/sq_br_down_icon&24.png" onclick="javascript:translateDown()"/><br/>
            </div>
            <div id="zoom-buttons">
                <P>ZOOM</P>
                    <img src="assets/icons/24/sq_minus_icon&24.png" onclick="javascript:zoomOut()"/>
                    <img src="assets/icons/24/sq_plus_icon&24.png" onclick="javascript:zoomIn()" /><br/>
            </div>
            <div id="advanced-toggler-buttons">
                <P>TOGGLERS</P>
                    <a href="javascript:scene.add(axes);">AXIS ON</a>
                    <a href="javascript:scene.remove(axes);">AXIS OFF</a><br/>
                    <a href="javascript:scene.add(boundingbox);">BBOX ON</a>
                    <a href="javascript:scene.remove(boundingbox);">BBOX OFF</a><br/>
                    <a href="javascript:addPlinth();">PLINTH ON</a>
                    <a href="javascript:removePlinth();">PLINTH OFF</a>
            </div>
        </div>
    </div>

</body>
</html>