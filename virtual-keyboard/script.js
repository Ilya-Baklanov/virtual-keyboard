const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: '',
        capsLock: false,
        shift: false,
        language: "EN",
        keyLayout: [],
        mute: false
    },

    init() {
        //Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        this.input = document.getElementById("use-keyboard-input");
        

        //Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");        
        this.elements.keysContainer.appendChild(this._createKeys());
        

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        
        //Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        //Automatically use keyboard 
        const openKeyboard = () => {
            this.open();
        }
        this.input.focus();
        this.input.addEventListener("focus", openKeyboard);

        this.input.addEventListener("click", openKeyboard);

        this.input.addEventListener("keydown", openKeyboard);

    },

    _createKeys() {
        const fragment = document.createDocumentFragment();

        
        if(this.properties.language === "EN" && !this.properties.shift){
            this.properties.keyLayout = [
                "\`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
                "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
                "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "\'", "enter",
                "z", "x", "c", "v", "b", "n", "m", ",", ".", "\/",
                "shift", "done", "ln", "space", "mute", "left", "right"
            ];
        } else if(this.properties.language === "EN" && this.properties.shift){
            this.properties.keyLayout = [
                "\`", "!", "\@", "\#", "\$", "\%", "\^", "\&", "\*", "\(", "\)", "\_", "\+", "backspace",
                "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", "|",
                "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "\"", "enter",
                "z", "x", "c", "v", "b", "n", "m", "<", ">", "\?",
                "shift", "done", "ln", "space", "mute", "left", "right"
            ];
        } else if(this.properties.language === "RU" && !this.properties.shift) {
            this.properties.keyLayout = [
                "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
                "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
                "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
                "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
                "shift", "done", "ln", "space", "mute", "left", "right"
            ];
        } else if(this.properties.language === "RU" && this.properties.shift){
            this.properties.keyLayout = [
                "ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace",
                "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\/",
                "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
                "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",",
                "shift", "done", "ln", "space", "mute", "left", "right"
            ];
        }

        //Create HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`
        };

        this.properties.keyLayout.forEach((key, index) => {
            const keyElement = document.createElement("button");
            let insertLineBreak = false;
            if(index === 13 || index === 26 || index === 39 || index === 49){
                insertLineBreak = true;
            }

            //Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "ln":
                    keyElement.innerHTML = `<span>${this.properties.language}</span>`;

                    keyElement.addEventListener("click", () => {
                        this._changeLanguage();
                        this.input.focus();
                    });
                    
                break;

                case "mute":
                    keyElement.innerHTML = `<span>mute</span>`;

                    keyElement.addEventListener("click", () => {
                        this.properties.mute = !this.properties.mute;
                        this.input.focus();
                    });
                    
                break;

                case "left":
                    keyElement.innerHTML = `<span>\<--</span>`;

                    keyElement.onclick = () => {
                        if(this.input.selectionStart === this.input.selectionEnd){
                            this.input.setRangeText("", this.input.selectionStart - 1, this.input.selectionEnd - 1, "end");
                            this.input.focus();
                        } else {
                            this.input.setRangeText("", this.input.selectionStart, this.input.selectionEnd - (this.input.selectionEnd - this.input.selectionStart), "end");
                            this.input.focus();
                        }
                    };

                    this.input.addEventListener("keydown", (e) => {
                        if (e.key == "ArrowLeft"){
                            keyElement.classList.toggle("keyboard__key--dark");
                            setTimeout(() => keyElement.classList.toggle("keyboard__key--dark"), 120);
                        }
                    });
                    
                break;

                case "right":
                    keyElement.innerHTML = `<span>--\></span>`;

                    keyElement.onclick = () => {
                        if(this.input.selectionStart === this.input.selectionEnd){
                            this.input.setRangeText("", this.input.selectionStart + 1, this.input.selectionEnd + 1, "end");
                            this.input.focus();
                        } else {
                            this.input.setRangeText("", this.input.selectionStart + (this.input.selectionEnd - this.input.selectionStart), this.input.selectionEnd , "end");
                            this.input.focus();
                        }
                    };

                    this.input.addEventListener("keydown", (e) => {
                        if (e.key == "ArrowRight"){
                            keyElement.classList.toggle("keyboard__key--dark")
                            setTimeout(() => keyElement.classList.toggle("keyboard__key--dark"), 120)
                        }
                    });
                    
                break;

                case "backspace":
                    keyElement.classList.add("keyboard__key--wide", "backspace");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.onclick = () => {
                        if(this.input.selectionStart === 0 && this.input.selectionEnd === 0) {
                            this.input.focus();
                        } else if(this.input.selectionStart !== this.input.selectionEnd){
                            this.input.setRangeText("", this.input.selectionStart, this.input.selectionEnd, "end");
                            this.input.focus();
                        } else {
                            this.input.setRangeText("", this.input.selectionStart - 1, this.input.selectionEnd, "end");
                            this.input.focus();
                        }
                    };

                    this.input.addEventListener("keydown", (e) => {
                        if (e.key == "Backspace"){
                            keyElement.classList.toggle("keyboard__key--dark")
                            setTimeout(() => keyElement.classList.toggle("keyboard__key--dark"), 120)
                        }
                        
                    });
                    
                break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "capslock");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        if(!this.properties.capsLock){
                            this._onCapsLock();
                        } else {
                            this._offCapsLock();
                        }
                        this.input.focus();
                    });

                    this.input.addEventListener("keydown", (e) => {
                        if (e.key == "CapsLock"){
                            if(!this.properties.capsLock){
                                this._onCapsLock();
                            } else {
                                this._offCapsLock();
                            }
                            this.input.focus();
                        }
                        
                    });
                    
                break;

                
                case "shift":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "shift");
                    keyElement.innerHTML = createIconHTML("keyboard_shift");

                    keyElement.addEventListener("click", () => {
                        this.properties.shift ?
                            this._offShift():
                            this._onShift();
                        
                        this.input.focus();
                    });

                    this.input.addEventListener("keydown", (e) => {
                        if (e.key == "Shift"){
                            if(!this.properties.shift){
                                this._onShift()
                            }
                        }
                    });

                    this.input.addEventListener("keyup", (e) => {
                        if (e.key == "Shift"){
                            if(this.properties.shift){
                                this._offShift()
                            }
                        }
                    });

                break;
                
                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.onclick = () => {
                        this.input.setRangeText("\n", this.input.selectionStart, this.input.selectionEnd, "end");
                        this.input.focus();
                    };

                    this.input.addEventListener("keydown", (e) => {
                        if (e.key == "Enter"){
                            keyElement.classList.toggle("keyboard__key--dark")
                            setTimeout(() => keyElement.classList.toggle("keyboard__key--dark"), 120)
                        }
                        
                    });

                break;
                                
                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.onclick = () => {
                        this.input.setRangeText(" ", this.input.selectionStart, this.input.selectionEnd, "end");
                        this.input.focus();
                    };

                    this.input.addEventListener("keydown", (e) => {
                        if (e.key == " "){
                            keyElement.classList.toggle("keyboard__key--dark")
                            setTimeout(() => keyElement.classList.toggle("keyboard__key--dark"), 120)
                        }
                        
                    });
                    
                break;
                                                
                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                    })

                break;
                                                                
                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.onclick = () => {
                        this.properties.capsLock || this.properties.shift ? key = key.toUpperCase() : key = key.toLowerCase();
                        this.input.setRangeText(key, this.input.selectionStart, this.input.selectionEnd, "end");
                        this.input.focus();
                        if(this.properties.shift){
                            this._offShift();
                        }
                    };

                    this.input.addEventListener("keydown", (e) => {
                        if (e.key == keyElement.textContent){
                            keyElement.classList.toggle("keyboard__key--dark")
                            setTimeout(() => keyElement.classList.toggle("keyboard__key--dark"), 120)
                        }
                        
                    });

                break;
            }
            
            fragment.appendChild(keyElement);

            if(insertLineBreak){
                fragment.appendChild(document.createElement("br"));
            };
        });

        return fragment;
    },

    _changeLanguage() {
        this.properties.language === "EN" ?
            this.properties.language = "RU" :
            this.properties.language = "EN";
        this.elements.keysContainer.replaceChildren();
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
        this.properties.capsLock ?
        this._onCapsLock() :
        this._offCapsLock();
    },

    _changeLayout() {
        this.elements.keysContainer.replaceChildren();
        this.elements.keysContainer.appendChild(this._createKeys());

        this.properties.capsLock ?
            this._onCapsLock() :
            this._offCapsLock();

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    },

    _onCapsLock() {
        this.properties.capsLock = true;
        document.querySelector(".capslock").classList.add("keyboard__key--active");
        for(const key of this.elements.keys){
            if(key.childElementCount === 0){
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    _offCapsLock() {
        this.properties.capsLock = false;
        document.querySelector(".capslock").classList.remove("keyboard__key--active");
        for(const key of this.elements.keys){
            if(key.childElementCount === 0){
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    _onShift() {
        this.properties.shift = true;
        this._changeLayout();
        document.querySelector(".shift").classList.add("keyboard__key--active");
        for(const key of this.elements.keys){
            if(key.childElementCount === 0){
                if(this.properties.shift && this.properties.capsLock){
                    key.textContent.toLowerCase();
                } else if(this.properties.shift || this.properties.capsLock){
                    key.textContent = key.textContent.toUpperCase()
                } else {
                    key.textContent.toLowerCase();
                }
            }
        }
    },

    _offShift() {
        this.properties.shift = false;
        this._changeLayout();
        document.querySelector(".shift").classList.remove("keyboard__key--active");
        for(const key of this.elements.keys){
            if(key.childElementCount === 0){
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open() {
        this.input.placeholder = "Начинай печатать..."
        this.elements.main.classList.remove("keyboard--hidden");
        this.input.focus();
    },

    close() {
        this.input.placeholder = "Начни печатать или кликни для активации виртуальной клавиатуры....."
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};


window.addEventListener('keydown', (e) => {
    if(!Keyboard.properties.mute){
        let audio = null;
        if (e.key == "Backspace"){
            audio = document.querySelector('.backspace-audio');
        } else if(e.key == "CapsLock"){
            audio = document.querySelector('.capslock-audio');
        } else if(e.key == "Shift"){
            audio = document.querySelector('.shift-audio');
        } else if(e.key == "Enter"){
            audio = document.querySelector('.enter-audio');
        } else if(e.key == " "){
            audio = document.querySelector('.space-audio');
        } else {
            audio = document.querySelector(Keyboard.properties.language === "RU" ? '.letterRU-audio' : '.letterEN-audio');
        }
        audio.play();
    }
});

window.addEventListener('click', (e) => {
    if(!Keyboard.properties.mute){
        let audio = null;
        let target = e.target.innerText;
        console.log(target)
        if (target === "backspace"){
            audio = document.querySelector('.backspace-audio');
        } else if(target == "keyboard_capslock"){
            audio = document.querySelector('.capslock-audio');
        } else if(target == "keyboard_shift"){
            audio = document.querySelector('.shift-audio');
        } else if(target == "keyboard_return"){
            audio = document.querySelector('.enter-audio');
        } else if(target == "space_bar"){
            audio = document.querySelector('.space-audio');
        } else {
            audio = document.querySelector(Keyboard.properties.language === "RU" ? '.letterRU-audio' : '.letterEN-audio');
        }
        audio.play();
    }
});


window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});