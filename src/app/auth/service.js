import Axios from 'axios';

const urlBase = 'http://localhost:8080/auth/login';

export const loginService = {
    login(credenciais) {
        return Axios.post(urlBase, credenciais);
    }
};
