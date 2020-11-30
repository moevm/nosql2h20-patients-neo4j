import Axios from "axios";

async function login(pwd) {
    const res = await Axios.post("/api/login", {pwd});
    const {data} = await res;
    if (data.error) {
        return data.error
    } else {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        return true
    }
}

async function check() {
    const token = localStorage.getItem("access_token")
    try {
        const res = await Axios.post("/api/checkiftokenexpire", {}, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        const {data} = await res;
        return data.success
    } catch {
        console.log("p")
        const refresh_token = localStorage.getItem("refresh_token")
        if (!refresh_token) {
            localStorage.removeItem("access_token")
            return false;
        }
        Axios.post("/api/refreshtoken", {}, {
            headers: {
                Authorization: `Bearer ${refresh_token}`
            }
        }).then(res => {
            localStorage.setItem("token", res.data.access_token)
        })
        return true;
    }
}

function logout() {
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token")
    }
    if (localStorage.getItem("refreshToken")) {
        localStorage.removeItem("refreshToken")
    }
    localStorage.clear();
    setTimeout(() => window.location = "/", 500)
}

export {login, check, logout};