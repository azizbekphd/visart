export var api = "http://localhost:8000/";

export default async function apiRequest({path, method, body}) {
    return fetch(api + path, {
        method: method ?? "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body) ?? null,
    });
}