const apiURL = import.meta.env.VITE_API_URL;

export const createUser = () => `${apiURL}/users/signup`;
export const loginUser = () => `${apiURL}/users/signin`;
export const getProfile = () => `${apiURL}/profiles`;
export const getGroups = () => `${apiURL}/groups`;