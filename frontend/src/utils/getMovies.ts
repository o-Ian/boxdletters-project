const apiRAtoken = import.meta.env.VITE_API_RA_TOKEN

export default async function getMovies(url: string) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiRAtoken}`
        }
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}