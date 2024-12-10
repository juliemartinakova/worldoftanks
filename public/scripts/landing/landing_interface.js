import { landing, wargaming_login, wargaming_logout, landing_nickname } from "../main/element_query.js"
import { math_randint } from "../main/math.js"
import { sec_to_ms } from "../main/math.js"
import { enable, disable, hide, show } from "../main/custom_elements.js"
import { app_load_data, login_status } from "./authentication.js"
import { localstorage_delete } from "../main/game_settings.js"

function landing_change_background(element){
    const background_url = `assets/gui/slides/${math_randint(1,43)}.webp`
    element.style.backgroundImage = `url(${background_url})`
}

if(!login_status || !app_load_data){
    enable(wargaming_login)
}
if(app_load_data){
    hide(wargaming_login)
    show(wargaming_logout)
    landing_nickname.innerText = app_load_data.nickname
    landing_nickname.dataset.locale = null
}

function hangar_init(){
    return
}

landing_change_background(landing)
setInterval(()=>{
    landing_change_background(landing)
}, sec_to_ms(30))

wargaming_login.addEventListener("click",()=>{
    window.location.assign(`https://api.worldoftanks.eu/wot/auth/login/?application_id=25bcedbb27d8357ac39a775c59eaefc6&redirect_uri=localhost%3A1000`)
})

wargaming_logout.addEventListener("click",()=>{
    window.location.assign(`https://api.worldoftanks.eu/wot/auth/logout/?application_id=25bcedbb27d8357ac39a775c59eaefc6&access_token=${app_load_data.access_token}`)
    localstorage_delete("app_load_data")
})

console.log(app_load_data.nickname)
console.log(app_load_data.access_token)
//https%3A%2F%2Fworldoftanksonline.netlify.app