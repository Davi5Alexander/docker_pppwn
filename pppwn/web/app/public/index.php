<?php

// Favicon
$svgContent = file_get_contents('images/icons.svg');
$pattern = '/<symbol[^>]*id="' . preg_quote('logo', '/') . '"[^>]*viewBox="([^"]+)"[^>]*>(.*?)<\/symbol>/s';
preg_match($pattern, $svgContent, $matches);
$viewBox = $matches[1];
$symbolContent = $matches[2];

// Construir el SVG para el favicon usando el viewBox del symbol
$faviconSvg = <<<EOT
<svg xmlns="http://www.w3.org/2000/svg" viewBox="$viewBox">
    $symbolContent
</svg>
EOT;

// Commands
$output = [];
$returnCode = 0;
exec("supervisorctl status pppwn", $output, $returnCode);

if ($returnCode === 0 && strpos($output[0], "RUNNING") !== false) {
    $startbutton   = "disabled";
    $stopbutton    = "";
    $restartbutton = "";
} else {
    $startbutton   = "";
    $stopbutton    = "disabled";
    $restartbutton = "disabled";
}

if(isset($_POST['command'])) { 
    $comando = $_POST['command'];
    switch ($comando) {
        case 'start':
            shell_exec('supervisorctl start pppwn');
            break;
        case 'stop':
            shell_exec('supervisorctl stop pppwn');
            break;
        case 'restart':
            shell_exec('supervisorctl restart pppwn');
            break;
        default:
            echo "Comando no válido";
    }
}
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Docker PPPwn</title>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<?php echo rawurlencode($faviconSvg); ?>">
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <?php echo file_get_contents('images/icons.svg');?>
        
        <!-- <div id="wrapper">
            <div id="triangle"><svg><use href="#triangle"/></svg></div> 
            <div id="circle"><svg><use href="#circle"/></svg></div> 
            <div id="cross"><svg><use href="#cross"/></svg></div>
            <div id="square"><svg><use href="#square"/></svg></div>
        </div> -->
        <div id="loading" class="container d-flex justify-content-center align-items-center vh-100">
            <div class="svg-container">
                <svg class="background-svg rounded-circle"><use href="#waves"/></svg>
                <svg class="centered-svg"><use href="#logo"/></svg>
            </div>
        </div>

        <div id="content" class="container mt-3" style="display:none">
            <div class="d-flex justify-content-center mb-3">
                <svg><use href="#logo"/></svg>  
            </div>
            <div class="d-flex justify-content-center">
                <button <?php echo $startbutton;?> id="start" class="button btn btn-success me-2 d-flex justify-content-center align-items-center">
                    <div class="button-content">
                        <svg><use href="#play-fill"/></svg> Start
                    </div>
                    <span class="spinner" style="display:none"></span>
                </button>
                <button <?php echo $stopbutton;?> id="stop" class="button btn btn-danger me-2 d-flex justify-content-center align-items-center">
                    <div class="button-content">
                        <svg><use href="#stop-fill"/></svg> Stop
                    </div>
                    <span class="spinner" style="display:none"></span>
                </button>
                <button <?php echo $restartbutton;?> id="restart" class="button btn btn-primary d-flex justify-content-center align-items-center">
                    <div class="button-content">
                        <svg><use href="#arrow-repeat"/></svg> Restart
                    </div>
                    <span class="spinner" style="display:none"></span>
                </button>
            </div> 

            <div id="terminal">
                <div class="terminal-window rounded-3 mt-4 position-relative">
                    <div class="terminal-bar d-flex">
                        <div class="me-auto">
                            <img src="images/logo.svg" alt="Icono de la ventana" class="icon-terminal d-inline ms-1">
                            <div class="d-inline">Docker PPPwn</div>
                        </div>
                        <div class="text-left ms-auto me-1">
                            <div class="circle circle-red"></div>
                            <div class="circle circle-orange"></div>
                            <div class="circle circle-green"></div>
                        </div>
                    </div>

                    <div id="terminal-body" style="overflow-y: scroll;">
                        <div id="logContainer"></div>
                        <span class="cursor"></span>
                        <div class="d-flex position-absolute bottom-0 end-0 me-3 mb-3">
                            <div class="form-check form-switch d-flex align-items-center">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
                                <label class="form-check-label ms-2" for="flexSwitchCheckChecked">Autoscroll</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="scripts.js"></script>
    </body>
</html>
