<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>人脉挖掘</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon to="/">
                <v-icon>pie_chart</v-icon>
            </v-btn>
            <v-btn icon to="/friends">
                <v-icon>people</v-icon>
            </v-btn>
            <v-btn icon to="/connects">
                <v-icon>forum</v-icon>
            </v-btn>

            <v-fab-transition>
                <v-btn
                        absolute
                        color="pink"
                        dark
                        fab
                        left
                        style="margin-top: 100px"
                        top
                        v-show="show_add_button"
                >
                    <v-icon>add</v-icon>
                </v-btn>
            </v-fab-transition>
        </v-toolbar>

        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                show_add_button: false
            }
        },
        watch: {
            $route(to) {
                if (to.path === '/connects') {
                    this.show_add_button = true;
                } else {
                    this.show_add_button = false;
                }
            }
        },
    }
</script>
