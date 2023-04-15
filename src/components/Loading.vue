<template>
    <div class="loadingfullwrapper">
        <div class="loadingfull">
            <div class="spinnerfull">
                <font-awesome-layers full-width class="fa-6x">
                    <font-awesome-icon class="gray8 mb-5 spinnerCollor" icon="circle-notch" spin />
                </font-awesome-layers>
            </div>
        </div>
    </div>
</template>

<style>
.loadingfullwrapper {
    position: fixed;
    z-index: 10000;
    height: 2em;
    width: 2em;
    overflow: show;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.loadingfullwrapper:before {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
}
.loadingfull {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
}
.spinnerfull {
    margin: auto;
    z-index: 10001;
}
.spinnerCollor {
    color: #6366f1;
}
</style>
