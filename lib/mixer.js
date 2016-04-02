class Mixer {
    constructor() {
        this.masterVolume = 1;
        this.categories = {};
        this._soundCategoryMap = {};
        let AudioContext = AudioContext || webkitAudioContext;
        this.audioContext = new AudioContext();
    }

    setMasterVolume(vol) {
        this.masterVolume = vol;
    }

    addCategory(name) {
        this.categories[name] = {
            volume: 1,
            sounds: {}
        };
    }

    addSound(category, name, sound) {
        this.categories[category].sounds[name] = sound;
        this._soundCategoryMap[name] = category;
        sound.audioContext = this.audioContext;
        sound.load();
    }

    setCategoryVolume(category, vol) {
        this.categories[category].volume = vol;
    }

    playSound(name, vol = 1) {
        let sound = this.categories[this._soundCategoryMap[name]].sounds[name],
            volume = this.masterVolume * this.categories[this._soundCategoryMap[name]].volume * vol;
        sound.play(volume);
    }
}

function MixerFactory() {
    return new Mixer();
}

export default MixerFactory;
