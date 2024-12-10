import { localstorage_set, localstorage_get, localstorage_delete } from "../main/game_settings"

export let login_status = false
export let app_load_data = {}
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

if ((localstorage_get("app_load_data") != "" || localstorage_get("app_load_data"))&&(!load_data.includes("status"))){
    app_load_data = JSON.parse(localstorage_get("app_load_data"))
    console.log(app_load_data)
}