import { initializeRender, garageRenderer, garageScene, garageCamera } from "./render.js"
// AUDIO

const hover1 = new Audio("audio/hangar/hover1.wav")
const hover2 = new Audio("audio/hangar/hover2.wav")
const click1 = new Audio("audio/hangar/click1.wav")
const click2 = new Audio("audio/hangar/click2.wav")
export const click3 = new Audio("audio/hangar/click3.wav")
const loadingAmb = new Audio("audio/loading/loginscreen.wav")
export const connectClick = new Audio("audio/loading/connectButton2.wav")
export const connectHover = new Audio("audio/loading/connectButton1.wav")
const hangarAudio = new Audio("audio/hangar/garage.mp3")

// SELECTORS

const loadPart0 = document.querySelector("#loadingPart0")
const loadPart1 = document.querySelector("#loadingPart1")
const loadPart2 = document.querySelector("#loadingPart2")
const initial = document.querySelector("#initial")
export const loadProg = document.querySelector("#loadingProgress")
const imgName = document.querySelector("#imageName")
const progBar = document.querySelector("#progressBar")
const loadStat1 = document.querySelector("#loadingStatus1")
const startup = document.querySelector("#startUp")
const startgm = document.querySelector("#startGame")
const nosup = document.querySelector("#nosupport")
const tabsup = document.querySelector("#tabletSupport")
const platform = document.querySelector("#platform")
const bat = document.querySelector("#battery")
const batGr = document.querySelector("#batGraph")
const batCt = document.querySelector("#batteryContainer")
const selHead = document.querySelector("#serverSelect")
const serverSel = document.querySelector("#serverSel")
const hangTankRole = document.querySelector("#hangarTankRole")
const loadProgBar = document.querySelector("#progress")
const loginLoad = document.querySelector("#loginLoader")
const about = document.querySelector("#about")
const logForm = document.querySelector("#loginForm")
const topBar = document.querySelector("#topBar")
const fullscreenWarn = document.querySelector("#fullscreenWarn")
const vehicleScroller = document.querySelector("#vehicles")
const vehicleSelect = document.querySelector("#vehicleSelect")
const TankName = document.querySelector("#tankName")
const scrLeft = document.querySelector("#scrollLeft")
const scrRight = document.querySelector("#scrollRight")
const vehicleContainer = document.querySelector("#vehicleContainer")
const gmVol = document.querySelector("#gameVol")
const gameVol = document.querySelector("#gameVolume")
const installVidPromo = document.querySelector("#installVideoPromo")
const toggleVehicleSelect = document.querySelector("#toggleVehicleSelect")
const hangBottom = document.querySelector("#hangarBottom")
const tankInfo = document.querySelector("#tankInfo")
const connectButton = document.querySelector("#connect")
const usrName = document.querySelector("#userName")
const playerName = document.querySelector("#playerName")
const tankStorage = document.querySelector("#tankStorage")
const hangBottomUpper = document.querySelector("#hangarBottomUpper")
const hangTanks = document.querySelector("#hangarTanks")
const tankTier = document.querySelector("#tankTier")
const tankType = document.querySelector("#tankType")
const CreditsQuantity = document.querySelector("#creditsQuantity")
const buySlots = document.querySelector("#buySlots")
const freeSltCnt = document.querySelector("#freeSlotsCount")
const hangar = document.querySelector("#hangar")
export const hangMenu = document.querySelector("#hangarMenu")
const hangMenuBt = document.querySelector("#hangarMenuBtn")
const backToHang = document.querySelector("#backToHangar")
const instGame = document.querySelector("#installGame")
const buySlot = document.querySelector("#buySlot")
const buySlotMenu = document.querySelector("#buySlotsMenu")
const buySlotCost = document.querySelector("#buySlotCost")
const buySlotQuantity = document.querySelector("#buySlotQuantity")
const connectHang = document.querySelector("#connect1")
const register = document.querySelector("#registration")
const viewGridMode = document.querySelector("#viewGridMode")
const filterButtonsHang = document.querySelectorAll(".hangFilter")
export const vehFilters = document.querySelector("#vehicleFilters")
const clsVehFilters = document.querySelector("#closeVehicleFiltersWindow")
const openVehFilters = document.querySelector("#toggleAllVehicleFilters")
const vehTankRole = document.querySelector("#vehicleTankRole")
const filtersTankCnt = document.querySelector("#filtersTankCount")
const disconnectSrv = document.querySelector("#disconnectServer")
const disconnectSrvY = document.querySelector("#confirmDisconnectYes")
const disconnectSrvN = document.querySelector("#confirmDisconnectNo")
const confDisconnect = document.querySelector("#confirmDisconnect")
const loginForm = document.querySelector("#loginForm")
const signupForm = document.querySelector("#signupForm")
const signupEmail = signupForm["signupEmail"]
const signupPassword = signupForm["signupPassword"]
const signupPasswordConfirm = signupForm["signupPasswordConfirm"]
const signupNickname = signupForm["signupNickname"]
const enterHang1 = document.querySelector("#enterHangar1")
const enterHang2 = document.querySelector("#enterHangar2")
const Settings = document.querySelector("#displaySettings")
const accSettings = document.querySelector("#userSettings")
const accountSettingsWindow = document.querySelector("#accountSettings")
export const settingsWindow = document.querySelector("#settings")
const clsAccSet = document.querySelector("#closeAccSettings")
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
export const hangLowPanel = document.querySelector("#hangarLowerPanel")
export const hangUpPanel = document.querySelector("#hangarUpperPanel")
export const hangUpBar = document.querySelector("#hangarUpperBar")
const settingsTabs = document.querySelectorAll(".settingsTab")
const showSettingsTabs = document.querySelectorAll(".showSettingsTab")
const interaction1 = document.querySelectorAll(".interaction1")
const interaction2 = document.querySelectorAll(".interaction2")
const interaction3 = document.querySelectorAll(".interaction3")
const allVehicles = document.querySelectorAll(".vehicle")
const specialSlot = document.querySelectorAll(".specialSlot")
const loginRows = document.querySelectorAll(".row")
const servers = document.querySelectorAll(".option")
const toggForms = document.querySelectorAll(".toggleForms")

// VARS

let loadingImg = Math.round(Math.random()*(42 - 1 + 1) + 1)
let gameVolume = gmVol.value/100
let loadingImage = "url("+"slides/"+loadingImg+".webp)"
let step = 150
let fullscreen = 0
let freeSltCount = 0
let slotsCost = 0
let valCredits = "1"
let tanksInGarage = 0
let tankQuantity = 0
let allowSoundMultiplier = 1
let creditsAmount = 1000000
let goldAmount = 0
let bondsAmount = 0
let freexpAmount = 0
let formSwitch = false
let accSetShow = false
export let inGame = false
let allowSoundactive = true
let server = null
let tankname = null
let gameVolumeCookies = null
let loadbarInterval = null
let nickname = null
let menuVisible = false
let submenuVisible = false
let vehicleGridMode
let mouseDown

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
        servers[1].classList.add("selected")
        setCookie("server", serverCookie, 365)
    } else*/ if (!serverCookie || serverCookie > 2 && serverCookie <2){
        server = "EU1"
        selHead.innerText = "WOT EU1"
        servers[2].classList.add("selected")
        setCookie("server", 2, 365)
    } else {
        selHead.innerText = "WOT EU"+(serverCookie-1)
        server = "WOT EU"+(serverCookie-1)
        servers[serverCookie].classList.add("selected")
        setCookie("server", serverCookie, 365)
    }
}

const checkVehicleGridMode = () => { //Checks if the vehicle selector is displayed as a grid/row (cookie "vehicleGridMode")
    vehicleGridMode = getCookie("vehicleGridMode")
    if (vehicleGridMode == 1){
        viewGridMode.classList.add("selected")
        vehicleScroller.style.opacity = "0"
        setTimeout(()=>{
            vehicleScroller.classList.add("gridView")
            step = 230
            vehicleScroller.style.opacity = "1"
        },400)
        vehicleGridMode = 1
        setCookie("vehicleGridMode", vehicleGridMode , 365)
    } else if (!vehicleGridMode || vehicleGridMode == 0){
        vehicleScroller.style.opacity = "0"
        viewGridMode.classList.remove("selected")
        setTimeout(()=>{
            vehicleScroller.classList.remove("gridView")
            step = 230
            vehicleScroller.style.opacity = "1"
        },400)
        vehicleGridMode = 0
        setCookie("vehicleGridMode", vehicleGridMode, 365)
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
    installVidPromo.volume = (gameVolume/5)
    gameVolumeCookies = gmVol.value
    hover1.volume = gameVolume
    hover2.volume = gameVolume
    click1.volume = gameVolume
    click2.volume = gameVolume
    click3.volume = gameVolume
    connectClick.volume = gameVolume
    connectHover.volume = gameVolume
    hangarAudio.volume = gameVolume
    loadingAmb.volume = gameVolume/4
    installVidPromo.volume = (gameVolume/5)
    setCookie("gameVolume", gameVolumeCookies, 365)
    setCookie("allowSound", allowSoundMultiplier, 365)
}

const checkSessions = () => { //Posts an message & disables user interaction when there are multiple instances of the browser tab with the game opened, displays an reload page button which disables the other instances of the game
    const channel = new BroadcastChannel("tab")
    channel.addEventListener('message', (event) => {
        switch (event.data) {
            case 'open-new-tab':
                fullscreenWarn.classList.remove("hidden")
                break;
            case 'tab-closing':
                fullscreenWarn.classList.add("hidden")
                break;
            default:
                break;
        }
    });
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            channel.postMessage('open-new-tab');
        }
    });
    window.addEventListener('beforeunload', () => {
        channel.postMessage('tab-closing');
    });
}

const toggleForms = () => { //Switches login/signup forms
    if (formSwitch == false){
        formSwitch = true
        logForm.classList.add("totallyHidden")
        signupForm.classList.remove("totallyHidden")
    } else {
        formSwitch = false
        signupForm.classList.add("totallyHidden")
        loginForm.classList.remove("totallyHidden")
    }
    for (var i=0; i<loginRows.length; i++){
        loginRows[i].classList.remove("hide")
    }
}

const loadingImgDesc = () => { //Sets corresponding title for the image on the loading screen after logging in and clicking "Continue" (The button "Continue" displays the hangar to the user)
    switch(loadingImg){
        case 1:
            imgName.innerText = "Panhard EBR 105"
            break
        case 2:
            imgName.innerText = "Objekt 705 A"
            break
        case 3:
            imgName.innerText = "Objekt 140"
            break
        case 4:
            imgName.innerText = "Chieftain/T95"
            break
        case 5:
            imgName.innerText = "Panzer 58"
            break
        case 6:
            imgName.innerText = "Konfrontace"
            break
        case 7:
            imgName.innerText = "Strážci"
            break
        case 8:
            imgName.innerText = "Strv S1"
            break
        case 9:
            imgName.innerText = "IS-7"
            break
        case 10:
            imgName.innerText = "Batignolles-Châtillon 25t"
            break
        case 11:
            imgName.innerText = "Objekt 277"
            break
        case 12:
            imgName.innerText = ""
            break
        case 13:
            imgName.innerText = "Panhard EBR 75 (FL10)"
            break
        case 14:
            imgName.innerText = "Ferdinand"
            break
        case 15:
            imgName.innerText = "Progetto 46"
            break
        case 16:
            imgName.innerText = "AMX 30 B"
            break
        case 17:
            imgName.innerText = "Panzer III. E"
            break
        case 18:
            imgName.innerText = "SU-85"
            break
        case 19:
            imgName.innerText = "Leopard 1"
            break
        case 20:
            imgName.innerText = "Panhard EBR 75 (FL10)"
            break
        case 21:
            imgName.innerText = "SU-130PM"
            break
        case 22:
            imgName.innerText = "STB-1"
            break
        case 23:
            imgName.innerText = "Kampfpanzer 07 RH"
            break
        case 24:
            imgName.innerText = "M3 Lee"
            break
        case 25:
            imgName.innerText = "M48 Patton"
            break
        case 26:
            imgName.innerText = "IS-4"
            break
        case 27:
            imgName.innerText = "Objekt 257"
            break
        case 28:
            imgName.innerText = "Panther"
            break
        case 29:
            imgName.innerText = "Bohové války"
            break
        case 30:
            imgName.innerText = "M4A3E8 Fury"
            break
        case 31:
            imgName.innerText = "Tiger I"
            break
        case 32:
            imgName.innerText = "M4A1 Sherman"
            break
        case 33:
            imgName.innerText = "Matilda"
            break
        case 34:
            imgName.innerText = "Spähpanzer Ru 251"
            break
        case 35:
            imgName.innerText = "TS-5"
            break
        case 36:
            imgName.innerText = "T-54"
            break
        case 37:
            imgName.innerText = "GSOR 1008"
            break
        case 38:
            imgName.innerText = "Matilda"
            break
        case 39:
            imgName.innerText = ""
            break
        case 40:
            imgName.innerText = "Caernarvon Action X"
            break
        case 41:
            imgName.innerText = "Kampfpanzer 07 RH"
            break
        case 42:
            imgName.innerText = "BT-7"
            break
        case 43:
            imgName.innerText = "Batignolles-Châtillon Bourrasque"
            break
    }
}

const setConnectLoader = () => { //Shows progressbar on the loading screen after logging in and clicking "Continue" (The button "Continue" displays the hangar to the user)
    loginLoad.classList.remove("hidden")
    loadProgBar.classList.add("progress")
    about.classList.add("hidden")
    logForm.classList.add("hidden")
}

export const hideForms = () => { //Hides login/signup form after logging in/signup and clicking "Continue", then initializes the renderer (renderer gets reinitialized every time user clicks the "Continue" button)
    initializeRender()
    document.body.style.cursor = "none"
    inGame = true
    signupForm.classList.add("totallyHidden")
    loginForm.classList.add("totallyHidden")
    loginLoad.classList.remove("hidden")
    loadProgBar.classList.add("progress")
    about.classList.add("hidden")
    hangar.classList.remove("hidden")
    hangar.style.opacity = "0"
    hangar.style.zIndex = "auto"
    hangar.style.display = "flex"
}

const validEmail = (email) => { //Email validity check regex filter
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const validPassword = (password) => { //Password validity check regex filter
    let hasLowercase = /[a-z]/.test(password)
    let hasUppercase = /[A-Z]/.test(password)
    let hasNumber = /\d/.test(password)
    return password.length >= 8 && hasLowercase && hasUppercase && hasNumber
}

const validNickname = (nickname) => { //Nickname validity check regex filter
    const nicknameRegex = /^[a-zA-Z0-9_]{3,}$/
    return nicknameRegex.test(nickname)
}

export const loadHangar = () => { //Loads hangar audio and displays loaded hangar interface
    hangarAudio.play()
    hangarAudio.addEventListener("ended",()=>{hangarAudio.play()})
    document.body.style.cursor = "url(cursors/wot_arrow.cur), default"
    hangar.style.opacity = "1"
    hangar.style.zIndex = "auto"
    loginLoad.classList.add("hidden")
    loadProgBar.style.width = "0%"
    about.classList.remove("hidden")
    setTimeout(() => {
        logForm.classList.remove("totallyHidden")
    },2000)
}

const scrollVehicles = (e) => { //Adds horizontal scrolling to the vehicle selector, value of variable "step" depends on whether the vehicle selector is displayed as a grid/row
    if (e.deltaY > 0){
        vehicleScroller.scrollLeft += step
        vehicleContainer.scrollLeft += step
    } else {
        vehicleScroller.scrollLeft -= step
        vehicleContainer.scrollLeft -= step
    }
}

const scrollSettingsBar = (e) => { //Adds horizontal scrolling to the game settings menu selector (Graphics, Sound, etc.) when the width of the menu selector is higher than device screen width
    if (e.deltaY > 0){
        setBar.scrollLeft += 100
    } else {
        setBar.scrollLeft -= 100
    }
}

const startDraggingVehicleSelect = () => { //Initiates dragging of the vehicle selector
    mouseDown = true
    vehicleScroller.style.scrollBehavior = "auto"
}

const stopDraggingVehicleSelect = () => { //Stops dragging of the vehicle selector
    mouseDown = false
    vehicleScroller.classList.remove("grabbing")
    vehicleScroller.style.scrollBehavior = "smooth"
}

const dragVehicleSelect = (e) => { //Allows user to drag the vehicle selector
    if (mouseDown){
        vehicleScroller.scrollLeft -= e.movementX
        vehicleScroller.classList.add("grabbing")
    }
}

const showAccountSettings = () => {accountSettingsWindow.classList.remove("hidden")} //Shows the account settings window

const hideAccountSettings = () => {accountSettingsWindow.classList.add("hidden")} //Hides the account settings window

const showSettings = () => { //Shows the game settings window
    submenuVisible = true
    menuVisible = false
    settingsWindow.classList.remove("hidden")
    hangMenu.classList.toggle("hidden")
}

const hideSettings = () => { //Hides the game settings window and resets the active menu back to "General"
    submenuVisible = false
    menuVisible = false
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

const selectTank = (selected) => { //Adds the yellow frame to the selected tank slot
    const tankSlots = document.querySelectorAll('.vehicle')
    tankSlots.forEach(tankSlot => {
        if (tankSlot === selected) {
            tankSlot.classList.add('selected')
        } else {
            tankSlot.classList.remove('selected')
        }
    })
}

const gameLoadAnimation = () => { //Game loading animation after clicking "Play" button (The button was added because of an feature on Chrome and other modern browser that blocks audio/video playing before the user has clicked on the page, only in PWA it can play immediatelly without having to click anything)
    connectClick.play()
    startgm.classList.add("hidden")
    setTimeout(()=>{
        loadPart1.classList.remove("hidden")
        setTimeout(()=>{
            setTimeout(()=>{
                setTimeout(()=>{
                    loadPart1.classList.add("hidden")
                    setTimeout(()=>{
                        loadPart1.style.display = "none"
                        loadPart2.classList.remove("hidden")
                        setTimeout(()=>{
                            initial.classList.add("hidden")
                            loadProg.classList.remove("hidden")
                        },5000)
                    },1000)
                },5000)
            },1000)
        },5000)
    },1000)
}

const showInstallPrompt = () => { //Adds the whole "Install game" (to install an PWA version of this game on a computer) functionality, but you can add the PWA game using built-in browser "download application" button
    hangarAudio.pause()
    submenuVisible = true
    menuVisible = true
    document.querySelector("#installPrompt").classList.remove("hidden")
    installVidPromo.play()
    document.querySelector("#dismissInstall").addEventListener("click",()=>{
        submenuVisible = false
        submenuVisible = true
        installVidPromo.pause()
        hangarAudio.play()
        setTimeout(()=>{installVidPromo.currentTime = 0},700)
        document.querySelector("#installPrompt").style.zIndex = "10001"
        document.querySelector("#installPrompt").classList.add("hidden")
        setTimeout(()=>{
            document.querySelector("#aboutGame").style.transform = "translateX(-330px)"
            document.querySelector("#installInfoButton").classList.remove("hidden")
        },700)
    })
    document.querySelector("#installInfoButton").addEventListener("click",()=>{
        document.querySelector("#aboutGame").style.transform = "translateX(0px)"
        document.querySelector("#installInfoButton").classList.add("hidden")
    })
    document.querySelector("#closeInstallInfo").addEventListener("click",()=>{
        document.querySelector("#aboutGame").style.transform = "translateX(-330px)"
        document.querySelector("#installInfoButton").classList.remove("hidden")
    })
    //const installButton = document.querySelector('#install-button')
    /*installButton.addEventListener("click", () => { //Custom install prompt function (Under developement)
        click2.play()
        deferredPrompt.prompt()
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt')
            } else {
                console.log('User dismissed the install prompt')
            }
            document.body.removeChild(installPrompt)
        })
    })*/
}

const gameLoad = () => { //Main function initializing the game loading functions
    checkSessions() //Game instance check
    checkServerCookie() //Server cookie check
    checkVolumeCookie() //Volume cookie check
    checkVehicleGridMode() //Vehicle selector display mode cookie check
    loadingImgDesc() //Loading image text assigner
    loadProg.style.backgroundImage = loadingImage
    vehicleContainer.style.width = window.innerWidth - 140+"px"
    setInterval(()=>{
        if (creditsAmount < 250000){
            buySlots.classList.add("unavailable")
            buySlots.style.color = "#fff"
            valCredits = "0"
        } else {
            buySlots.classList.remove("unavailable")
            buySlots.style.color = "#fff"
            valCredits = "1"
        }
    }, 100)
    CreditsQuantity.innerText = creditsAmount
    window.addEventListener("resize",()=>{
        vehicleContainer.style.width = window.innerWidth - 140+"px"
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

signupEmail.addEventListener("input",function(){
    if (validEmail(this.value)){
        this.classList.remove("invalid")
        this.classList.add("valid")
    } else if (this.value == ""){
        this.classList.remove("invalid")
        this.classList.remove("valid")
    } else {
        this.classList.remove("valid")
        this.classList.add("invalid")
    }
})

signupPassword.addEventListener("input",function(){
    if (validPassword(this.value)){
        this.classList.remove("invalid")
        this.classList.add("valid")
    } else if (this.value == ""){
        this.classList.remove("invalid")
        this.classList.remove("valid")
    } else {
        this.classList.remove("valid")
        this.classList.add("invalid")
    }
})

signupPasswordConfirm.addEventListener("input",function(){
    if (this.value == ""){
        this.classList.remove("invalid")
        this.classList.remove("valid")
    } else if (this.value === signupPassword.value && this.value.length >= 8){
        this.classList.remove("invalid")
        this.classList.add("valid")
    } else {
        this.classList.remove("valid")
        this.classList.add("invalid")
    }
})

signupNickname.addEventListener("input",function(){
    if (validNickname(this.value)){
        this.classList.remove("invalid")
        this.classList.add("valid")
    } else if (this.value == ""){
        this.classList.remove("invalid")
        this.classList.remove("valid")
    } else {
        this.classList.remove("valid")
        this.classList.add("invalid")
    }
})

document.addEventListener("DOMContentLoaded", gameLoad)

gmVol.addEventListener("change", volumeChanger)
gmVol.addEventListener("input", volumeChanger)

servers[1].addEventListener("click",()=>{selectServer("Auto", 1)})
servers[2].addEventListener("click",()=>{selectServer("EU1", 2)})
servers[3].addEventListener("click",()=>{selectServer("EU2", 3)})
servers[4].addEventListener("click",()=>{selectServer("EU3", 4)})
servers[5].addEventListener("click",()=>{selectServer("EU4", 5)})

toggForms[0].addEventListener("click", toggleForms)
toggForms[1].addEventListener("click", toggleForms)

document.addEventListener("contextmenu",(e)=>{e.preventDefault()})

accSettings.addEventListener("click", showAccountSettings)
Settings.addEventListener("click", showSettings)
clsSettings.addEventListener("click", hideSettings)
clsAccSet.addEventListener("click", hideAccountSettings)

viewGridMode.addEventListener("click",()=>{
    if (vehicleGridMode == 0){
        viewGridMode.classList.add("selected")
        setTimeout(()=>{
            vehicleScroller.classList.add("gridView")
            step = 230
        },100)
        vehicleGridMode = 1
        setCookie("vehicleGridMode", vehicleGridMode, 365)
    } else {
        viewGridMode.classList.remove("selected")
        step = 150
        setTimeout(()=>{
            vehicleScroller.classList.remove("gridView")
        },100)
        vehicleGridMode = 0
        setCookie("vehicleGridMode", vehicleGridMode, 365)
    }
})

startup.addEventListener("mouseenter",()=>{connectHover.play()})
startup.addEventListener("click", gameLoadAnimation)

scrRight.addEventListener("click",()=>{vehicleScroller.scrollLeft += step})
scrLeft.addEventListener("click",()=>{vehicleScroller.scrollLeft -= step})

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

toggleVehicleSelect.addEventListener("click",()=>{
    hangBottom.classList.toggle("minimized")
    toggleVehicleSelect.classList.toggle("minimized")
    hangBottomUpper.classList.toggle("minimized")
    if (repairState.classList != "totallyHidden"){
        hangBottomUpper.classList.toggle("spec")
    }
})

openVehFilters.addEventListener("click",()=>{
    openVehFilters.classList.toggle("selected")
    vehFilters.classList.toggle("hidden")
    if (window.innerHeight < 680){
        hangBottom.classList.toggle("minimized")
        toggleVehicleSelect.classList.toggle("minimized")
        hangBottomUpper.classList.toggle("minimized")
        if (repairState.classList != "totallyHidden"){
            hangBottomUpper.classList.toggle("spec")
        }
    }
})

clsVehFilters.addEventListener("click",()=>{
    vehFilters.classList.add("hidden")
    openVehFilters.classList.remove("selected")
    if (window.innerHeight < 680){
        hangBottom.classList.toggle("minimized")
        toggleVehicleSelect.classList.toggle("minimized")
        hangBottomUpper.classList.toggle("minimized")
        if (repairState.classList != "totallyHidden"){
            hangBottomUpper.classList.toggle("spec")
        }
    }
})

setBar.addEventListener("wheel", scrollSettingsBar, {passive:true})
vehicleSelect.addEventListener('wheel', scrollVehicles, {passive:true})
vehicleScroller.addEventListener('mousedown', startDraggingVehicleSelect)
hangar.addEventListener('mouseup', stopDraggingVehicleSelect)
hangar.addEventListener('mousemove', dragVehicleSelect, {passive:true})

window.addEventListener("offline",() => window.location.assign("/offline"))

document.addEventListener("keydown",(e)=>{
    if (submenuVisible == true){
        hangMenu.classList.add("hidden")
    } else if (e.code == "Escape" && inGame == true && menuVisible == false){
        hangMenu.classList.remove("hidden")
        menuVisible = true
    } else if (e.code == "Escape" && inGame == true && menuVisible == true){
        hangMenu.classList.add("hidden")
        menuVisible = false
    } 
})

hangMenuBt.addEventListener("click",()=>{
    menuVisible = true
    hangMenu.classList.remove("hidden")
    backToHang.addEventListener("click",()=>{hangMenu.classList.add("hidden");submenuVisible = false;menuVisible = false})
    instGame.addEventListener("click",()=>{showInstallPrompt()})
    disconnectSrv.addEventListener("click",()=>{
        submenuVisible = true
        hangMenu.classList.add("hidden")
        confDisconnect.classList.remove("hidden")
        disconnectSrvY.addEventListener("click",()=>{
            loadingImage = null
            loadingImg = Math.round(Math.random()*(42 - 1 + 1) + 1)
            loadingImage = "url("+"slides/"+loadingImg+".webp)"
            loadProg.style.backgroundImage = loadingImage
            loadingImgDesc()
            hangMenu.classList.add("hidden")
            hangarAudio.pause()
            hangarAudio.currentTime = 0
            topBar.classList.remove("hidden")
            logForm.classList.remove("totallyHidden")
            signupForm.classList.add("totallyHidden")
            setTimeout(()=>{
                hangar.classList.add("hidden")
                hangar.style.display = "none"
                garageRenderer.domElement.remove()
                garageScene.rotation.x = 0
                garageScene.rotation.y = 0
                garageCamera.position.z = 3
                garageScene.dispose()
                inGame = false
            },700)
            confDisconnect.classList.add("hidden")
            menuVisible = false
            submenuVisible = false
        })
        disconnectSrvN.addEventListener("click",()=>{
            hangMenu.classList.remove("hidden")
            confDisconnect.classList.add("hidden")
            submenuVisible = false
        })
    })
})

loadProg.addEventListener("click",(e)=>{
    logForm.scrollTop = 0
    if (!selHead.contains(e.target)){
        serverSel.classList.remove("opened")
        logForm.classList.remove("opened")
        loginRows[1].classList.remove("hide")
        loginRows[2].classList.remove("hide")
    } else if(selHead.contains(e.target)){
        serverSel.classList.toggle("opened")
        logForm.classList.toggle("opened")
        loginRows[1].classList.toggle("hide")
        loginRows[2].classList.toggle("hide")
    }
})

// FOR LOOPS FOR INTERACTION SOUND (clicking, etc..)

for (var i=0; i<interaction2.length; i++){
    interaction2[i].addEventListener("mouseover",()=>{hover2.play()})
    interaction2[i].addEventListener("click",()=>{click2.play()})
}

for (var i=0; i<interaction3.length; i++){
    interaction3[i].addEventListener("click",()=>{click3.play()})
}

for (var i=0; i<interaction1.length; i++){
    interaction1[i].addEventListener("mouseover",()=>{hover2.play()})
    interaction1[i].addEventListener("click",()=>{click3.play()})
}

// OTHER

//if ("serviceWorker" in navigator) { //adds a service worker
//    window.addEventListener('load',()=>{
//        navigator.serviceWorker.register('/src/service-worker.js')
//        .then((registration) => {
//            console.log('Service worker registered', registration)
//        })
//        .catch((error) => {
//            console.log('Service worker registration failed', error)
//        })
//    })
//}

if (!navigator.onLine){
    window.location.assign("/offline")
}

//TODO Potřebuje ještě přepsat!!!!

buySlots.addEventListener("click",()=>{ //TODO: Potřebuje přepsat
    if (valCredits == "1"){
        slotsCost = buySlotQuantity.value*250000
        buySlotQuantity.focus()
        buySlotMenu.classList.remove("hidden")
        buySlots.title = "Nedostatek kreditů."
    } else {
        buySlotMenu.classList.add("hidden")
        buySlots.title = ""
    }
    if (creditsAmount < slotsCost){
        buySlot.classList.add("unavailable")
        buySlotCost.style.color = "#ff0800"
        buySlotQuantity.focus()
    } else {
        buySlot.classList.remove("unavailable")
        buySlotCost.style.color = "#fff"
    }
    buySlotQuantity.addEventListener("input",()=>{
        slotsCost = buySlotQuantity.value*250000
        buySlotCost.innerText = slotsCost
        buySlotQuantity.value = Math.round(buySlotQuantity.value)
        if (creditsAmount < slotsCost){
            buySlot.classList.add("unavailable")
            buySlotCost.style.color = "#ff0800"
            buySlotQuantity.focus()
        } else {
            buySlot.classList.remove("unavailable")
            buySlotCost.style.color = "#fff"
        }
        if (buySlotQuantity.value < 1){
            buySlotQuantity.value = ""
            buySlotCost.innerText = "Zadej počet kusů"
            buySlotQuantity.focus()
            buySlot.classList.add("unavailable")
            buySlotCost.style.color = "#ff0800"
        } else {
            buySlot.classList.remove("unavailable")
            buySlotCost.style.color = "#fff"
            if (creditsAmount < slotsCost){
                buySlot.classList.add("unavailable")
                buySlotCost.style.color = "#ff0800"
                buySlotQuantity.focus()
            } else {
                buySlot.classList.remove("unavailable")
                buySlotCost.style.color = "#fff"
            }
        }
    })
    buySlot.addEventListener("click",()=>{
        if (creditsAmount > slotsCost-1){
            creditsAmount -= slotsCost
            CreditsQuantity.innerText = creditsAmount
            freeSltCount += (buySlotQuantity.value*10)/10
            slotsCost = 0
            buySlotQuantity.value = 0
            if (freeSltCount == 1){
                freeSltCnt.innerText = freeSltCount+" volné místo"
            } else if (freeSltCount > 1 && freeSltCount < 5){
                freeSltCnt.innerText = freeSltCount+" volné místa"
            } else {
                freeSltCnt.innerText = freeSltCount+" volných míst"
            }
            if (buySlotCost.innerText != "Zadej počet kusů"){
                buySlotMenu.classList.add("hidden")
                setTimeout(()=>{
                    buySlotQuantity.value = 1
                    slotsCost = buySlotQuantity.value*250000
                    buySlotCost.innerText = slotsCost
                },500)
            } else {
                buySlotMenu.classList.remove("hidden")
            }
        } else {
            buySlotQuantity.value = 1
            slotsCost = buySlotQuantity.value*250000
            buySlotCost.innerText = slotsCost
            buySlot.classList.remove("unavailable")
            buySlotCost.style.color = "#fff"
            if (creditsAmount < 250000){
                buySlot.classList.add("unavailable")
                buySlotQuantity.focus()
                buySlotCost.style.color = "#ff0800"
            }
        }
    })
})

function selectServer(serverName, serverNumber){ //Custom server selection element core function for setting the cookie "server" and displaying the selected option //TODO: Potřebuje přepsat
    if (serverName == "Auto"){
        server = serverName
        selHead.innerText = server
        console.log("Automatický výběr serveru")
        serverSel.classList.remove("opened")
        logForm.classList.remove("opened")
        for (var i=0; i<loginRows.length; i++){
            loginRows[i].classList.remove("hide")
        }
        loginRows[0].classList.remove("hide")
        loginRows[3].classList.remove("hide")
        setCookie("server", 1, 365)
        for (var i=0; i<servers.length; i++){
            servers[i].classList.remove("selected")
        }
        servers[serverNumber].classList.add("selected")
    } else {
        server = "WOT "+serverName
        console.log("Vybrán server: "+server)
        serverSel.classList.remove("opened")
        logForm.classList.remove("opened")
        selHead.innerText = server
        setCookie("server", serverNumber, 365)
        loginRows[0].classList.remove("hide")
        loginRows[3].classList.remove("hide")
        for (var i=0; i<servers.length; i++){
            servers[i].classList.remove("selected")
        }
        servers[serverNumber].classList.add("selected")
    }
}