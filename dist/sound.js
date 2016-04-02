'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sound = function () {
    function Sound(url) {
        _classCallCheck(this, Sound);

        this.url = url;
        this.hasAsset = true;
        this.assetsTotal = 1;
        this.assetsLoaded = 0;
    }

    _createClass(Sound, [{
        key: 'load',
        value: function load() {
            var _this = this;

            var xhr = new XMLHttpRequest();
            xhr.open('GET', this.url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function () {
                _this.audioContext.decodeAudioData(xhr.response, function (buffer) {
                    _this._buffer = buffer;
                    _this.assetsLoaded = 1;
                });
            };
        }
    }, {
        key: 'play',
        value: function play() {
            var vol = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

            var source = this.audioContext.createBufferSource(),
                gain = this.audioContext.createGainNode();
            gain.gain.value = vol;
            source.buffer = this._buffer;
            source.connect(gain);
            gain.connect(this.audioContext.destination);
            source.start(0);
        }
    }]);

    return Sound;
}();

function SoundFactory(url) {
    return new Sound(url);
}

exports.default = SoundFactory;