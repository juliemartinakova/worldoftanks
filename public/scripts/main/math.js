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

export function number_format(input, number_size) {
    const input_str = String(input)
    let formated_parts = []

    for (let i = input_str.length; i > 0; i -= number_size) {
        // Get the substring for the current group
        const part = input_str.substring(Math.max(0, i - number_size), i);
        formated_parts.unshift(part); // Add the part to the beginning of the array
    }

    // Join the parts with a space and return the result
    return formated_parts.join(' ');
}