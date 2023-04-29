<script>
import { loginService } from './service';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
    data() {
        return {
            email: '',
            senha: ''
        };
    },
    setup() {
        return { v$: useVuelidate() };
    },
    validations() {
        return {
            email: { required },
            senha: { required }
        };
    },
    methods: {
        send() {
            this.v$.$touch();
            if (this.v$.$invalid) return;
            this.$store.dispatch('addRequest');
            this.login();
        },
        login() {
            const credenciais = {
                email: this.email,
                senha: this.senha
            };
            loginService
                .login(credenciais)
                .then((res) => {
                    if (res.data.token != null) {
                        localStorage.setItem('token', res.data.token);
                        this.$router.push('/');
                    }
                    this.$store.dispatch('removeRequest');
                })
                .catch((erro) => {
                    this.$toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: `${erro.response.data.descricao}`,
                        life: 3000
                    });
                    this.$store.dispatch('removeRequest');
                });
        }
    }
};
</script>

<template>
    <div class="body">
        <div class="container" id="container">
            <div class="form-container sign-in-container">
                <form class="form" action="#">
                    <Avatar label="" class="mb-3" size="xlarge" shape="circle" />
                    <h1 class="h1 mb-2">Bem-vindo(a) ao Template</h1>

                    <input class="input" v-model="email" @input="v$.email.$touch()" type="email" placeholder="E-mail" />
                    <small class="p-error mb-3" v-if="v$.email.$error">E-mail é obrigatório</small>

                    <input class="input" v-model="senha" @input="v$.senha.$touch()" type="password" placeholder="Senha" />
                    <small class="p-error mb-3" v-if="v$.senha.$error">Senha é obrigatória</small>

                    <button class="button mt-3" type="submit" @click="send">Entrar</button>

                    <Divider align="center" type="solid">
                        <b>ou</b>
                    </Divider>

                    <button type="button" class="google-sign-in-button">Entrar com Google</button>
                </form>
            </div>

            <div class="overlay-container">
                <div class="overlay">
                    <!-- ⚠️ adicionar imagem -->
                    <!-- <div class="overlay-panel overlay-right">
                        <img class="img" src="../../assets/images/logo-removebg-preview.png" />
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800'); */

.body {
    background: #f6f5f7;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
    height: 100vh;
    margin: -20px 0 50px;
}

.h1 {
    font-weight: bold;
    margin: 0;
}

.button {
    border-radius: 8px;
    border: 1px solid #6366f1;
    background-color: #6366f1;
    color: #ffffff;
    font-size: 12px;
    font-weight: 500;
    padding: 12px 9.5rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
}

.google-sign-in-button {
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;

    padding: 12px 12px 12px 42px;
    border: 1px solid #757575;
    border-radius: 8px;
    text-align: center;
    color: #757575;
    font-size: 14px;
    font-weight: 500;

    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
    background-color: white;
    background-repeat: no-repeat;
    background-position: 12px 11px;
}

.google-sign-in-button:active {
    transform: scale(0.95);
}

.google-sign-in-button:focus {
    outline: none;
}

.button:active {
    transform: scale(0.95);
}

.button:focus {
    outline: none;
}

.button.ghost {
    background-color: transparent;
    border-color: #ffffff;
}

.form {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
}

.img {
    width: 85%;
    border-radius: 130px;
}

.input {
    background-color: #eee;
    border: none;
    border-radius: 8px;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    box-shadow: 0 0 0 0;
    outline: 0;
}

.container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in-container {
    left: 50%;
    width: 50%;
    z-index: 2;
}

.container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

.sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
}

@keyframes show {
    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}

.overlay-container {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

.overlay {
    background: #6366f1;
    background: -webkit-linear-gradient(to right, #2f4860, #6366f1);
    background: linear-gradient(to right, #2f4860, #6366f1);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-left {
    transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

.container.right-panel-active .overlay-right {
    transform: translateX(20%);
}

.social-container {
    margin: 20px 0;
}

.social-container a {
    border: 1px solid #dddddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}
</style>
