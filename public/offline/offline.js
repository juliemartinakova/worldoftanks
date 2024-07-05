// AUDIO

const hover2 = new Audio("audio/hangar/hover2.wav")
const click2 = new Audio("audio/hangar/click2.wav")
const click3 = new Audio("audio/hangar/click3.wav")
const loadingAmb = new Audio("audio/loading/loginscreen.wav")

// SELECTORS

const loadPart1 = document.querySelector("#loadingPart1")
const loadPart2 = document.querySelector("#loadingPart2")
const initial = document.querySelector("#initial")
const loadProg = document.querySelector("#loadingProgress")
const nosup = document.querySelector("#nosupport")
const selHead = document.querySelector("#serverSelect")
const serverSel = document.querySelector("#serverSel")
const logForm = document.querySelector("#loginForm")
const fullscreenWarn = document.querySelector("#fullscreenWarn")
const gmVol = document.querySelector("#gameVol")
const gameVol = document.querySelector("#gameVolume")
const loginForm = document.querySelector("#loginForm")
const Settings = document.querySelector("#displaySettings")
const settingsWindow = document.querySelector("#settings")
const clsSettings = document.querySelector("#closeSettings")
const setBar = document.querySelector("#settingsBar")
const allowSound = document.querySelector("#allowSound")
const showGeneralTab = document.querySelector("#showSettingsTab1")
const showGraphicsTab = document.querySelector("#showSettingsTab2")
const showSoundTab = document.querySelector("#showSettingsTab3")
const showControlsTab = document.querySelector("#showSettingsTab4")
const showCrosshairTab = document.querySelector("#showSettingsTab5")
const showMarkersTab = document.querySelector("#showSettingsTab6")
const showBatnotifyTab = document.querySelector("#showSettingsTab7")
const generalSettings = document.querySelector("#setGeneral")
const graphicsSettings = document.querySelector("#setGraphics")
const soundSettings = document.querySelector("#setSound")
const controlsSettings = document.querySelector("#setControls")
const crosshairSettings = document.querySelector("#setCrosshair")
const markersSettings = document.querySelector("#setMarkers")
const batNotifySettings= document.querySelector("#setBattleNotifications")
const settingsTabs = document.querySelectorAll(".settingsTab")
const showSettingsTabs = document.querySelectorAll(".showSettingsTab")
const interaction2 = document.querySelectorAll(".interaction2")
const interaction3 = document.querySelectorAll(".interaction3")
const servers = document.querySelectorAll(".option")

// VARS

let loadingImg = Math.round(Math.random()*(42 - 1 + 1) + 1)
let gameVolume = gmVol.value/100
let loadingImage = "url("+"slides/"+loadingImg+".webp)"
let allowSoundMultiplier = 1
/*let step = 150
let fullscreen = 0
let freeSltCount = 0
let slotsCost = 0
let valCredits = "1"
let tanksInGarage = 0
let tankQuantity = 0
let creditsAmount = 1000000
let goldAmount = 0
let bondsAmount = 0
let freexpAmount = 0
let formSwitch = false
let accSetShow = false
let inGame = false
let allowSoundactive = true
let server = null
let tankname = null
let gameVolumeCookies = null
let loadbarInterval = null
let nickname = null
let menuVisible = false
let submenuVisible = false
let vehicleGridMode
let mouseDown*/

// FUNCTIONS (arrow functions)

const getCookie = (Name) => { //Retrieves cookie from web browser
    let name = Name + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for(let i = 0; i <ca.length; i++){
        let c = ca[i];
        while (c.charAt(0) == ' '){
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0){
            return c.substring(name.length, c.length)
        }
    }
    return ""
}

const setCookie = (Name, Value, Ex) => { //Sets cookies
    const d = new Date()
    d.setTime(d.getTime() + (Ex*24*60*60*1000))
    let expires = "expires="+ d.toUTCString()
    document.cookie = Name + "=" + Value + ";" + expires + ";path=/"
}

const checkServerCookie = () => { //Checks "server" cookie value - server autoselect
    let serverCookie = getCookie("server")
    /*if (serverCookie == 1){
        selHead.innerText = "Auto"
        server = "Auto"
        setCookie("server", serverCookie, 365)
    } else if (serverCookie == "" || serverCookie == 1){
        server = "Auto"
        selHead.innerText = "Auto"
        setCookie("server", serverCookie, 365)
    } else*/ if (!serverCookie || serverCookie > 2 && serverCookie <2){
        server = "EU1"
        selHead.innerText = "WOT EU1"
        setCookie("server", 2, 365)
    } else {
        selHead.innerText = "WOT EU"+(serverCookie-1)
        server = "WOT EU"+(serverCookie-1)
        setCookie("server", serverCookie, 365)
    }
}

const checkVolumeCookie = () => { //Checks the "gameVolume" cookie (integer value 0-100) and if sound are enabled (cookie "allowSound", boolean 1=enabled; 0=disabled)
    let gameVolCookie = getCookie("gameVolume")
    let allowSoundCookie = getCookie("allowSound")
    if (gameVolCookie == "" || !gameVolCookie) {
        gmVol.setAttribute("value", 25)
        gameVolume = (25/100)*1
        gameVol.innerText = "25"
        setCookie("allowSound", 1, 365)
        setCookie("gameVolume", 25, 365)
        allowSound.classList.add("active")
        allowSoundactive = true
    } else {
        gmVol.setAttribute("value", gameVolCookie)
        gameVol.innerText = gameVolCookie
        gameVolume = (gameVolCookie/100)*allowSoundCookie
        if(allowSoundCookie == 1){
            allowSoundactive = true
            allowSound.classList.add("active")
        } else {
            allowSoundactive = false
            allowSound.classList.remove("active")
        }
    }
    if (allowSoundCookie == 0){
        allowSound.classList.remove("active")
        allowSoundactive = false
    }
    volumeChanger()
}

const volumeChanger = () => { //Sets volume of the game and also sets "gameVolume" cookie value
    gameVol.innerText = gmVol.value
    gameVolume = (gmVol.value/100)*allowSoundMultiplier
    gameVolumeCookies = gmVol.value
    hover2.volume = gameVolume
    click2.volume = gameVolume
    click3.volume = gameVolume
    loadingAmb.volume = gameVolume/4
    setCookie("gameVolume", gameVolumeCookies, 365)
    setCookie("allowSound", allowSoundMultiplier, 365)
}

const checkSessions = () => { //Posts an message & disables user interaction when there are multiple instances of the browser tab with the game opened, displays an reload page button which disables the other instances of the game
    const channel = new BroadcastChannel('tab')
    let isOriginal = true
    channel.postMessage('another-tab')
    channel.addEventListener('message', (msg) => {
        if (msg.data === 'another-tab' && isOriginal){
            channel.postMessage('already-open')
        }
        if (msg.data === 'already-open'){
            isOriginal = false
            fullscreenWarn.classList.add("hidden")
        } else {
            fullscreenWarn.classList.remove("hidden")
        }
    })
}

const scrollSettingsBar = (e) => { //Adds horizontal scrolling to the game settings menu selector (Graphics, Sound, etc.) when the width of the menu selector is higher than device screen width
    if (e.deltaY > 0){
        setBar.scrollLeft += 100
    } else {
        setBar.scrollLeft -= 100
    }
}

const showSettings = () => { //Shows the game settings window
    settingsWindow.classList.remove("hidden")
}

const hideSettings = () => { //Hides the game settings window and resets the active menu back to "General"
    settingsWindow.classList.add("hidden")
    setTimeout(()=>{
        for (var i=0; i<showSettingsTabs.length; i++){
            showSettingsTabs[i].classList.remove("active")
        }
        for (var i=0; i<settingsTabs.length; i++){
            settingsTabs[i].classList.add("hidden")
        }
        showGeneralTab.classList.add("active")
        generalSettings.classList.remove("hidden")
    },700)
}

const gameLoad = () => { //Main function initializing the game loading functions
    checkSessions() //Game instance check
    checkServerCookie() //Server cookie check
    checkVolumeCookie() //Volume cookie check
    loadProg.style.backgroundImage = loadingImage
    window.addEventListener("resize",()=>{
        if (window.innerHeight < 600){
            logForm.style.height = window.innerHeight - 120+"px"
        } else {
            logForm.style.height = "auto"
        }
    })
    document.documentElement.setAttribute("lang", navigator.language)
}

const setSettingsTab = (tab) => {
    for (var i=0; i<settingsTabs.length; i++){
        settingsTabs[i].classList.add("hidden")
        showSettingsTabs[i].classList.remove("active")
    }
    settingsTabs[tab].classList.remove("hidden")
    showSettingsTabs[tab].classList.add("active")
}

// EVENT LISTENERS

showSettingsTabs[0].addEventListener("click",()=>{setSettingsTab(0)})
showSettingsTabs[1].addEventListener("click",()=>{setSettingsTab(1)})
showSettingsTabs[2].addEventListener("click",()=>{setSettingsTab(2)})
showSettingsTabs[3].addEventListener("click",()=>{setSettingsTab(3)})
showSettingsTabs[4].addEventListener("click",()=>{setSettingsTab(4)})
showSettingsTabs[5].addEventListener("click",()=>{setSettingsTab(5)})
showSettingsTabs[6].addEventListener("click",()=>{setSettingsTab(6)})

document.addEventListener("DOMContentLoaded", gameLoad)

window.addEventListener("online",() => window.location.assign(window.location.origin))

gmVol.addEventListener("change", volumeChanger)
gmVol.addEventListener("input", volumeChanger)

document.addEventListener("contextmenu", e => e.preventDefault() )

Settings.addEventListener("click", showSettings)
clsSettings.addEventListener("click", hideSettings)

logForm.addEventListener("submit", e => e.preventDefault())

allowSound.addEventListener("click", () => {
    if(allowSoundactive == true){
        allowSound.classList.remove("active")
        setTimeout(() => {
            allowSoundactive = false
            allowSoundMultiplier = 0
            volumeChanger()
            setCookie("allowSound", 0, 365)
        },100)
    } 
    if(allowSoundactive == false){
        allowSound.classList.add("active")
        setTimeout(() => {
            allowSoundactive = true
            allowSoundMultiplier = 1
            volumeChanger()
            setCookie("allowSound", 1, 365)
        },100)
    }
})

setBar.addEventListener("wheel", scrollSettingsBar)

// FOR LOOPS FOR INTERACTION SOUND (clicking, etc..)

for (var i=0; i<interaction2.length; i++){
    interaction2[i].addEventListener("mouseover",()=>{hover2.play()})
    interaction2[i].addEventListener("click",()=>{click2.play()})
}

for (var i=0; i<interaction3.length; i++){
    interaction3[i].addEventListener("click",()=>{click3.play()})
}

// OTHER

if ("serviceWorker" in navigator) { //adds a service worker
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('/src/service-worker.js')
        .then((registration) => {
            console.log('Service worker registered', registration)
        })
        .catch((error) => {
            console.log('Service worker registration failed', error)
        })
    })
}

if (navigator.onLine){
    window.location.assign(window.location.origin)
}