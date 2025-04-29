export default async function GetToken() {
    return localStorage.getItem('accessToken')
}