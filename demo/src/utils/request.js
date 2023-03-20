import axios from "axios";
/*axios instance*/
const Request = axios.create({
    /*api的baseURL*/
    baseURL : "",
    /*elaps*/
    timeout: 60000,
});
/*request interceptor*/
Request.interceptors.request.use(
    (config) => {
        let url = config.url;
        return config;
    },
    (error) => {
        /*error*/
        return Promise.reject(error);
    }
);

const Handlers = []

/*response interceptor*/
Request.interceptors.response.use(
    (res) => {
        if (res.status === 401) {
            return res;
        }
        return res;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Request.form = (data) => {
    let ret = new FormData();
    Object.keys(data).forEach((x) => {
        if (data[x] instanceof File) {
            let n = data[x].name.split(".");
            ret.append(x, data[x], `file.${n[n.length - 1]}`);
        } else if (data[x] instanceof Array) {
            data[x].forEach((f) => {
                let n = f.name.split(".");
                ret.append(x, f, `file.${n[n.length - 1]}`);
            });
        } else {
            ret.append(x, data[x]);
        }
    });
    return ret;
};

Request.blob = (raw) => {
    return new Promise((res, rej) => {
        let reader = new FileReader();
        reader.readAsArrayBuffer(raw);
        reader.onload = (e) => {
            if (typeof e.target.result === "object") {
                res(new Blob([e.target.result]));
            } else {
                res(e.target.result);
            }
        };
    });
};

export default Request;
