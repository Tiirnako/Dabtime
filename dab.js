let audio = new Audio('my-audio.mp3');

document.getElementById('play-button').addEventListener('click', () => {
    window.ipcRenderer.send('play-audio');
});
