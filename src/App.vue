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

            <v-dialog max-width="1000px" v-model="dialog">
                <template v-slot:activator="{ on }">
                    <v-fab-transition>
                        <v-btn
                                absolute
                                color="pink"
                                dark
                                fab
                                left
                                style="margin-top: 100px"
                                top
                                v-on="on"
                                v-show="show_add_button"
                        >
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-fab-transition>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">abc</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex md3 sm6 xs12>
                                    <v-text-field
                                            label="名字"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat>关闭</v-btn>
                        <v-btn color="blue darken-1" flat>保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
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
                this.show_add_button = to.path === '/connects';
            }
        },
    }
</script>
