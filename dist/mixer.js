"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mixer = function () {
    function Mixer() {
        _classCallCheck(this, Mixer);

        this.masterVolume = 1;
        this.categories = {};
        this._soundCategoryMap = {};
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
    }

    _createClass(Mixer, [{
        key: "setMasterVolume",
        value: function setMasterVolume(vol) {
            this.masterVolume = vol;
        }
    }, {
        key: "addCategory",
        value: function addCategory(name) {
            this.categories[name] = {
                volume: 1,
                sounds: {}
            };
        }
    }, {
        key: "addSound",
        value: function addSound(category, name, sound) {
            this.categories[category].sounds[name] = sound;
            this._soundCategoryMap[name] = category;
            sound.audioContext = this.audioContext;
            sound.load();
        }
    }, {
        key: "setCategoryVolume",
        value: function setCategoryVolume(category, vol) {
            this.categories[category].volume = vol;
        }
    }, {
        key: "playSound",
        value: function playSound(name) {
            var vol = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            var sound = this.categories[this._soundCategoryMap[name]].sounds[name],
                volume = this.masterVolume * this.categories[this._soundCategoryMap[name]].volume * vol;
            sound.play(volume);
        }
    }]);

    return Mixer;
}();

function MixerFactory() {
    return new Mixer();
}

exports.default = MixerFactory;