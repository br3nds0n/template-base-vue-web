<script>
import { useLayout } from '@/layout/composables/layout';
const { onMenuToggle } = useLayout();

export default {
    data() {
        return {
            outsideClickListener: { value: null },
            topbarMenuActive: { value: false }
        };
    },
    mounted() {
        this.bindOutsideClickListener();
    },
    beforeMount() {
        this.unbindOutsideClickListener();
    },
    computed: {
        topbarMenuClasses() {
            return { 'layout-topbar-menu-mobile-active': this.topbarMenuActive.value };
        }
    },
    methods: {
        onTopBarMenuButton() {
            this.topbarMenuActive.value = !this.topbarMenuActive.value;
        },
        onMenuToggle() {
            onMenuToggle();
        },

        bindOutsideClickListener() {
            if (!this.outsideClickListener.value) {
                this.outsideClickListener.value = (event) => {
                    if (this.isOutsideClicked(event)) {
                        this.topbarMenuActive.value = false;
                    }
                };
                document.addEventListener('click', this.outsideClickListener.value);
            }
        },
        unbindOutsideClickListener() {
            if (this.outsideClickListener.value) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener.value = null;
            }
        },
        isOutsideClicked(event) {
            if (!this.topbarMenuActive.value) return;

            const sidebarEl = document.querySelector('.layout-topbar-menu');
            const topbarEl = document.querySelector('.layout-topbar-menu-button');

            return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
        }
    }
};
</script>

<template>
    <div class="layout-topbar">
        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <Button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
                <i v-badge="2" class="pi pi-bell p-overlay-badge" />
                <span class="span">Notificação</span>
            </Button>
            <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
                <i class="pi pi-user"></i>
                <span class="span">Perfil</span>
            </button>
            <button class="p-link layout-topbar-button">
                <i class="pi pi-cog"></i>
                <span class="span">Configurações</span>
            </button>
        </div>
    </div>
</template>
