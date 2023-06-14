<template>
    <div class="main-container test">
        <FacesComponent />
        <FacesCategory />
        <FacesPopular />
        <FacesCollection />
        <FacesNewsletter />
    </div>
</template>

<style scoped>
.test {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-top: 1em;
    margin-right: auto;
    padding-top: 5em;
    padding-left: 5em;
    padding-right: 5em;
    width: 80%;
    box-shadow: 1px 1px 30px rgba(128, 128, 128, 0.274);
}
</style>

<script>
import FacesComponent from '@/components/faces/faces-component.vue'
import FacesCategory from '@/components/faces/faces-category.vue'
import FacesPopular from '@/components/faces/faces-popular.vue'
import FacesCollection from '@/components/faces/faces-collection.vue'
import FacesNewsletter from '@/components/faces/faces-newsletter.vue'

export default {
    name: 'FacesView',
    components: {
        FacesComponent, FacesCategory, FacesPopular, FacesCollection, FacesNewsletter
    }
}
</script>
