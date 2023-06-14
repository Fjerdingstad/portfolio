<template>
    <div class="main-container">
        <nav id="nav">
            <button class="button is-light"><font-awesome-icon icon="fa-solid fa-bars" /></button>
            <span class="span-spacer"></span>
            <h1 class="title">visage</h1>
            <span class="span-spacer"></span>
            <button class="button is-white"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
        </nav>
        <div class="main-content">
            <div class="upper-area">
                <div class="upper-content">
                    <div class="left-side">
                        <span class="title">Shop</span>
                        <div class="vertical-line"></div>
                        <ul>
                            <li>Simple faces</li>
                            <li>Happy faces</li>
                            <li>Tough faces</li>
                            <li>Sly faces</li>
                        </ul>
                    </div>
                    <div class="middle">
                        <Carousel @next="next" @prev="prev">
                            <CarouselSlide v-for="(slide, index) in slides" :key="slide" :index="index"
                                :visibleSlide="visibleSlide" :direction="direction">
                                <img :src="slide" />
                            </CarouselSlide>
                        </Carousel>
                    </div>
                </div>
                <div class="upper-nav">
                    <div class="item-center">
                        <button class="rounded-buttons" v-bind:style="{ background: btns1 }" @click="firstSlide"></button>
                        <button class="rounded-buttons" v-bind:style="{ background: btns2 }" @click="secondSlide"></button>
                        <button class="rounded-buttons" v-bind:style="{ background: btns3 }" @click="thirdSlide"></button>
                    </div>
                    <button class="button is-outlined is-black item-right">Shop Now</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/design/faces-style.scss';

.upper-content {
    display: flex;
    justify-content: space-between;
}

.upper-content div.middle {
    width: 500px;
    height: 400px;
    // background-image: url("@/assets/faces/simplerface4.png");
    background-position: center;
    background-repeat: no-repeat;
}

.upper-nav {
    display: flex;
    justify-content: flex-start;
}

.left-side {
    text-align: left;
    width: 15%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.item-center {
    flex: 0 1 auto;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}

.item-right {
    flex: 0 1 auto;
    margin-left: auto;
}

.left-side .title {
    font-weight: 700;
    font-size: 2.5em;
    margin-top: 0.5em;
}

.left-side .vertical-line {
    border-left: 1px solid rgba(0, 0, 0, 0.444);
    height: 75px;
}

.left-side li {
    font-weight: 500;
    color: gray;
    padding: 0.75em 0 0.75em 0;
    font-size: 0.9em;
}

.middle {
    flex-grow: 2;
}

.middle img {
    margin: auto;
}

.rounded-buttons {
    height: 50px;
    width: 50px;
    transform: scale(0.2);
    border-radius: 70%;
    background-color: white;
    border: 5px solid black;
    transition-duration: 0.1s;
}

.rounded-buttons:hover {
    transform: scale(0.4);
}

.rounded-buttons:active {
    transform: scale(0.2);
}
</style>

<script>
import Carousel from '@/components/carousel/carousel-main.vue';
import CarouselSlide from '@/components/carousel/carousel-slide.vue';
export default {
    name: 'FacesComponent',
    props: {
        msg: String
    },
    data() {
        return {
            data: [],
            slides: [
                'https://i.imgur.com/5Xhwfca.png',
                'https://i.imgur.com/jLZDtat.png',
                'https://i.imgur.com/84BRkVm.png',
            ],
            visibleSlide: 0,
            direction: 'left',
            btns1: 'black',
            btns2: 'white',
            btns3: 'white',

        };
    },
    computed: {
        slidesLength() {
            return this.slides.length;
        }
    },
    methods: {
        next() {
            if (this.visibleSlide >= this.slidesLength - 1) {
                this.visibleSlide = 0;
            } else {
                this.visibleSlide++;
            }
            this.direction = "left";
        },
        prev() {
            if (this.visibleSlide <= 0) {
                this.visibleSlide = this.slidesLength - 1;
            } else {
                this.visibleSlide--;
            }
            this.direction = "right";
        },
        firstSlide() {
            this.visibleSlide = 0;
            this.direction = "right";
            this.btns1 = "black";
            this.btns2 = "white";
            this.btns3 = "white";
        },
        secondSlide() {
            if (this.visibleSlide === 0) {
                this.direction = "left";
            } else {
                this.direction = "right";
            }
            this.visibleSlide = 1;
            this.btns1 = "white";
            this.btns2 = "black";
            this.btns3 = "white";
        },
        thirdSlide() {
            this.visibleSlide = 2;
            this.direction = "left";
            this.btns1 = "white";
            this.btns2 = "white";
            this.btns3 = "black";
        },
        autoSlide() {
            setTimeout(() => {
                this.secondSlide();
            }, 3000);
            setTimeout(() => {
                this.thirdSlide();
            }, 6000);
        },
    },
    components: {
        Carousel, CarouselSlide,
    },
    async mounted() {
        const response = await fetch('../api/faces.json')
        const data = await response.json();
        this.data = data;
        this.autoSlide();
    }
}
</script>