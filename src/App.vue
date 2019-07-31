<template>
    <v-app>
        <v-toolbar>
            <v-toolbar-title class="headline text-uppercase">
                <span>人脉挖掘</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon to="stat">
                <v-icon>pie_chart</v-icon>
            </v-btn>
            <v-btn icon to="friends">
                <v-icon>people</v-icon>
            </v-btn>
            <v-btn icon to="connects">
                <v-icon>forum</v-icon>
            </v-btn>
        </v-toolbar>

        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
    }
</script>
