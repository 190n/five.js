class Sound {
    constructor(url) {
        this.url = url;
        this.hasAsset = true;
        this.assetsTotal = 1;
        this.assetsLoaded = 0;
    }

    load() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', this.url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = () => {
            this.audioContext.decodeAudioData(xhr.response, buffer => {
                this._buffer = buffer;
                this.assetsLoaded = 1;
            });
        };
    }

    play(vol = 1) {
        let source = this.audioContext.createBufferSource(),
            gain = this.audioContext.createGainNode();
        gain.gain.value = vol;
        source.buffer = this._buffer;
        source.connect(gain);
        gain.connect(this.audioContext.destination);
        source.start(0);
    }
}
