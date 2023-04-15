import router from '../router';

export function errorHandler(error) {
    if (error.response) {
        console.log(error.response.data);
        return error.response.data;
    } else {
        console.log(error.message);
        router.push('/error');
    }
}
