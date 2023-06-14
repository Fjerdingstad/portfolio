<template>
    <div class="main-content">
        <div class="newsletter-container">
            <div class="newsletter-title">
                <h2 class="">Newsletter</h2>
                <p>Register now with our newsletter and get the latest update available</p>
            </div>
            <div class="newsletter-form-container">
                <form>
                    <div class="newsletter-form-inputs">
                        <input class="input" type="text" placeholder="Name" />
                        <div class="space"></div>
                        <input class="input" type="text" placeholder="Email" />
                    </div>
                    <div class="newsletter-button">
                        <button class="button is-dark">Subscribe</button>
                    </div>
                </form>
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

.space {
    padding: 0.5em;
}

.newsletter-container {
    padding: 2em 5em 2em 5em;
    display: flex;
    justify-content: space-between;
}

.newsletter-title {
    text-align: left;
}

.newsletter-title {
    display: flex;
    flex-direction: column;
}

.newsletter-container h2 {
    font-weight: 700;
    font-size: 2em;
}

.newsletter-form-container form {
    display: flex;
    flex-direction: row;
    align-items: end;
}

.newsletter-form-inputs {
    display: flex;
    flex-direction: column;
    padding: 0 1em 0 0em;
}

.newsletter-form-inputs input {
    padding: 0.5em 1em 0.5em 1em;
    width: 100%;
}
</style>