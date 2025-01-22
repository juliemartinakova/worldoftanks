import { app_load_data } from "../landing/authentication";
import { __JSON_REQUEST } from "../main/file_request";
import { number_format } from "../main/math";
import { lobby_nick_display, credits_amount, gold_amount, free_xp_amount, bonds_amount } from "../main/element_query";

let credits_quantity
let gold_quantity
let bonds_quantity
let free_xp_quantity

let user_data

if(app_load_data){
    async function _lobby_gui_init(){
        let _user_data = await __JSON_REQUEST(`https://api.worldoftanks.eu/wot/account/info/?application_id=25bcedbb27d8357ac39a775c59eaefc6&account_id=${app_load_data.account_id}&access_token=${app_load_data.access_token}`)

        user_data = _user_data.data[app_load_data.account_id]
        

        credits_quantity = user_data.private.credits
        gold_quantity = user_data.private.gold
        free_xp_quantity = user_data.private.free_xp
        bonds_quantity = user_data.private.bonds

        lobby_nick_display.innerText = user_data.nickname

        credits_amount.forEach(display => {display.innerText = number_format(credits_quantity, 3)})
        gold_amount.forEach(display => {display.innerText = number_format(gold_quantity, 3)})
        free_xp_amount.forEach(display => {display.innerText = number_format(free_xp_quantity, 3)})
        bonds_amount.forEach(display => {display.innerText = number_format(bonds_quantity, 3)})

        console.log(credits_quantity, gold_quantity, free_xp_quantity, bonds_quantity)
        console.log(user_data)
    }
    _lobby_gui_init()
}