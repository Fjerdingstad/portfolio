<template>
    <div class="main-content">
        <div class="section-tab">
            <h2 class="">Popular</h2>
            <span class="faded-subtitle">Shop</span>
            <span class="span-spacer"></span>
            <span class="small-subtitle">Previous</span>
            &nbsp; | &nbsp;
            <span class="small-subtitle">Next</span>
        </div>
        <div class="products">
            <div class="face-smaller" v-for="faces in data" :key="faces.id">
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
</template>

<script>
export default {
    name: 'FacesPopular',
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

<style lang="scss" scoped>
@import '@/design/faces-style.scss';
// .popular-faces {
//     display: flex;
//     flex-wrap: wrap;
//     margin-top: 5em;
//     margin-bottom: 5em;
//     justify-content: space-between;
// }
</style>