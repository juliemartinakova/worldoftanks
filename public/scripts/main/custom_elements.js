import { settings_get, settings_set, localstorage_get, localstorage_set } from "./game_settings.js"
import { setGameLanguage } from "./locales.js"
import { loading_spinner, loading_spinner_text, screens, setting_section } from "./element_query.js"
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
    let loader_translation = await __JSON_REQUEST(`./assets/data/locales/${settings_get("general.language")}.json`)

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
    let loader_translation = await __JSON_REQUEST(`./assets/data/locales/${settings_get("general.language")}.json`)

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

//setGameLanguage(settings_get("general.language"))

/*setting_section.forEach(section => {
    const radio_inputs = section.querySelectorAll("input[type=radio]")
    
    radio_inputs.forEach(radio => {
        console.log(radio)
        radio.addEventListener("click",()=>{
            radio_inputs.forEach(input => {
                input.checked = false
            })
            radio.checked = true
        })
    })
})*/

const range_sliders = document.querySelectorAll("input[type=\"range\"]")

range_sliders.forEach(slider => {
    const _ticks = document.createElement("div")
    const _progress = document.createElement("div")
    const _slider_track = document.createElement("div")
    const _container = document.createElement("div")
    const _output = document.createElement("output")
    
    slider.parentNode.appendChild(_container)
    _container.appendChild(_slider_track)
    _slider_track.appendChild(_progress)
    _slider_track.appendChild(_ticks)
    _slider_track.appendChild(slider)
    _container.appendChild(_output)

    _ticks.classList.add("range_slider_ticks")
    _progress.classList.add("range_slider_progress")
    _container.classList.add("range_slider")
    _output.classList.add("range_slider_output")
    _slider_track.classList.add("range_progress_ticks_container")

    _ticks.style.backgroundSize = `calc(${Math.round(slider.step)}% - 2px) 5px`
    _progress.style.width = `${slider.value}%`

    if(_container.parentNode.classList.contains("setting")){
        switch(Math.round(slider.step)){
            case 33:
                switch(Math.round(slider.value)){
                    case 0:
                        _output.innerText = "Nízká"
                        break;
                    case 33:
                        _output.innerText = "Střední"
                        break;
                    case 67:
                        _output.innerText = "Vysoká"
                        break;
                    case 100:  
                        _output.innerText = "Ultra"
                        break;
                }
                break;
            case 25:
                switch(Math.round(slider.value)){
                    case 0:
                        _output.innerText = "Nízká"
                        break;
                    case 25:
                        _output.innerText = "Střední"
                        break;
                    case 50:
                        _output.innerText = "Vysoká"
                        break;
                    case 75:
                        _output.innerText = "Maximální"
                        break;
                    case 100:  
                        _output.innerText = "Ultra"
                        break;
                }
                break;
            case 20:
                switch(Math.round(slider.value)){
                    case 0:
                        _output.innerText = "Minimální"
                        break;
                    case 20:
                        _output.innerText = "Nízká"
                        break;
                    case 40:
                        _output.innerText = "Střední"
                        break;
                    case 60:
                        _output.innerText = "Vysoká"
                        break;
                    case 80:
                        _output.innerText = "Maximální"
                        break;
                    case 100:  
                        _output.innerText = "Ultra"
                        break;
                }
                break;
            case 50:
                switch(Math.round(slider.value)){
                    case 0:
                        _output.innerText = "Nízká"
                        break;
                    case 50:
                        _output.innerText = "Vysoká"
                        break;
                    case 100:
                        _output.innerText = "Ultra"
                        break;
                }
                break;
        }
    } else {
        _output.innerText = Math.round(slider.value)
    }

    slider.addEventListener("input", ()=>{
        _progress.style.width = `${slider.value}%`
        if(_container.parentNode.classList.contains("setting")){
            switch(Math.round(slider.step)){
                case 33:
                    switch(Math.round(slider.value)){
                        case 0:
                            _output.innerText = "Nízká"
                            break;
                        case 33:
                            _output.innerText = "Střední"
                            break;
                        case 67:
                            _output.innerText = "Vysoká"
                            break;
                        case 100:  
                            _output.innerText = "Ultra"
                            break;
                    }
                    break;
                case 25:
                    switch(Math.round(slider.value)){
                        case 0:
                            _output.innerText = "Nízká"
                            break;
                        case 25:
                            _output.innerText = "Střední"
                            break;
                        case 50:
                            _output.innerText = "Vysoká"
                            break;
                        case 75:
                            _output.innerText = "Maximální"
                            break;
                        case 100:  
                            _output.innerText = "Ultra"
                            break;
                    }
                    break;
                case 20:
                    switch(Math.round(slider.value)){
                        case 0:
                            _output.innerText = "Minimální"
                            break;
                        case 20:
                            _output.innerText = "Nízká"
                            break;
                        case 40:
                            _output.innerText = "Střední"
                            break;
                        case 60:
                            _output.innerText = "Vysoká"
                            break;
                        case 80:
                            _output.innerText = "Maximální"
                            break;
                        case 100:  
                            _output.innerText = "Ultra"
                            break;
                    }
                    break;
                case 50:
                    switch(Math.round(slider.value)){
                        case 0:
                            _output.innerText = "Nízká"
                            break;
                        case 50:
                            _output.innerText = "Vysoká"
                            break;
                        case 100:
                            _output.innerText = "Ultra"
                            break;
                    }
                    break;
            }
        } else {
            _output.innerText = Math.round(slider.value)
        }
    })
})