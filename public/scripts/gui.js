//* audio
import { settings_set } from "./main/game_settings.js"
import { setGameLanguage } from "./main/locales.js"
import { hide, show, enable, disable } from "./main/custom_elements.js"

const hover0 = new Audio("assets/media/audio/hover0.wav")
const hover1 = new Audio("assets/media/audio/hover1.wav")
const hover2 = new Audio("assets/media/audio/hover2.wav")
const click0 = new Audio("assets/media/audio/click0.wav")
const click1 = new Audio("assets/media/audio/click1.wav")
const click2 = new Audio("assets/media/audio/click2.wav")

//* selectors

const interactive0 = document.querySelectorAll(".interactive0")
const interactive1 = document.querySelectorAll(".interactive1")
const interactive2 = document.querySelectorAll(".interactive2")
const loader = document.querySelector(".loader")
const landing = document.querySelector(".landing")
const hangar = document.querySelector(".hangar")
const authentication = document.querySelector(".authentication")
const loading = document.querySelector(".loading")
export const debugPrompt = document.querySelector(".debug-prompt")
export const debugCommand = document.querySelector("#debug-command")
const enterGame = document.querySelector(".enter-game")
const windows = document.querySelectorAll(".window")
const windowBarButtons = document.querySelectorAll(".window .bar button")
const modstoreMods = document.querySelectorAll(".modstore .modifications .modification")
const modmanagerMods = document.querySelectorAll(".modstore .modmanager .modification")
const selectFormElements = document.querySelectorAll("select")
const selectCustomElements = document.querySelectorAll(".select")
const devbypassHangar = document.querySelector(".devbypass-hangar")
let languageButtons = document.querySelectorAll(".language-button")

//* variables


let step = 150
let creditsQuantity = 0
let goldQuantity = 0
let freeXPQuantity = 0
let bondQuantity = 0

//* functions
const loadAnimation = () => {
    hide(screens[0])
    setTimeout(()=>{
        show(screens[1])
        setTimeout(()=>{
            hide(screens[1])
            setTimeout(()=>{
                show(screens[2])
                setTimeout(()=>{
                    hide(screens[2])
                    setTimeout(()=>{
                        hide(landing)
                        show(hangar)
                        setTimeout(()=>{
                            show(screens[0])
                            hide(screens[2])
                        }, 700)
                    }, 700)
                }, 5000)
            }, 700)
        }, 5000)
    }, 700)
}

windowBarButtons.forEach(button => {
    button.addEventListener("click",()=>{
        if (button.classList.contains("group")){
            windowBarButtons.forEach(btn => {
                btn.classList.remove("active")
            })
            button.classList.add("active")
        }
        if (button.classList.contains("tab")){
            let openWindow = document.querySelector(`.window .${button.dataset.opentab}`)
            let closeWindow = document.querySelector(`.window .${button.dataset.closetab}`)
            if (openWindow.classList.contains("hidden")){
                if (!closeWindow || closeWindow == ""){
                    let windows = document.querySelectorAll(`.${button.dataset.windowname} .content`)
                    windows.forEach(win => {
                        hide(win)
                    })
                    setTimeout(()=>{
                        show(openWindow)
                    }, 500)
                } else {
                    hide(closeWindow)
                    setTimeout(()=>{
                        show(openWindow)
                    }, 500)
                }
            }
        }
        if (button.classList.contains("filter")){
            windowBarButtons.forEach(btn => {
                if (btn.classList.contains("group")){
                    btn.classList.remove("active")
                }
            })
            button.classList.toggle("active")
        }
    })
})

modstoreMods.forEach(mod => {
    const add = document.querySelector(".modstore .content .modification .actions .add")
    const star = document.querySelector(".modstore .content .modification .actions .star")
    const info = document.querySelector(".modstore .content .modification .actions .info")

    add.addEventListener("click",()=>{
        mod.classList.toggle("active")
        add.classList.toggle("active")
        if(add.classList.contains("active")){
            add.innerHTML = "<span class=\"material-symbols-rounded\">close</span>"
        } else {
            add.innerHTML = "<span class=\"material-symbols-rounded\">add</span>"
            add.classList.add("activated")
        }
    })
    star.addEventListener("click",()=>{
        star.classList.toggle("active")
    })
    info.addEventListener("click",()=>{
        let redirectURL = mod.getAttribute("id")
        window.location.assign(redirectURL+".htm")
    })
})

modmanagerMods.forEach(mod => {
    const remove = document.querySelector(".modstore .content .modification .actions .remove")
    const star = document.querySelector(".modstore .content .modification .actions .settings")
    const info = document.querySelector(".modstore .content .modification .actions .info")

    remove.addEventListener("click",()=>{
        hide(mod)
    })
    info.addEventListener("click",()=>{
        let redirectURL = mod.getAttribute("id")
        window.location.assign(redirectURL+".htm")
    })
})

windows.forEach(win => {
    let showButton = document.querySelectorAll(`.show-${win.className.replace(/\b(window|fullscreen|hidden)\b/g, '')}`)
    let closeButton = document.querySelectorAll(".window .header .actions .close")
    let windowBar = document.querySelectorAll(".window .header .bar")
    windowBar.forEach(bar => {
        if(bar.scrollWidth > window.innerWidth){
            bar.classList.add("overflow")
        }
        bar.addEventListener("wheel", (e)=>{
            if (!bar.classList.contains("grabbing")){
                if (e.deltaY > 0){
                    bar.scrollLeft += 120
                } else {
                    bar.scrollLeft -= 120
                }
            }
        },{passive: true})
        bar.addEventListener("mousedown",()=>{
            bar.classList.add("grabbing")
            win.onmousemove = (e)=>{
                bar.scrollLeft -= e.movementX
            }
            win.addEventListener("mouseup",()=>{
                bar.classList.remove("grabbing")
            })
        })
    })
    closeButton.forEach(close => {
        close.addEventListener("click",()=>hide(win))
    })
    showButton.forEach(button => {
        button.addEventListener("click",()=>show(win))
    })
})

enterGame.addEventListener("click", () => {
    if(loggedUser != ""){
        loadAnimation()
    }
})

window.addEventListener("resize",()=>{
    let windowBar = document.querySelectorAll(".window .header .bar")
    windowBar.forEach(bar => {
        if(bar.scrollWidth > window.innerWidth){
            bar.classList.add("overflow")
        } else {
            bar.classList.remove("overflow")
        }
    })
})

//* for loops for intecation sounds

for (var i=0; i<interactive0.length; i++){
    interactive0[i].addEventListener("mouseover",()=>{hover0.play()})
    interactive0[i].addEventListener("mousedown",()=>{click0.play()})
    interactive0[i].classList.remove("interactive0")
}

for (var i=0; i<interactive1.length; i++){
    interactive1[i].addEventListener("mouseover",()=>{hover1.play()})
    interactive1[i].addEventListener("mousedown",()=>{click1.play()})
    interactive1[i].classList.remove("interactive1")
}

for (var i=0; i<interactive2.length; i++){
    interactive2[i].addEventListener("mousedown",()=>{click2.play()})
    interactive2[i].classList.remove("interactive2")
}

//* other

document.querySelector("#blurEffect").onclick = () => {
    document.body.classList.toggle("blurEffect")
}

const forms = document.querySelectorAll("form button:not([type='sumbit'])")
forms.forEach(form => {
    form.addEventListener("click",e => e.preventDefault())
})

const form_elements = document.querySelectorAll("form")
form_elements.forEach(element => {
    element.addEventListener("submit", e => e.preventDefault())
})

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}