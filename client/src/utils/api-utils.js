const apiURL = import.meta.env.VITE_API_URL;

export const createUser = () => `${apiURL}/users/signup`;