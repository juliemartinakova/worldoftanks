import { app_load_data } from "../landing/authentication";
import { __JSON_REQUEST } from "../main/file_request";
import { number_format } from "../main/math";
import { lobby_nick_display, credits_amount, gold_amount, free_xp_amount, bonds_amount, vehicle_list_vehicles, vehicle_list_scrollable } from "../main/element_query";

let credits_quantity
let gold_quantity
let bonds_quantity
let free_xp_quantity

let mousedown = false

let vehicles_in_garage

let user_data

if(app_load_data){
    async function _lobby_gui_init(){
        let _user_data = await __JSON_REQUEST(`https://api.worldoftanks.eu/wot/account/info/?application_id=25bcedbb27d8357ac39a775c59eaefc6&account_id=${app_load_data.account_id}&access_token=${app_load_data.access_token}`)

        user_data = _user_data.data[app_load_data.account_id]

        let _vehicles_in_garage = await __JSON_REQUEST(`https://api.worldoftanks.eu/wot/tanks/stats/?application_id=25bcedbb27d8357ac39a775c59eaefc6&in_garage=1&account_id=${app_load_data.account_id}&access_token=${app_load_data.access_token}`)        

        vehicles_in_garage = _vehicles_in_garage.data[app_load_data.account_id]

        credits_quantity = user_data.private.credits
        gold_quantity = user_data.private.gold
        free_xp_quantity = user_data.private.free_xp
        bonds_quantity = user_data.private.bonds

        lobby_nick_display.innerText = user_data.nickname

        credits_amount.forEach(display => {display.innerText = number_format(credits_quantity, 3)})
        gold_amount.forEach(display => {display.innerText = number_format(gold_quantity, 3)})
        free_xp_amount.forEach(display => {display.innerText = number_format(free_xp_quantity, 3)})
        bonds_amount.forEach(display => {display.innerText = number_format(bonds_quantity, 3)})

        vehicles_in_garage.forEach(async vehicle => {
            const vehicle_slot = document.createElement("button")
            const vehicle_name = document.createElement("p")
            const vehicle_info = await __JSON_REQUEST(`https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=25bcedbb27d8357ac39a775c59eaefc6&tank_id=${vehicle.tank_id}`)

            vehicle_slot.classList.add("tank-slot")
            vehicle_name.classList.add("vehicle-name")

            vehicle_list_vehicles.appendChild(vehicle_slot)
            vehicle_slot.appendChild(vehicle_name)

            vehicle_name.innerText = vehicle_info.data[vehicle.tank_id].short_name
        })

        vehicle_list_scrollable.addEventListener("wheel", (e) => {
            e.preventDefault()
            console.log(e.deltaY)
            vehicle_list_scrollable.scrollBy({
                top: 0,
                left: -e.deltaY*2,
                behavior: "smooth"
            });
        })

        vehicle_list_scrollable.onmousedown = () => {
            mousedown = true
            if(mousedown){
                vehicle_list_scrollable.onmousemove = (e) => {
                    vehicle_list_scrollable.scrollBy({
                        top: 0,
                        left: -e.movementX
                    });
                }
            }
            vehicle_list_scrollable.onmouseup = () => {
                mousedown = false
            }
        }

        console.log(credits_quantity, gold_quantity, free_xp_quantity, bonds_quantity)
        console.log(user_data)
        console.log(vehicles_in_garage)
    }
    _lobby_gui_init()
}