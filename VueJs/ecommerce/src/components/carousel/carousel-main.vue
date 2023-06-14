<template>
    <div class="carousel">
        <slot></slot>

        <button @click="next" class="button next">Next</button>
        <button @click="prev" class="button prev">Prev</button>
    </div>
</template>

<script>
export default {
    date() {
        return {

        }
    },
    methods: {
        next() {
            this.$emit('next')
        },
        prev() {
            this.$emit('prev')
        },
    }
}
</script>

<style lang="scss" scoped>
.carousel {
    position: relative;
    // width: 500px;
    height: 400px;
    overflow: hidden;
}

.button {
    position: absolute;
    height: 40px;
    width: 50px;
    top: calc(50% - 20px);
    background-color: rgba(0, 0, 0, 0.8);
    border: none;
    color: white;
    display: none;
}

.next {
    right: 0;
}

.prev {
    left: 0;
}
</style>