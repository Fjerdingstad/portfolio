<template>
    <div class="main-content-padding">
        <div class="cat-container">
            <div class="left-container">
                <h2>1.1</h2>
                <div class="actions">
                    <div class="cat-title-container">
                        <h3 class="">Simple</h3>
                        <p class="">Faces</p>
                    </div>
                </div>
                <div class="button-container">
                    <RouterLink to="/faces-list"><button>Shop Simple</button></RouterLink>
                    <div class="underline"></div>
                </div>
            </div>
            <div class="right-container">
                <h2>1.2</h2>
                <div class="actions">
                    <div class="cat-title-container">
                        <h3 class="">Complex</h3>
                        <p class="">Faces</p>
                    </div>
                </div>
                <div class="button-container">
                    <RouterLink to="/faces-list"><button>Shop Complex</button></RouterLink>
                    <div class="underline"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@/design/faces-style.scss';

.cat-container {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.cat-container .actions {
    padding: 0 2em 0 2em;
    // height: 100%;
}

.cat-container .button-container {
    position: absolute;
    bottom: 2em;
    right: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cat-container .button-container button {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: none;
    // padding-bottom: 0.5em;
    background-color: transparent;
    font-weight: 700;
    cursor: pointer;
}

.button-container .underline {
    background-color: black;
    width: 90%;
    height: 0.1em;
    margin-top: 0.3em;
}

.cat-container .left-container,
.right-container {
    width: 48%;
    height: 400px;
    padding: 1em;
    position: relative;
}

.cat-container .left-container {
    background-color: #42b8832c;
    background-image: url('https://i.imgur.com/kc0g2gT.png');
    background-position: center;
    background-repeat: no-repeat;
}

.cat-container .right-container {
    background-color: #00b4e62a;
    background-image: url('https://i.imgur.com/rP42X6Q.png');
    background-position: center;
    background-repeat: no-repeat;
}

.cat-container h2 {
    text-align: right;
    font-weight: 700;
}

.cat-title-container {
    text-align: left;
}



.cat-title-container h3 {
    font-weight: 700;
    font-size: 1.5em;
}

.cat-title-container p {
    font-weight: 700;
    opacity: 0.5;
}
</style>