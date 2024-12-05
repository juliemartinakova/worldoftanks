import { landing } from "../main/element_query.js"
import { math_randint } from "../main/math.js"
import { sec_to_ms } from "../main/math.js"
import { current_username } from "./authentication.js"

function landing_change_background(element){
    const background_url = `assets/gui/slides/${math_randint(1,43)}.webp`
    element.style.backgroundImage = `url(${background_url})`
}

function hangar_init(){
    return
}

landing_change_background(landing)
setInterval(()=>{
    landing_change_background(landing)
}, sec_to_ms(30))