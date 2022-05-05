"use strict";

class Drumkit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.currentKick = "./sounds/kick1.wav";
        this.currentClap = "./sounds/clap2.wav";
        this.currentHat = "./sounds/hat1.wav";
        this.kickAudio = document.querySelector(".kick-sound");
        this.clapAudio = document.querySelector(".clap-sound");
        this.hatAudio = document.querySelector(".hat-sound");
        this.playBtn = document.querySelector(".play");
        this.selects = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
        this.index = 0;
        this.bpm = 130;
        this.isPlaying = null;
    }
    //Methods
    activePad() {
        this.classList.toggle("active");
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        this.index++;
        activeBars.forEach((bar) => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            if (bar.classList.contains("active")) {
                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains("clap-pad")) {
                    this.clapAudio.currentTime = 0;
                    this.clapAudio.play();
                }
                if (bar.classList.contains("hat-pad")) {
                    this.hatAudio.currentTime = 0;
                    this.hatAudio.play();
                }
            }
        });
    }
    start() {
        console.log(this);
        const interval = (60 / this.bpm) * 1000;
        if (this.isPlaying) {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
            this.index = 0;
        } else {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        }
    }
    updateBtn() {
        if (this.isPlaying) {
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        } else {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
    }
    changeSound(e) {
        const selectionName = e.target.name;
        const selectionValue = e.target.value;

        switch (selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "clap-select":
                this.clapAudio.src = selectionValue;
                break;
            case "hat-select":
                this.hatAudio.src = selectionValue;
                break;
        }

        console.log(selectionName, selectionValue);
    }

    mute(e) {
        console.log(e);
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")) {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.clapAudio.volume = 0;
                    break;
                case "2":
                    this.hatAudio.volume = 0;
                    break;
            }
        } else {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.clapAudio.volume = 1;
                    break;
                case "2":
                    this.hatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e) {
        const tempoText = document.querySelector(".tempo-nr");
        tempoText.innerText = e.target.value;
    }
    updateTempo(e) {
        clearInterval(this.isPlaying);
        this.bpm = e.target.value;
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if (playBtn.classList.contains("active")) {
            this.start();
        }
    }
}

const drumkit = new Drumkit();

drumkit.pads.forEach((pad) => {
    pad.addEventListener("click", drumkit.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    });
});

drumkit.playBtn.addEventListener("click", function () {
    drumkit.start();
    drumkit.updateBtn();
});

drumkit.selects.forEach((select) => {
    select.addEventListener("change", function (e) {
        drumkit.changeSound(e);
    });
});

drumkit.muteBtns.forEach((mute) => {
    mute.addEventListener("click", function (e) {
        drumkit.mute(e);
    });
});

drumkit.tempoSlider.addEventListener("input", function (e) {
    drumkit.changeTempo(e);
});

drumkit.tempoSlider.addEventListener("change", function (e) {
    drumkit.updateTempo(e);
});
