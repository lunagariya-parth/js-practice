async function fetchData() {
    const API_URL = "https://jsonplaceholder.typicode.com/users";
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
    }
}
