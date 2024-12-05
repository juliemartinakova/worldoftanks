export function math_randint(min, max, type = "int"){
    let number = Math.random() * (max - min) + min
    switch(type){
        case "int":
            number = Math.round(number)
        case "float":
            number = number
    }
    return number
}

export function sec_to_ms(seconds){
    return seconds * 1000
}