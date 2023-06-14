<template>
    <div class="window-container">
        <nav id="nav">
            <button class="button is-light"><font-awesome-icon icon="fa-solid fa-bars" /></button>
            <span class="span-spacer"></span>
            <h1 class="title">Face Listing</h1>
            <span class="span-spacer"></span>
            <button class="button is-white"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
        </nav>
        <div class="main-content">
            <div class="category">
                <h2 class="sub-title">Faces</h2>
                <span class="span-spacer"></span>
                <button class="button">Filter By</button>
            </div>

            <div class="products">
                <div class="face" v-for="faces in data" :key="faces.id">
                    <img :src="faces.image_url">
                    <div class="info">
                        <p>{{ faces.firstName }}</p>
                        <span class="span-spacer"></span>
                        <span>{{ faces.description }}</span>
                    </div>
                    <p class="price">{{ faces.price }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/design/faces-style.scss';
</style>

<script>
export default {
    name: 'FacesList',
    props: {
        msg: String
    },
    data() {
        return {
            data: [],
        };
    },
    async mounted() {
        const response = await fetch('../api/faces.json')
        const data = await response.json();
        this.data = data;
    }
}
</script>