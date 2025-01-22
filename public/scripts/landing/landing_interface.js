import { landing, account_info_bg, wargaming_login, wargaming_logout, landing_nickname, screens, enter_lobby, hangar, landing_bar, show_landing_menu, landing_menu, show_modstore, show_settings, developer_mode, disable_mods, wargaming_addacc, wargaming_support, wargaming_manageacc, restore_settings, anonymous_mode, settings_window, modstore_window } from "../main/element_query.js"
import { math_randint } from "../main/math.js"
import { sec_to_ms } from "../main/math.js"
import { enable, disable, hide, show, loading_spinner_init } from "../main/custom_elements.js"
import { login_status, app_load_data } from "./authentication.js"
import { localstorage_delete, localstorage_set } from "../main/game_settings.js"
import { __JSON_REQUEST } from "../main/file_request.js"

function landing_change_background(element){
    const background_url = `./assets/gui/slides/${math_randint(1,43)}.webp`
    element.style.backgroundImage = `url(${background_url})`
}

if(app_load_data){
    async function _landing_gui_init(){
        hide(wargaming_login)
        show(wargaming_logout)
        show(wargaming_manageacc)
        enable(enter_lobby)
        disable(wargaming_login)
        enable(enter_lobby)
        landing_nickname.innerText = app_load_data.nickname
        landing_nickname.dataset.locale = null
        let user_data = await __JSON_REQUEST(`https://api.worldoftanks.eu/wot/account/info/?application_id=25bcedbb27d8357ac39a775c59eaefc6&account_id=${app_load_data.account_id}&access_token=${app_load_data.access_token}`)
    
        wargaming_manageacc.addEventListener("click",()=>window.open("https://eu.wargaming.net/personal/", "_blank"))
    }
    _landing_gui_init()
}

enter_lobby.addEventListener("click", ()=>hangar_init())

function hangar_init(){
    const account_id = app_load_data.account_id
    const username = app_load_data.nickname

    lobby_load_animation()
}

function lobby_load_animation(){
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

landing_change_background(landing)
landing_change_background(account_info_bg)
setInterval(()=>{
    landing_change_background(landing)
}, sec_to_ms(30))

wargaming_login.addEventListener("click",()=>{
    window.location.assign(`https://api.worldoftanks.eu/wot/auth/login/?application_id=25bcedbb27d8357ac39a775c59eaefc6&redirect_uri=${encodeURIComponent(window.location.origin)}`)
})

wargaming_logout.addEventListener("click",()=>{
    window.location.assign(window.location.origin+"/?logout")
})

show_landing_menu.addEventListener("click",()=>{
    show(landing_menu)
})

show_settings.forEach(element => {
    element.addEventListener("click", ()=>show(settings_window))
})

show_modstore.forEach(element => {
    element.addEventListener("click", ()=>show(modstore_window))
})

developer_mode.addEventListener("click",()=>window.location.assign(window.location.origin+"/?debug=true"))

anonymous_mode.addEventListener("click",()=>window.location.assign(window.location.origin+"/?anonymous=true"))

wargaming_support.addEventListener("click",()=>window.open("https://eu.wargaming.net/support/en/products/wot/", "_blank"))

disable_mods.addEventListener("click",()=>window.location.assign(window.location.origin+"/?mods_disabled=true"))

wargaming_addacc.addEventListener("click",()=>window.open("https://eu.wargaming.net/registration/", "_blank"))