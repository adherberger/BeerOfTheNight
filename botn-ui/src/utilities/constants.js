// API endpoints
const BOTN_API_ROOT_ENV = process.env.REACT_APP_BOTN_API_ROOT;
const BOTN_API_ROOT = BOTN_API_ROOT_ENV ? BOTN_API_ROOT_ENV : "http://localhost:8080";
//const BOTN_API_ROOT = BOTN_API_ROOT_ENV ? BOTN_API_ROOT_ENV : "http://74.136.151.61:13080";
export const BOTN_BASE_URL = BOTN_API_ROOT + "/botn";
export const BOTN_INIT_GAME = BOTN_BASE_URL + "/initGame";
export const BOTN_JOIN_GAME = BOTN_BASE_URL + "/joinGame";
export const BOTN_ADD_ENTRY = BOTN_BASE_URL + "/addEntry";
export const BOTN_ADD_ENTRY_FOR = BOTN_BASE_URL + "/addEntryFor";
export const BOTN_GET_ENTRIES = BOTN_BASE_URL + "/getEntries";
export const BOTN_SUBMIT_VOTES = BOTN_BASE_URL + "/submitVotes";
export const BOTN_WEBSOCKET_BASE = BOTN_API_ROOT + "/game";
export const BOTN_GAME_STATE_TOPIC = "/botn/game-state";
export const BOTN_ATTENDEES_TOPIC = "/botn/attendees";
export const BOTN_VOTES_TOPIC = "/botn/votes";
export const GAME_STATE = {
    INIT: "INIT",
    IN_PROGRESS: "IN_PROGRESS",
    RESULTS_RECEIVED: "RESULTS_RECEIVED",
    COMPLETE: "COMPLETE",
}

export const BOTN_GET_RESULTS_FOR_GAME = (gameId) => (
    BOTN_BASE_URL + `/results/${gameId}`
)