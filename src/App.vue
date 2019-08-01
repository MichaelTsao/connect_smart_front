<template>
    <v-app>
        <v-app-bar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>人脉挖掘</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon to="/">
                <v-icon>mdi-chart-pie</v-icon>
            </v-btn>
            <v-btn icon to="/friends">
                <v-icon>mdi-account-group</v-icon>
            </v-btn>
            <v-btn icon to="/connects">
                <v-icon>mdi-forum</v-icon>
            </v-btn>
        </v-app-bar>

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
