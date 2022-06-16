export var api = "http://visart.pythonanywhere.com/";

export default async function apiRequest({path, method, body, headers}) {
    return fetch(api + path, {
        method: method ?? "GET",
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        body: JSON.stringify(body) ?? null,
    }).catch((reason)=>{
        console.log(reason)
    });
}