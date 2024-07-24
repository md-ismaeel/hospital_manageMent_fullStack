// Backend end pints

// export const API_USER_BACKEND = "http://localhost:10000/api/v1/user";
export const API_USER_BACKEND = "https://hospital-management-8e00.onrender.com/api/v1/user";
export const API_APPOINTMENT_BACKEND = "http://localhost:10000/api/v1/user/appointment";

export const requestOptions = {
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
};
