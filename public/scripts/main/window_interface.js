import { game_windows } from "./element_query";
import { hide, show } from "./custom_elements";

game_windows.forEach(window => {
    const close_button = window.querySelector(".header .actions .close")
    
    close_button.addEventListener("click",()=>hide(window))
})