<template>
    <div class="navbar-menu">
        <div class="column is-2 menu">
            <div class="">
                <div class="menu-list">
                    <router-link to="/">Home</router-link>
                    <!-- <router-link to="/about">About</router-link> -->
                    <router-link to="/faces">Faces</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
.menu-list {
    display: flex;
}

.menu-list a {
    color: white;
}
</style>

<script>
export default {

};
</script>
  