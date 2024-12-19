document.addEventListener('DOMContentLoaded', function () {
    var music = document.getElementById('backgroundMusic');
    var playButton = document.getElementById('playButton');

    playButton.addEventListener('click', function () {
        if (music.paused) {
            music.play();
            playButton.classList.remove('paused');
            playButton.classList.add('playing');
        } else {
            music.pause();
            playButton.classList.remove('playing');
            playButton.classList.add('paused');
        }
    });

    // 初始状态设置为暂停
    playButton.classList.add('paused');
});