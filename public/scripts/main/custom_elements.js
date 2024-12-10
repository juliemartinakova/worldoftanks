import { settings_get, settings_set, localstorage_get, localstorage_set } from "./game_settings.js"
import { setGameLanguage } from "./locales.js"
import { loading_spinner, loading_spinner_text, screens } from "./element_query.js"
import { __JSON_REQUEST } from "./file_request.js"

const selectFormElements = document.querySelectorAll("select")
const selectCustomElements = document.querySelectorAll(".select")
let languageButtons = document.querySelectorAll(".language-button")
let localizationElements = document.querySelectorAll("[data-locale]")


let logged_user = ""

export async function loading_spinner_init(locale_content_path){
    const spinner = loading_spinner
    const text = loading_spinner_text
    const text_content = locale_content_path.split(".")
    let loader_translation = await __JSON_REQUEST(`assets/data/locales/${settings_get("general.language")}.json`)

    for (const segment of text_content) {
        if (!loader_translation || !loader_translation[segment]) {
            console.warn(`Translation key not found: ${locale_content_path}`);
            return;
        }
        loader_translation = loader_translation[segment];
        if(window.location.search.match("debug=true")){
            text.innerHTML = locale_content_path
        } else {
            text.innerHTML = loader_translation
        }
    }

    show(spinner)
}

export async function loading_spinner_change(locale_content_path){
    const text = loading_spinner_text
    const text_content = locale_content_path.split(".")
    let loader_translation = await __JSON_REQUEST(`assets/data/locales/${settings_get("general.language")}.json`)

    for (const segment of text_content) {
        if (!loader_translation || !loader_translation[segment]) {
            console.warn(`Translation key not found: ${locale_content_path}`);
            return;
        }
        loader_translation = loader_translation[segment];
        if(window.location.search.match("debug=true")){
            text.innerHTML = locale_content_path
        } else {
            text.innerHTML = loader_translation
        }
    }
}

export function loading_spinner_reset(){
    const spinner = loading_spinner
    const text = loading_spinner_text

    hide(spinner)
    setTimeout(() => {
        text.innerHTML = ""
    }, 200);
}

loading_spinner_init("loader_text.game-loading")

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
    select.remove()

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
        if (option.getAttribute("data-locale") != "" || option.getAttribute("data-locale") != null){
            optionElement.setAttribute("data-locale", option.getAttribute("data-locale"))
            localizationElements = document.querySelectorAll("[data-locale]")
        } else {
            optionElement.innerText = option.innerText
        }
        optionElement.className = option.className
        optionElement.setAttribute("value", option.value)
        optionElement.innerText = option.innerText
        optionElement.classList.add("option")
        selectElementOptions.appendChild(optionElement)

        if(optionElement.classList.contains("language-button")){
            languageButtons = document.querySelectorAll(".language-button")
        }

        optionElement.addEventListener("click", ()=>{
            selectElementOptionDisplay.innerText = optionElement.innerText
            selectElement.classList.remove("active")

            if(optionElement.classList.contains("language-button")){
                settings_set("general.language", optionElement.value)
                setGameLanguage(settings_get("general.language"))
            }
        })
    })
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

export function hide(element){
    if(element.classList.contains("show-nospace")){
        element.classList.add("hidden-nospace")
    } else {
        element.classList.add("hidden")
    }
}

export function show(element){
    if(element.classList.contains("hidden-nospace")){
        element.classList.add("show-nospace")
        element.classList.remove("hidden-nospace")
    } else {
        element.classList.remove("hidden")
    }
}

export function disable(element){
    element.classList.add("disabled")
}

export function enable(element){
    element.classList.remove("disabled")
}

function init_game(){
    setTimeout(() => {
        document.body.classList.add("loaded")
        setTimeout(()=>{
            screens[0].classList.add("loaded")
        }, 700)
    }, 1400)
    /*if(logged_user == ""){
        disable(enterGame)
    }*/
}

/*devbypassHangar.addEventListener("click", ()=>{
    loggedUser = "WG_WOT_DEV_ACC"
    loadAnimation()
    //document.body.requestFullscreen()
    disable(devbypassHangar)
})*/

document.addEventListener("DOMContentLoaded", init_game())

setGameLanguage(settings_get("general.language"))