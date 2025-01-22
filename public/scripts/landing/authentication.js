import { __JSON_REQUEST } from "../main/file_request"
import { localstorage_set, localstorage_get, localstorage_delete } from "../main/game_settings"

export let login_status = false
export let logged_user = null
let unprocessed_app_load_data
let unprocessed_user_data
const load_data = document.location.search

if(load_data.includes("status")){

    let app_load_data_localstorage_save = {}
    
    const app_params = new URLSearchParams(load_data)

    for (const [key, value] of app_params.entries()) {
        app_load_data_localstorage_save[key] = value;
    }

    localstorage_set("app_load_data", JSON.stringify(app_load_data_localstorage_save))
    console.log(JSON.parse(localstorage_get("app_load_data")))

    window.location.assign(window.location.origin)

}

if (localstorage_get("app_load_data")&&(!load_data.includes("status"))){
    unprocessed_app_load_data = JSON.parse(localstorage_get("app_load_data"))
    login_status = true
}

export const app_load_data = unprocessed_app_load_data

if(window.location.search.match("logout")){    
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `https://api.worldoftanks.eu/wot/auth/logout/?application_id=25bcedbb27d8357ac39a775c59eaefc6&access_token=${app_load_data.access_token}`, true);
    xhttp.send(`application_id=25bcedbb27d8357ac39a775c59eaefc6&access_token=${app_load_data.access_token}`); 
    localstorage_delete("app_load_data")
    window.location.assign(window.location.origin)
}