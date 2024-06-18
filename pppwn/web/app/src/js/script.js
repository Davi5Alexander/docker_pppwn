import { AnsiUp } from 'ansi_up';
function updateLog() {
    fetch('hack.log', {
        headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
    })
        .then(response => response.text())
        .then(data => {
            const ansi_up = new AnsiUp();
            const html = ansi_up.ansi_to_html(data);

            document.getElementById("loading").classList.add('d-none');
            document.getElementById('content').style.display = "block";

            var elem = document.getElementById('logContainer');
            var term = document.getElementById('terminal-body');
            elem.innerHTML = html;
            if (document.getElementById("flexSwitchCheckChecked").checked) {  
                term.scrollTop = elem.scrollHeight;
            }
        });
}
setInterval(updateLog, 2000);
document.getElementById("start").onclick   = () => command("start");
document.getElementById("stop").onclick    = () => command("stop");
document.getElementById("restart").onclick = () => command("restart");

function command(buttonValue){
    console.log(buttonValue);
    var selectedButton = document.getElementById(buttonValue);
    const formData = new FormData();
    formData.append('command', buttonValue);
    var buttonContent = selectedButton.querySelector('.button-content');
    var buttonSpinner = selectedButton.querySelector('.spinner');

    selectedButton.classList.toggle("loading");
    
    buttonContent.style.display = "none";
    buttonSpinner.style.display = "block";

    var startbutton = document.getElementById('start');
    var stopbutton = document.getElementById('stop');
    var restartbutton = document.getElementById('restart');
    if (buttonValue == "start"){
        startbutton.disabled   = true;
        console.log("Iniciando"); 
    }else if (buttonValue == "stop"){
        stopbutton.disabled    = true;
        restartbutton.disabled = true;
    }else if (buttonValue == "restart"){
        startbutton.disabled   = true;
        stopbutton.disabled    = true;
        console.log("Reiniciando"); 
    }
    fetch('', { 
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        selectedButton.classList.toggle("loading");
        if (buttonValue == "start"){
            stopbutton.disabled    = false;
            restartbutton.disabled = false;
            buttonSpinner.style.display = "none";
            buttonContent.style.display = "block";
            console.log("PPPwn se ha iniciado"); 
        }else if (buttonValue == "stop"){
            startbutton.disabled   = false;
            buttonSpinner.style.display = "none";
            buttonContent.style.display = "block";
            console.log("PPPwn se ha detenido"); 
        }else if (buttonValue == "restart"){
            stopbutton.disabled    = false;
            startbutton.disabled   = false;
            buttonSpinner.style.display = "none";
            buttonContent.style.display = "block";
            console.log("PPPwn se ha reiniciado"); 
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}