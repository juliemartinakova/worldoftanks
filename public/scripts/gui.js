import { VehicleLoader, scene, shadowGenerator } from "./hangar_graphics.js"

//* audio

const hover0 = new Audio("assets/media/audio/hover0.wav")
const hover1 = new Audio("assets/media/audio/hover1.wav")
const hover2 = new Audio("assets/media/audio/hover2.wav")
const click0 = new Audio("assets/media/audio/click0.wav")
const click1 = new Audio("assets/media/audio/click1.wav")
const click2 = new Audio("assets/media/audio/click2.wav")

//* selectors

const screens = document.querySelectorAll(".screen")
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
const debugCommandList = document.querySelector("#command-list")
const about = document.querySelector(".info .about")
const info = document.querySelector(".info")
const languageButtons = document.querySelectorAll(".language-button")
const tooltips = document.querySelectorAll("[data-tooltip]")
const enterGame = document.querySelector(".enter-game")
const windows = document.querySelectorAll(".window")
const windowBarButtons = document.querySelectorAll(".window .bar button")
const modstoreMods = document.querySelectorAll(".modstore .modifications .modification")
const modmanagerMods = document.querySelectorAll(".modstore .modmanager .modification")
const selectFormElements = document.querySelectorAll("select")
const selectCustomElements = document.querySelectorAll(".select")
const devbypassHangar = document.querySelector(".devbypass-hangar")

//* variables

const closeChars = new Map([
    ['{','}'],
    ['[',']'],
    ['(',')'],
    ["\'","\'"],
    ["\"","\""],
    ["\`","\`"],
    ["<",">"]
]);

let gameSettingsGeneral
let gameSettingsGraphics
let gameSettingsSound
let gameSettingsControls
let gameSettingsReticle
let gameSettingsMarkers
let gameSettingsNotifications

let step = 150
let creditsQuantity = 0
let goldQuantity = 0
let freeXPQuantity = 0
let bondQuantity = 0
let background = ""
let languageObject = {}
let command
let languageButtonsShown = false
let loggedUser = ""
let int = 0
let localizationElements = document.querySelectorAll("[data-locale]")

//* classes

class Game {
    constructor(){}
    getLocalStorage(key){ //Retrieves data from localStorage
        let storedItem = localStorage.getItem(key);
        return storedItem
    }
    setLocalStorage(key, value){ //Sets localStorage
        localStorage.setItem(key, value)
    }
    removeLocalStorage(key){
        localStorage.removeItem(key)
    }
    settings(category){
        switch(category){
            case "general":
                console.log("General")
                console.table(gameSettingsGeneral)
                return gameSettingsGeneral
            case "graphics":
                console.log("Graphics")
                console.table(gameSettingsGraphics)
                return gameSettingsGraphics
            case "sound":
                console.log("Sound")
                console.table(gameSettingsSound)
                return gameSettingsSound
            case "controls":
                console.log("Controls")
                console.table(gameSettingsControls)
                return gameSettingsControls
            case "reticle":
                console.log("Reticle")
                console.table(gameSettingsReticle)
                return gameSettingsReticle
            case "markers":
                console.log("Markers")
                console.table(gameSettingsMarkers)
                return gameSettingsMarkers
            case "notifications":
                console.log("Battle Notifications")
                console.table(gameSettingsNotifications)
                return gameSettingsNotifications
            default:
                console.log("World of Tanks Online 0.9.1 (WoT 1.24)")
                console.group("GAME SETTINGS")
                console.groupCollapsed("General")
                console.table(gameSettingsGeneral)
                console.groupEnd()
                console.groupCollapsed("Graphics")
                console.table(gameSettingsGraphics)
                console.groupEnd()
                console.groupCollapsed("Sound")
                console.table(gameSettingsSound)
                console.groupEnd()
                console.groupCollapsed("Controls")
                console.table(gameSettingsControls)
                console.groupEnd()
                console.groupCollapsed("Reticle")
                console.table(gameSettingsReticle)
                console.groupEnd()
                console.groupCollapsed("Markers")
                console.table(gameSettingsMarkers)
                console.groupEnd()
                console.groupCollapsed("Battle Notifications")
                console.table(gameSettingsNotifications)
                console.groupEnd()
                console.groupEnd()
                return {gameSettingsGeneral, gameSettingsGraphics, gameSettingsSound, gameSettingsControls, gameSettingsReticle, gameSettingsMarkers, gameSettingsNotifications}
        }
    }
    randomInt(min, max, mode){
        let number = Math.random() * (max - min) + min
        switch(mode){
            case "round":
                number = Math.round(number)
                return number
            case "floor":
                number = Math.floor(number)
                return number
            case "ceil":
                number = Math.ceil(number)
                return number
            default:
                number = Math.round(number)
                return number
        }
    }
    evaluate(command){
        if(/[a-zA-Z]/.test(command)){
            const commandItem = document.createElement("li");
            let date = new Date().toLocaleString()
            const time = document.createElement("li")
            time.classList.add("time")
            time.innerText = date
            let special
            try {
                switch(command){
                    case "clear":
                        debugCommandList.innerHTML = ""
                        debugCommandList.appendChild(time)
                        special = document.createElement("li");
                        special.classList.add("special")
                        special.innerText = "Console has been cleared"
                        debugCommandList.appendChild(special)
                        break
                    case "reload":
                        window.location.reload()
                        break
                    case "eugh":
                        special = document.createElement("li");
                        debugCommandList.appendChild(time)
                        special.classList.add("special")
                        debugCommandList.appendChild(special)
                        special.innerHTML = `
                            BROTHER EUGH! :(
                            <br>
                            WHAT'S THAT??
                            <br>
                            WHAT'S THAT BROTHER!!!
                        `
                        break
                    case "wargaming.net":
                        special = document.createElement("li");
                        debugCommandList.appendChild(time)
                        special.classList.add("special")
                        debugCommandList.appendChild(special)
                        special.innerText = "Wargaming.net website has been opened in a new tab"
                        open("https://wargaming.net");
                        break
                    case "welcome":
                        special = document.createElement("li");
                        debugCommandList.appendChild(time)
                        special.classList.add("special")
                        debugCommandList.appendChild(special)
                        special.innerHTML = `
                            Welcome to the debug console!<br>For more information enter the command &quot;info&quot;
                        `
                        break
                    case "info":
                        special = document.createElement("li");
                        debugCommandList.appendChild(time)
                        special.classList.add("special")
                        debugCommandList.appendChild(special)
                        special.innerHTML = `
                            <div>
                                <img
                                    src="assets/gui/loading/login_logo_big.webp"
                                    alt="World of Tanks"
                                >
                                <h1>Info</h1>
                                <h2>World of Tanks Online 0.9.1 (WoT 1.24)</h2>
                                <br>
                                <p>This is debug console of the online game World of Tanks, especially for programmers allowing extended options within the game.</p>
                                <br>
                                <p>
                                    This is content for limited number of people, to access this feature you need the Debug API key, which you can get from me personally via sending me an email on juliemartinakova.wotonline@gmail.com. 
                                    NEVER SHARE your Debug API key with ANYONE!</p>
                                <br>
                                <p>Command List:</p>
                                <ul>
                                    <li>
                                        <code>clear</code>
                                        cleares console content
                                    </li>
                                    <li>
                                        <code>reload</code>
                                        restarts the game
                                    </li>
                                    <li>
                                        <code>info</code>
                                        shows this menu
                                    </li>
                                    <li>
                                        <code>welcome</code>
                                        shows welcome message
                                    </li>
                                    <li>
                                        <code>wargaming.net</code>
                                        opens Wargaming.net website
                                    </li>
                                    <li>
                                        <code>eugh</code>
                                        Brother Eugh meme :D
                                    </li>
                                </ul>
                            </div>
                        `
                        break
                    default:
                        debugCommandList.appendChild(time)
                        debugCommandList.appendChild(commandItem)
                        commandItem.innerText = command
                        let result = new Function(command)();
                        const returnItem = document.createElement("li");
                        returnItem.classList.add("return-value")
                        debugCommandList.appendChild(returnItem)
                        returnItem.innerText = result
                        break
                }
            } catch(err){
                let commandError = document.createElement("li")
                let errorCause
                try {
                    errorCause = err.stack.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(new RegExp(`${err.name}:`), "").replace(/\n/, "").replace(new RegExp(`${err.message}`), "").replace(/\s/, "");
                } catch(err){}
                commandError.classList.add("error")
                debugCommandList.appendChild(commandError)
                commandError.innerHTML = `
                    <div>
                        <b>
                            Uncaught exception (${err.name}): ${err.message}
                        </b>
                        <p>
                            ${errorCause}
                        </p>
                    </div>
                `
                commandError.style.color = "#ff0800"
            }
            debugCommandList.scrollTo(0, debugCommandList.scrollHeight)
        }
    }
}

class Settings extends Game {
    constructor(){
        super()
    }
    update(category){
        switch(category){
            case "general":
                this.setLocalStorage("gameSettingsGeneral", JSON.stringify(gameSettingsGeneral))
                break
            case "graphics":
                this.setLocalStorage("gameSettingsGraphics", JSON.stringify(gameSettingsGraphics))
                break
            case "sound":
                this.setLocalStorage("gameSettingsSound", JSON.stringify(gameSettingsSound))
                break
            case "controls":
                this.setLocalStorage("gameSettingsControls", JSON.stringify(gameSettingsControls))
                break
            case "reticle":
                this.setLocalStorage("gameSettingsReticle", JSON.stringify(gameSettingsReticle))
                break
            case "markers":
                this.setLocalStorage("gameSettingsMarkers", JSON.stringify(gameSettingsMarkers))
                break
            case "notifications":
                this.setLocalStorage("gameSettingsNotifications", JSON.stringify(gameSettingsNotifications))
                break
            default:
                this.setLocalStorage("gameSettingsGeneral", JSON.stringify(gameSettingsGeneral))
                this.setLocalStorage("gameSettingsGraphics", JSON.stringify(gameSettingsGraphics))
                this.setLocalStorage("gameSettingsSound", JSON.stringify(gameSettingsSound))
                this.setLocalStorage("gameSettingsControls", JSON.stringify(gameSettingsControls))
                this.setLocalStorage("gameSettingsReticle", JSON.stringify(gameSettingsReticle))
                this.setLocalStorage("gameSettingsMarkers", JSON.stringify(gameSettingsMarkers))
                this.setLocalStorage("gameSettingsNotifications", JSON.stringify(gameSettingsNotifications))
                break
        }
    }
    check(category){
        switch(category){
            case "general":
                gameSettingsGeneral = JSON.parse(this.getLocalStorage("gameSettingsGeneral"))
                return gameSettingsGeneral
            case "graphics":
                gameSettingsGraphics = JSON.parse(this.getLocalStorage("gameSettingsGraphics"))
                return gameSettingsGraphics
            case "sound":
                gameSettingsSound = JSON.parse(this.getLocalStorage("gameSettingsSound"))
                return gameSettingsSound
            case "controls":
                gameSettingsControls = JSON.parse(this.getLocalStorage("gameSettingsControls"))
                return gameSettingsControls
            case "reticle":
                gameSettingsReticle = JSON.parse(this.getLocalStorage("gameSettingsReticle"))
                return gameSettingsReticle
            case "markers":
                gameSettingsMarkers = JSON.parse(this.getLocalStorage("gameSettingsMarkers"))
                return gameSettingsMarkers
            case "notifications":
                gameSettingsNotifications = JSON.parse(this.getLocalStorage("gameSettingsNotifications"))
                return gameSettingsNotifications
            default:
                gameSettingsGeneral = JSON.parse(this.getLocalStorage("gameSettingsGeneral"))
                gameSettingsGraphics = JSON.parse(this.getLocalStorage("gameSettingsGraphics"))
                gameSettingsSound = JSON.parse(this.getLocalStorage("gameSettingsSound"))
                gameSettingsControls = JSON.parse(this.getLocalStorage("gameSettingsControls"))
                gameSettingsReticle = JSON.parse(this.getLocalStorage("gameSettingsReticle"))
                gameSettingsMarkers = JSON.parse(this.getLocalStorage("gameSettingsMarkers"))
                gameSettingsNotifications = JSON.parse(this.getLocalStorage("gameSettingsNotifications"))
                return {gameSettingsGeneral, gameSettingsGraphics, gameSettingsSound, gameSettingsControls, gameSettingsReticle, gameSettingsMarkers, gameSettingsNotifications}
        }
    }
    reset(category){
        switch(category){
            case "general":
                this.removeLocalStorage("gameSettingsGeneral")
                return "General settings have been reset to default values."
            case "graphics":
                this.removeLocalStorage("gameSettingsGraphics")
                return "Graphics settings have been reset to default values."
            case "sound":
                this.removeLocalStorage("gameSettingsSound")
                return "Sound settings have been reset to default values."
            case "controls":
                this.removeLocalStorage("gameSettingsControls")
                return "Controls settings have been reset to default values."
            case "reticle":
                this.removeLocalStorage("gameSettingsReticle")
                return "Reticle settings have been reset to default values."
            case "markers":
                this.removeLocalStorage("gameSettingsMarkers")
                return "Marker settings have been reset to default values."
            case "notifications":
                this.removeLocalStorage("gameSettingsNotifications")
                return "Battle notification settings have been reset to default values."
            default:
                this.removeLocalStorage("gameSettingsGeneral")
                this.removeLocalStorage("gameSettingsGraphics")
                this.removeLocalStorage("gameSettingsSound")
                this.removeLocalStorage("gameSettingsControls")
                this.removeLocalStorage("gameSettingsReticle")
                this.removeLocalStorage("gameSettingsMarkers")
                this.removeLocalStorage("gameSettingsNotifications")
                return "All settings have been reset to default values."
        }
    }
    change(category, path, value){ //* category and property arguments are strings, value can be integer, float, string and boolean
        let pathParts = path.split('.');
        let object
        let property
        switch(category){
            case "general":
                object = gameSettingsGeneral
                for (let i = 0; i < pathParts.length - 1; i++) {
                    const part = pathParts[i];
                    if (!object[part]) {
                        throw new Error(`Property '${part}' not found in object`);
                    }
                    object = object[part];
                }
                property = pathParts[pathParts.length - 1];
                object[property] = value;
                this.update("gameSettingsGeneral")
                return "settings.general." + path + " = " + value
            case "graphics":
                object = gameSettingsGraphics
                for (let i = 0; i < pathParts.length - 1; i++) {
                    const part = pathParts[i];
                    if (!object[part]) {
                        throw new Error(`Property '${part}' not found in object`);
                    }
                    object = object[part];
                }
                property = pathParts[pathParts.length - 1];
                object[property] = value;
                this.update("gameSettingsGraphics")
                return "settings.graphics." + path + " = " + value
            case "sound":
                object = gameSettingsSound
                for (let i = 0; i < pathParts.length - 1; i++) {
                    const part = pathParts[i];
                    if (!object[part]) {
                        throw new Error(`Property '${part}' not found in object`);
                    }
                    object = object[part];
                }
                property = pathParts[pathParts.length - 1];
                object[property] = value;
                this.update("gameSettingsSound")
                return "settings.sound."+ path + " = " + value
            case "controls":
                object = gameSettingsControls
                for (let i = 0; i < pathParts.length - 1; i++) {
                    const part = pathParts[i];
                    if (!object[part]) {
                        throw new Error(`Property '${part}' not found in object`);
                    }
                    object = object[part];
                }
                property = pathParts[pathParts.length - 1];
                object[property] = value;
                this.update("gameSettingsControls")
                return "settings.controls."+ path + " = " + value
            case "reticle":
                object = gameSettingsReticle
                for (let i = 0; i < pathParts.length - 1; i++) {
                    const part = pathParts[i];
                    if (!object[part]) {
                        throw new Error(`Property '${part}' not found in object`);
                    }
                    object = object[part];
                }
                property = pathParts[pathParts.length - 1];
                object[property] = value;
                this.update("gameSettingsReticle")
                return "settings.reticle."+ path + " = " + value
            case "markers":
                object = gameSettingsMarkers
                for (let i = 0; i < pathParts.length - 1; i++) {
                    const part = pathParts[i];
                    if (!object[part]) {
                        throw new Error(`Property '${part}' not found in object`);
                    }
                    object = object[part];
                }
                property = pathParts[pathParts.length - 1];
                object[property] = value;
                this.update("gameSettingsMarkers")
                return "settings.markers."+ path + " = " + value
            case "notifications":
                object = gameSettingsNotifications
                for (let i = 0; i < pathParts.length - 1; i++) {
                    const part = pathParts[i];
                    if (!object[part]) {
                        throw new Error(`Property '${part}' not found in object`);
                    }
                    object = object[part];
                }
                property = pathParts[pathParts.length - 1];
                object[property] = value
                this.update("gameSettingsNotifications")
                return "settings.notifications."+ path + " = " + value
            default:
                throw new ReferenceError("Missing category parameter value")
        }
    }
}

class Gui extends Game {
    constructor(){
        super()
    }
    background(){
        let url = "assets/gui/slides/" + this.randomInt(1,43) + ".webp"
        document.body.style.backgroundImage = `url(assets/gui/loading/vignette_loading.webp), url(${url})`
        setTimeout(()=>{
            landing.style.backgroundImage = `url(assets/gui/loading/vignette_loading.webp), url(${url})`
        },700)
        return url
    }
    changeLanguage(){
        localizationElements.forEach(element => {
            const path = element.getAttribute("data-locale")
            const pathParts = path.split(".")
            let currentValue = languageObject
            for (const segment of pathParts) {
                if (!currentValue || !currentValue[segment]) {
                    console.warn(`Translation key not found: ${path}`);
                    return;
                }
                currentValue = currentValue[segment];
            }
            if(window.location.search.match("debug=true")){
                element.innerHTML = path
            } else {
                element.innerHTML = currentValue
            }
        })
    }
}

Element.prototype.hide = function(){
    if(this.classList.contains("show-nospace")){
        this.classList.add("hidden-nospace")
    }
    this.classList.add("hidden")
}

Element.prototype.show = function(){
    if(this.classList.contains("hidden-nospace")){
        this.classList.add("show-nospace")
        this.classList.remove("hidden-nospace")
    }
    this.classList.remove("hidden")
}

Element.prototype.disable = function(){
    this.classList.add("disabled")
}

Element.prototype.enable = function(){
    this.classList.remove("disabled")
}

//! reserved class instantiantion variables, do not use these names for other variables!

export const game = new Game();
const settings = new Settings();
const gui = new Gui();

//* functions

const initGame = () => {
    gui.background()
    settings.check()
    if(!gameSettingsGeneral || gameSettingsGeneral == "" || !gameSettingsGraphics || gameSettingsGraphics == "" ||!gameSettingsSound || gameSettingsSound == "" || !gameSettingsControls || gameSettingsControls == "" || !gameSettingsReticle || gameSettingsReticle == "" || !gameSettingsMarkers || gameSettingsMarkers == "" || !gameSettingsNotifications || gameSettingsNotifications == ""){
        gameSettingsGeneral = {
            language: "en",
            server: 1,
            selectedVehicle: "",
            chat: {
                filterDirtyLanguage: 1,
                hideSpam: 1,
                showMessageDate: 1,
                showMessageTime: 1,
                receiveInvitationsFromFriendsOnly: 0,
                receiveInBattlePlatoonInvitation: 1,
                receiveFriendRequest: 1,
                receiveMessagesFromContactsOnly: 0,
                hideTeamChat: 0,
                receiveClanNotifications: 1
            },
            battleCommunication: {
                showPointMessagesInTeamPanel: 1,
                showPinned: 1,
                showPersonalCommands: 1,
                showBaseMarksInRandom: 1
            },
            randomBattleOptions: {
                standard: 1,
                encounter: 1,
                assault: 1,
                grand: 1,
                mapsInDevelopement: 1
            },
            vehiclePanel: {
                mode: 0,
                showStats: 1
            },
            customization: {
                mode: 0
            },
            battleInterface: {
                showVehicleTier: 1,
                showKilledEnemyDogtag: 1,
                showDestroyerDogtag: 1,
                showAppliedDogtag: 1,
                showAnimatedDogtag: 1,
                enableOpticalEffectsInSnipermode: 1,
                postmortemMode: 1,
                dynamicCamera: 1,
                smoothCameraZoom: 1,
                enableTacticalView: 1,
                enableCommanderView: 1,
                horizontalStabInSnipermode: 1,
                toogleExtraZoom: 1,
                limitViewModeSwitchtoShift: 0,
                autoFixHullInSnipermode: 0,
                useServerReticle: 0,
                prefferedSniperZoom: 0,
                showVehicleMarkerOnBattleResult: 1,
                showNoDamageNotification: 1,
                showWheeledSpeedometer: 1,
                showModuleRepairTime: 1,
                showPrevBattleResultInChat: 1,
                showHPInTeamPanel: 1,
                showHPOnMinimap: 1,
                extendedMinimapOptions: 0,
                showBeginnerTipsOnBattleLoading: 1,
                tipsOnBattleLoading: 1,
                showBeginnerTipsInRandom: 1,
                toogleEquipmentConfigOnBattleLoading: 1
            },
            minimap: {
                opacity: 1,
                showMarkers: 1,
                showCameraDirection: 1,
                showArtyShootingSector: 1,
                showProxyRange: 1,
                showViewRange: 1,
                showMaxViewRange: 1,
                showRenderRange: 1,
                showArtyShotPoints: 1
            },
            hangarCamera: {
                autoRotationDelay: 0,
                enableParallax: 1
            },
            saveReplays: undefined,
            showMOE: 1,
            showPlatoonVehicleModels: 1,
            showServerSelect: 1,
            useAnonymizer: 0
        }
        gameSettingsGraphics = {
            preset: 0,
            renderQuality: 100,
            fpsCap: Infinity,
            screen: {
                fov: 75,
                msaa: true,
                guiScale: 1,
                altColors: 0,
                gamma: 1,
                filter: {
                    contast: 1,
                    brightness: 1,
                    saturation: 1,
                    preset: 0
                }
            },
            details: {
                main: {
                    antialiasing: 0,
                    textureQuality: 0,
                    OBJLod: 0,
                    renderDistance: 0,
                },
                environment: {
                    waterQuality: 0,
                    terrainQuality: 0,
                    tesselation: 0,
                    snipermodeTesselation: 0
                },
                postprocessing: {
                    lightningQuality: 0,
                    shadowQuality: 0,
                    postProcessing: 0,
                    motionBlur: 0
                },
                vegetation: {
                    vegetationQuality: 0,
                    grassDensity: 0,
                    vegetationTransparency: 0,
                    snipermodeGrass: 0
                },
                effects: {
                    effectsQuality: 0,
                    snipermodeEffectsQuality: 0,
                    trackPhysics: 0,
                    betterPhysics: 0,
                    trackEffects: 0,
                    trackMarks: 0
                }
            }
        }
        gameSettingsSound = { //* the volume formula is: allowed * master/100 * interface (vehicles, effects, etc...)
            audio: {
                volume: {
                    allowed: 1,
                    master: 25,
                    interface: 100,
                    vehicles: 100,
                    voiceover: 100,
                    effects: 100,
                    environment: 100,
                    musicGarage: 100,
                    musicBattle: 100
                },
                presets: {
                    nightmode: 0,
                    bassBoost: 0,
                    subtitles: 0,
                    mode: 0,
                    system: 0
                },
                sounds: {
                    crew: 0,
                    sixthsense: 0,
                    soundDetection: undefined
                }
            },
            voice: {
                allowed: 0,
                volume: 100,
                environmentVolume: 100,
                shortcut: "keyQ"
            }
        }
        gameSettingsControls = {
            invertReverse: 0,
            keyboard: {
                driving: {
                    forward: "keyW",
                    reverse: "keyS",
                    left: "keyA",
                    right: "keyD",
                    fixHull: "keyX",
                    manualBreak: "Space"
                },
                speedControl: {
                    forward: "keyR",
                    reverse: "keyF",
                    stopAndShoot: undefined
                },
                shooting: {
                    shoot: 0,
                    salvo: 0,
                    autoaim: 2,
                    releaseAutoaim: 2,
                    specialReticle: "ShiftLeft",
                    trajectory: "keyG",
                    reloadMagazine: "keyC"
                },
                other: {
                    hideGui: "keyV",
                    missionProgress: "keyN",
                    leaveVehicle: "keyJ",
                    reserves: "keyB"
                },
                consumables: {
                    consumable1: "Digit1",
                    consumable2: "Digit2",
                    consumable3: "Digit3",
                    consumable4: "Digit4",
                    consumable5: "Digit5",
                    consumable6: "Digit6",
                    consumable7: "Digit7",
                    consumable8: "Digit8",
                    consumable9: "Digit9",
                    consumable10: "Digit0"
                },
                teamCommunication: {
                    markPosition: "keyT",
                    activeTarget: "F2",
                    commandMenu: "keyY",
                    help: "F7",
                    loading: "F8",
                    retreat: "F4",
                    affirmative: "F5",
                    negative: "F6",
                    thanks: "F3"
                },
                camera: {
                    up: "ArrowUp",
                    down: "ArrowDown",
                    left: "ArrowLeft",
                    right: "ArrowRight"
                },
                voice: {
                    activateMic: "keyQ",
                    toggleVoice: "keyH"
                },
                minimap: {
                    expand: "Minus",
                    shrink: "Equal",
                    toggle: "keyM"
                }
            },
            mouse: {
                sensitivity: {
                    arcade: 1,
                    sniper: 1,
                    artillery: 1,
                    trajectory: 1,
                    free: 1
                },
                invertHorizontal: 0,
                invertVertical: 0
            }
        }
        gameSettingsReticle = {
            arcade: {
                indicator: 0,
                indicatorOpacity: 1,
                centralMarker: 0,
                centralMarkerOpacity: 1,
                loadingOpacity: 1,
                stateOpacity: 1,
                aiming: 0,
                aimingOpacity: 1,
                aimingIndicator: 0,
                aimingIndicatorOpacity: 1,
                magazineOpacity: 1,
                loadingIndicatorOpacity: 1
            },
            sniper: {
                indicator: 0,
                indicatorOpacity: 1,
                centralMarker: 0,
                centralMarkerOpacity: 1,
                loadingOpacity: 1,
                stateOpacity: 1,
                aiming: 0,
                aimingOpacity: 1,
                aimingIndicator: 0,
                aimingIndicatorOpacity: 1,
                magazineOpacity: 1,
                loadingIndicatorOpacity: 1,
                zoomOpacity: 1
            },
            artillery: {
                showShellFlightTime: 1,
                zoomIndicator: 1,
                autoSwitchMode: 1,
                controlMode: 0,
                initialMode: 0
            },
            outline: {
                mode: 1,
                shootable: 0,
                unshootable: 0
            }
        }
        gameSettingsMarkers = {
            enemy: {
                normal: {
                    icon: 1,
                    tier: 1,
                    vehicle: 1,
                    nickname: 0,
                    hpIndicator: 1,
                    autoaimIndicator: 1,
                    vehicleHP: 2,
                    receivedDMG: 1
                },
                alt: {
                    icon: 1,
                    tier: 1,
                    vehicle: 1,
                    nickname: 1,
                    hpIndicator: 1,
                    autoaimIndicator: 1,
                    vehicleHP: 1,
                    receivedDMG: 1
                }
            },
            ally: {
                normal: {
                    icon: 1,
                    tier: 1,
                    vehicle: 1,
                    nickname: 0,
                    hpIndicator: 1,
                    vehicleHP: 2,
                    receivedDMG: 1
                },
                alt: {
                    icon: 1,
                    tier: 1,
                    vehicle: 1,
                    nickname: 1,
                    hpIndicator: 1,
                    vehicleHP: 1,
                    receivedDMG: 1
                }
            },
            destroyed: {
                normal: {
                    icon: 1,
                    tier: 1,
                    vehicle: 1,
                    nickname: 0,
                    hpIndicator: 1,
                    vehicleHP: 1,
                    receivedDMG: 1
                },
                alt: {
                    icon: 1,
                    tier: 1,
                    vehicle: 1,
                    nickname: 1,
                    hpIndicator: 1,
                    vehicleHP: 1,
                    receivedDMG: 1
                }
            }
        }
        gameSettingsNotifications = {
            fireDirection: {
                type: 0,
                showCriticalHits: 1,
                showTeamHits: 1,
                showDamage: 1,
                dynamicPointer: 1,
                shooterTankName: 1,
                animation: 1
            },
            events: {
                show: 1,
                eventName: 1,
                vehicle: 1,
                receivedDMG: {
                    damage: 1,
                    critical: 1,
                    blocked: 1,
                },
                battlePerformance: {
                    capPointsRemoved: 1,
                    capPointsCapped: 1,
                    spotting: 1,
                    ramming: 1,
                    destroyed: 1,
                    trackDestroyed: 1,
                    criticalHit: 1,
                    shootDamage: 1,
                    impactDamage: 1,
                    spottingDamage: 1,
                    stunningDamage: 1,
                    setonfire: 1,
                    crewSkills: 1
                }
            },
            record: {
                damage: {
                    showCaused: 1,
                    showBlocked: 1,
                    showAssisted: 1,
                    showStunned: 1
                },
                showDetails: 0,
                eventType: 0,
                positionMode: 0
            },
            mapBorders: {
                type: 0,
                highlight: 0
            },
            battleInfoAndMissions: {
                hpPanel: 1,
                hpQuantity: 1,
                hpDelta: 1,
                sortByTier: 0,
                showMissions: 1,
                missionDetails: 1
            }
        }
        settings.update()
    }
    game.settings()
    if(window.location.search.match("debug=true")){
        debugPrompt.show()
    } else {
        debugPrompt.remove()
    }
    loadLocales()
    setTimeout(() => {
        document.body.classList.add("loaded")
        setTimeout(()=>{
            screens[0].classList.add("loaded")
        }, 700)
    }, 1400)
    setInterval(()=>{
        gui.background()
    },30000)
    if(loggedUser == ""){
        enterGame.disable()
    }
}

const loadAnimation = () => {
    screens[0].hide()
    setTimeout(()=>{
        screens[1].show()
        setTimeout(()=>{
            screens[1].hide()
            setTimeout(()=>{
                screens[2].show()
                setTimeout(()=>{
                    screens[2].hide()
                    setTimeout(()=>{
                        landing.hide()
                        hangar.show()
                        setTimeout(()=>{
                            screens[0].show()
                            screens[2].hide()
                        }, 700)
                    }, 700)
                }, 5000)
            }, 700)
        }, 5000)
    }, 700)
}

const loadLocales = () => {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            languageObject = JSON.parse(this.responseText)
            gui.changeLanguage()
        }
    }
    xmlhttp.open("GET", `assets/data/locales/${gameSettingsGeneral.language}.json`, true)
    xmlhttp.send()
}

//* event listeners

debugCommand.addEventListener("input", (e)=>{
    const pos = e.target.selectionStart;
    const val = [...e.target.value];
    
    const char = val.slice(pos-1, pos)[0];
    const closeChar = closeChars.get(char);
    
    if (closeChar) {
        val.splice(pos, 0, closeChar);
        e.target.value = val.join('');
        e.target.selectionEnd = pos;
    } else if (Object.values(closeChars).includes(char)) {
        const openingChar = [...closeChars.entries()].find(([key, value]) => value === char)[0];
        const openingPos = val.lastIndexOf(openingChar, pos - 1);
        if (openingPos!== -1) {
            val.splice(openingPos, 1);
            val.splice(pos - 1, 1);
            e.target.value = val.join('');
            e.target.selectionEnd = openingPos;
        }
    }
})

debugPrompt.addEventListener("submit",()=>{
    click2.play()
})

about.addEventListener("click",(e)=>{
    info.classList.toggle("active")
    landing.classList.toggle("active")
    if(languageButtonsShown === false){
        languageButtonsShown = true
        languageButtons.forEach(lang => {
            lang.addEventListener("click",function(){
                settings.change("general", "language", this.value)
                info.classList.remove("active")
                landing.classList.remove("active")
                languageButtons.forEach(lang => {
                    if(lang.value != this.value){
                        lang.classList.remove("active")
                    }
                })
                this.classList.add("active")
                var xmlhttp = new XMLHttpRequest()
                xmlhttp.onreadystatechange = function(){
                    if (this.readyState == 4 && this.status == 200) {
                        languageObject = JSON.parse(this.responseText)
                        gui.changeLanguage()
                    }
                }
                xmlhttp.open("GET", `assets/data/locales/${this.value}.json`, true)
                xmlhttp.send()
            })
        })
    }
})

landing.addEventListener("click",(e)=>{
    if(!(info.contains(e.target))){
        info.classList.remove("active")
        landing.classList.remove("active")
    }
})

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
                        win.hide()
                    })
                    setTimeout(()=>{
                        openWindow.show()
                    }, 500)
                } else {
                    closeWindow.hide()
                    setTimeout(()=>{
                        openWindow.show()
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

selectFormElements.forEach(select => {
    const optgroups = document.querySelectorAll("select optgroup")
    const optgroupOptions = document.querySelectorAll("select optgroup option")
    const options = document.querySelectorAll("select > option")

    let selectElement = document.createElement("div")
    let selectElementHeader = document.createElement("div")
    let selectElementOptions = document.createElement("div")
    let selectElementOptionDisplay = document.createElement("p")
    let selectElementDropdownButton = document.createElement("button")

    selectElement.classList.add("select")
    selectElementHeader.classList.add("header")
    selectElementOptions.classList.add("options")
    selectElementDropdownButton.classList.add("interactive2")

    selectElement.appendChild(selectElementHeader)
    selectElement.appendChild(selectElementOptions)
    selectElementHeader.appendChild(selectElementOptionDisplay)
    selectElementHeader.appendChild(selectElementDropdownButton)
    select.parentNode.insertBefore(selectElement, select.nextSibling)

    selectElementOptionDisplay.dataset.locale = "form.select_default"
    
    selectElementDropdownButton.innerHTML = '<span class="material-symbols-rounded">arrow_drop_down</span>'
    
    selectElementHeader.addEventListener("click", ()=>{
        if(selectElement.classList.contains("active")){
            selectElement.classList.remove("active")
            selectElementDropdownButton.innerHTML = '<span class="material-symbols-rounded">arrow_drop_down</span>'
        } else {
            selectElement.classList.add("active")
            selectElementDropdownButton.innerHTML = '<span class="material-symbols-rounded">arrow_drop_up</span>'
        }
    })

    optgroups.forEach(optgroup => {
        let optgroupElement = document.createElement("div")
        let optgroupElementHeader = document.createElement("h4")

        optgroupElement.classList.add("optgroup")
        optgroupElementHeader.innerText = optgroup.getAttribute("label")

        optgroupElement.appendChild(optgroupElementHeader)
        selectElementOptions.appendChild(optgroupElement)

        optgroupOptions.forEach(optgroupOption => {
            let optgroupOptionElement = document.createElement("button")
            optgroupOptionElement.innerText = optgroupOption.innerText
            optgroupOptionElement.classList.add("option")
            optgroupElement.appendChild(optgroupOptionElement)

            optgroupOptionElement.addEventListener("click", ()=>{
                selectElementOptionDisplay.innerText = optgroupOptionElement.innerText
                selectElement.classList.remove("active")
            })
        })
    })

    options.forEach(option => {
        let optionElement = document.createElement("button")
        if (option.innerText != "" || option.innerText != null){
            optionElement.innerText = option.innerText
        } else {
            optionElement.setAttribute("data-locale") = option.getAttribute("data-locale")
        }
        optionElement.classList.add("option")
        selectElementOptions.appendChild(optionElement)

        optionElement.addEventListener("click", ()=>{
            selectElementOptionDisplay.innerText = optionElement.innerText
            selectElement.classList.remove("active")
        })
    })
    
    select.remove()
})

selectCustomElements.forEach(select => {
    let selectElementDropdownButton = select.querySelector(".select .header button")
    let selectElementOptions = select.querySelectorAll(".select .options .option")
    let selectElementHeader = select.querySelector(".select .header")

    selectElementHeader.addEventListener("click", ()=>{
        if(select.classList.contains("active")){
            select.classList.remove("active")
            selectElementDropdownButton.innerHTML = '<span class="material-symbols-rounded">arrow_drop_down</span>'
        } else {
            select.classList.add("active")
            selectElementDropdownButton.innerHTML = '<span class="material-symbols-rounded">arrow_drop_up</span>'
        }
    })

    selectElementOptions.forEach(option => {
        option.addEventListener("click", () => {
            select.classList.remove("active")
            selectElementDropdownButton.innerHTML = '<span class="material-symbols-rounded">arrow_drop_down</span>'
        })
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
        mod.hide()
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
        close.addEventListener("click",()=>win.hide())
    })
    showButton.forEach(button => {
        button.addEventListener("click",()=>win.show())
    })
})

enterGame.addEventListener("click", () => {
    if(loggedUser != ""){
        loadAnimation()
    }
})

devbypassHangar.addEventListener("click", ()=>{
    loggedUser = "WG_WOT_DEV_ACC"
    loadAnimation()
    //document.body.requestFullscreen()
    devbypassHangar.disable()
})

document.addEventListener("DOMContentLoaded", initGame)

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

localizationElements = document.querySelectorAll("[data-locale]")

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