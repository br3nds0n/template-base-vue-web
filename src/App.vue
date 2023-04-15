<template>
    <Toast />
    <ConfirmDialog />
    <loading v-if="$store.getters.isLoading" />
    <router-view />
</template>

<style scoped>
.p-toast.p-toast-topright {
    top: 114px;
}
</style>
