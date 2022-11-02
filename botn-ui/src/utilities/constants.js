// API endpoints
const BOTN_API_ROOT_ENV = process.env.REACT_APP_BOTN_API_ROOT;
const BOTN_API_ROOT = BOTN_API_ROOT_ENV ? BOTN_API_ROOT_ENV : "http://localhost:8080";
export const BOTN_BASE_URL = BOTN_API_ROOT + "/botn";
export const BOTN_INIT_GAME = BOTN_BASE_URL + "/initGame";
export const BOTN_JOIN_GAME = BOTN_BASE_URL + "/joinGame";
export const BOTN_ADD_ENTRY = BOTN_BASE_URL + "/addEntry";