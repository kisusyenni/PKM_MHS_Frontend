import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://pkmuibmhs.tugaskuliah.web.id",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (!config.headers.authToken) {
            const authToken = localStorage.getItem("token");
            const storeId = localStorage.getItem("storeId");
            config.headers.authToken = authToken ? authToken : "";
            config.headers.storeId = storeId ? storeId : "";
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (config) => {
        if (!config.headers.authToken) {
            const authToken = localStorage.getItem("token");
            config.headers.authToken = authToken ? authToken : "";
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

const getData = async (path) => {
    try {
        const response = await axiosInstance.get(path);
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        if (error.response) {
            if (error.response.status === 403 || error.response.status === 401) {
                window.location.href = "/";
                localStorage.removeItem("token");
            } else {
            }
        }
    }
};

const postData = async (path, data) => {
    try {
        const response = await axiosInstance.post(path, JSON.stringify(data));
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        if (error.response) {
            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.removeItem("token");
                return {
                    status: error.response.status,
                    data: error.response.data,
                };
            } else {
                console.error(error);
                return {
                    status: error.response.status,
                    data: error.response.data,
                };
            }
        }
    }
};

const putData = async (path, id, data) => {
    try {
        const response = await axiosInstance.put(`${path}/${id}`, JSON.stringify(data));
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        if (error.response) {
            if (error.response.status === 403 || error.response.status === 401) {
                window.location.href = "/";
                localStorage.removeItem("token");
            } else {
                console.error(error);
                return error;
            }
        }
    }
};

const deleteData = async (path, id) => {
    try {
        const response = await axiosInstance.delete(`${path}/${id}`);
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        if (error.response) {
            if (error.response.status === 403 || error.response.status === 401) {
                window.location.href = "/";
                localStorage.removeItem("token");
            } else {
                console.error(error);
                return error;
            }
        }
    }
};

export { getData as get, postData as post, putData as put, deleteData };
