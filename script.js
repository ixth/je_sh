async function progress(response, cb) {
    const reader = response.body.getReader();
    const contentLength = response.headers.get('Content-Length')

    let total = 0;
    const chunks = [];
    while (true) {
        cb(total / contentLength);
        const { done, value } = await reader.read();

        if (done) {
            break;
        }

        total += value.byteLength;
        chunks.push(value);
    }

    return new Blob(chunks);
}

const getAudio = async (url, progressCallback) => {
    const response = await fetch(url);
    const blob = await progress(response, progressCallback);
    return new Audio(URL.createObjectURL(blob));
};

const main = async () => {
    const game = document.querySelector('.game');

    const progressContainer = document.querySelector('.progress');
    const progressControl = document.querySelector('.progress__control');
    const play = document.querySelector('#play').content.firstElementChild.cloneNode(true);
    const je_sh = document.querySelector('#je_sh').content.firstElementChild.cloneNode(true);

    const audio = await getAudio('bgsound.mp3', (ratio) => {
        progressControl.value = 100 * ratio;
    });
    audio.loop = true;

    progressContainer.remove();
    game.appendChild(play);

    play.addEventListener('click', () => {
        play.remove();
        game.appendChild(je_sh);
        audio.play();
    });
};

main().then(() => {
    console.log('ok');
});
