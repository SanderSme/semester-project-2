import { getUserName } from '../utils/storage';

const userName = getUserName();

const API_BASE_URL = 'https://api.noroff.dev/';
const SIGNUP_API_URL = API_BASE_URL + 'api/v1/auction/auth/register';
const LOGIN_API_URL = API_BASE_URL + 'api/v1/auction/auth/login';
const GET_POSTS_API_URL = API_BASE_URL + 'api/v1/auction/listings';
const CREATE_POST_API_URL = API_BASE_URL + 'api/v1/auction/listings';
const PROFILE_API_URL = API_BASE_URL + `api/v1/auction/profiles/${userName}`;
const USER_POSTS_API_URL = API_BASE_URL + `api/v1/auction/profiles/${userName}/listings?_bids=true`;
const USER_BIDS_API_URL = API_BASE_URL + `api/v1/auction/profiles/${userName}/bids?_listings=true`;
const CHANGE_AVATAR_URL = API_BASE_URL + `api/v1/auction/profiles/${userName}/media`;

export {
  API_BASE_URL,
  SIGNUP_API_URL,
  LOGIN_API_URL,
  GET_POSTS_API_URL,
  CREATE_POST_API_URL,
  CHANGE_AVATAR_URL,
  PROFILE_API_URL,
  USER_POSTS_API_URL,
  USER_BIDS_API_URL,
};
