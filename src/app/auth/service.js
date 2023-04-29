import Axios from 'axios';

const urlBase = 'http://localhost:3000/api/login';

export const loginService = {
    login(credenciais) {
        return Axios.post(urlBase, credenciais);
    }
};
