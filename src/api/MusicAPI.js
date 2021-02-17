export const getMusic = () => {
    return fetch("http://localhost:8000/api/songs").then(response => response.json())
}