export const BASE_URL = 'http://localhost:5001/'

//USER RELATED ROUTES

export const FETCH_USER = `${BASE_URL}users`

export const FETCH_USER_BY_ID = (userId) => `${BASE_URL}users/${userId}`;

export const FETCH_USERS_BULK = `${BASE_URL}users`;

export const SIGN_UP = `${BASE_URL}users/signup`

export const SIGN_IN = `${BASE_URL}users/signin`

//TASK RELATED ROUTES

export const FETCH_TASK = `${BASE_URL}tasks`

export const UPDATE_TASK_STATUS = `${BASE_URL}tasks/update`

export const CREATE_TASK = `${BASE_URL}tasks/create`;

export const DELETE_TASK = `${BASE_URL}tasks/delete`

//MEETING RELATED ROUTES

export const FETCH_MEETINGS = `${BASE_URL}meetings`

export const FETCH_MEETING_DETAIL = (meetingId) => `${BASE_URL}meetings/${meetingId}`

export const CREATE_MEETING = `${BASE_URL}meetings/create`

export const DELETE_MEETING = `${BASE_URL}meetings/delete`

//PROJECT RELATED ROUTES

export const FETCH_PROJECTS = `${BASE_URL}project`

export const FETCH_PROJECT_DETAILS = (projectId) => `${BASE_URL}project/${projectId}`

