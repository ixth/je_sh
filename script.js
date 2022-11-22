const game = document.querySelector('.game');

const play = document.querySelector('#play').content.firstElementChild.cloneNode(true);
const je_sh = document.querySelector('#je_sh').content.firstElementChild.cloneNode(true);

const audio = new Audio('bgsound.mp3');
audio.setAttribute('preload', 'auto');
audio.setAttribute('loop', true);
audio.load();

audio.addEventListener('canplaythrough', () => {
    game.appendChild(play);

    play.addEventListener('click', () => {
        play.remove();
        game.appendChild(je_sh);

        audio.play();
    });
}, { once: true });
