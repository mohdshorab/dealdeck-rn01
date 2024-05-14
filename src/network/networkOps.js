import axios from 'axios';

export async function fetchData(url) {
    try {
        console.log('URL : ',url)
        const response = await axios.get(url);
        console.log('res : ',response)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { message: 'Got error, contact admin' };
    }
}