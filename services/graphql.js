import fetch from "isomorphic-unfetch";

const httpHeaders = {
    "Content-type": "application/json"
};

export async function gqlQuery(q) {
    return await post("http://localhost:3001/graphql", { query: q });
}

async function post(url, req, cookies, headers) {
    try {
        const h = headers ? Object.assign(headers, httpHeaders) : httpHeaders;
        const res = await fetch(url, {
            method: "POST",
            headers: cookies ? Object.assign(h, { cookie: cookies }) : h,
            body: JSON.stringify(req),
            credentials: "same-origin"
        });
        if (res.status === 204) {
            return null;
        }
        return await res.json();
    } catch (err) {
        console.log(err);
        return null;
    }
}
