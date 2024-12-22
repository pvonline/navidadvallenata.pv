
/* ------ Inicio Reloj Digital ------*/

const $tiempo = document.querySelector('.tiempo'),
$fecha = document.querySelector('.fecha');

function digitalClock(){
    let f = new Date(),
    dia = f.getDate(),
    mes = f.getMonth() + 1,
    anio = f.getFullYear(),
    diaSemana = f.getDay();

    dia = ('0' + dia).slice(-2);
    mes = ('0' + mes).slice(-2)

    let timeString = f.toLocaleTimeString();
    $tiempo.innerHTML = timeString;

    let semana = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
    let showSemana = (semana[diaSemana]);
    $fecha.innerHTML = `${showSemana}  ${dia}-${mes}-${anio}`
}
setInterval(() => {
    digitalClock()
}, 1000);
/* ------ Final Reloj Digital -------*/


/*----- inicio Reproductor webSim.AI doble play y pause -------*/
const audio = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const volumeSlider = document.getElementById('volume');
    const volumeValue = document.getElementById('volume-value');
    const metadata = document.getElementById('metadata');
    const heartbeatVisualizer = document.getElementById('heartbeatVisualizer');

    // Create 12 bars for the heartbeat visualizer
    for (let i = 0; i < 12; i++) {
        const bar = document.createElement('div');
        bar.className = 'heartbeat-bar';
        bar.style.animationDelay = `${i * 0.1}s`;
        heartbeatVisualizer.appendChild(bar);
    }

    let audioContext, analyzer, dataArray, source;

    function initAudioContext() {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyzer = audioContext.createAnalyser();
        source = audioContext.createMediaElementSource(audio);
        source.connect(analyzer);
        analyzer.connect(audioContext.destination);
        analyzer.fftSize = 256;
        dataArray = new Uint8Array(analyzer.frequencyBinCount);
        
        // Start visualization
        visualize();
    }

    function visualize() {
        requestAnimationFrame(visualize);
        analyzer.getByteFrequencyData(dataArray);
        
        const bars = heartbeatVisualizer.children;
        for (let i = 0; i < bars.length; i++) {
            const value = dataArray[i * 2] / 255;
            bars[i].style.transform = `scaleY(${value * 2})`;
        }
    }

    audio.volume = 0.7;

    async function playAudio() {
        try {
            if (!audioContext) {
                initAudioContext();
            }
            await audio.play();
            console.log("Playback started successfully");
            playBtn.classList.add('playing');
            playBtn.classList.remove('paused');
        } catch (error) {
            console.log("Playback error:", error);
            handleAudioError(error);
        }
    }

    function handleAudioError(error) {
        console.error("Audio error:", error);
        const newAudio = document.createElement('audio');
        newAudio.id = 'audioPlayer';
        newAudio.autoplay = true;
        newAudio.preload = "auto";
        newAudio.crossOrigin = "anonymous";
        const source = document.createElement('source');
        source.src = "https://stream.zeno.fm/v5ecixm4fvduv";
        source.type = "audio/mpeg";
        newAudio.appendChild(source);
        audio.parentNode.replaceChild(newAudio, audio);
        setTimeout(() => playAudio(), 500);
    }

    playBtn.addEventListener('click', playAudio);
    
    pauseBtn.addEventListener('click', () => {
        audio.pause();
        playBtn.classList.remove('playing');
        playBtn.classList.add('paused');
    });

    audio.addEventListener('play', () => {
        playBtn.classList.add('playing');
        playBtn.classList.remove('paused');
    });

    audio.addEventListener('pause', () => {
        playBtn.classList.remove('playing');
        playBtn.classList.add('paused');
    });

    volumeSlider.addEventListener('input', e => {
        const value = e.target.value;
        audio.volume = value / 100;
        volumeValue.textContent = value;
    });

    window.addEventListener('load', () => {
        playAudio();
    }, {
        once: true
    });

    document.addEventListener('DOMContentLoaded', () => {
        playAudio();
    }, {
        once: true
    });
/*----- final Reproductor webSim.AI doble play y pause -------*/








