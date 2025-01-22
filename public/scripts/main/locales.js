import { __JSON_REQUEST } from "./file_request.js";
import { settings_get, localstorage_get, localstorage_set } from "./game_settings.js";
import { loading_spinner_init, loading_spinner_change, loading_spinner_reset } from "./custom_elements.js";

export async function setGameLanguage(language){
    document.body.classList.add("language-reload")
    loading_spinner_init("loader_text.language-reload")
    document.querySelectorAll("[data-locale]").forEach(element => {
        setTimeout(()=>{
            setTimeout(async ()=>{
                const path = element.getAttribute("data-locale")
                const pathParts = path.split(".")
                let currentValue = await __JSON_REQUEST(`./assets/data/locales/${language}.json`)
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
                loading_spinner_change("loader_text.language-apply")
                setTimeout(()=>{
                    document.body.classList.remove("language-reload")
                    loading_spinner_reset()
                }, 2000)
            },200)
        }, 700)
    })
}

setGameLanguage(settings_get("general.language"))