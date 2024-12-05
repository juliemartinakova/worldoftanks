export async function __JSON_REQUEST(path, method = "get", data = ""){
    let result

    switch(method){
        case "get":
            const request = await fetch(path, {
                method: "GET"
            })
            result = await request.json()
    }
    return result
}