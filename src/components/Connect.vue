<template>
    <div>
        <v-dialog max-width="1000px" v-model="dialog">
            <template v-slot:activator="{ on }">
                <v-fab-transition>
                    <v-btn
                            color="pink"
                            dark
                            fab
                            fixed
                            right
                            style="margin-top: 60px"
                            top
                            v-on="on"
                    >
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-fab-transition>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">新连接</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex md3 sm6 xs12>
                                <SearchText :values="editedItem.type" @choose-value="chooseResult" models="connects"
                                            name="类型" type="type"></SearchText>
                            </v-flex>
                            <v-flex md3 sm6 xs12>
                                <v-menu
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        full-width
                                        min-width="290px"
                                        offset-y
                                        transition="scale-transition"
                                        v-model="menuStart"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                label="开始时间"
                                                prepend-icon="event"
                                                readonly
                                                v-model="editedItem.startDate"
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker @input="menuStart = false"
                                                   v-model="editedItem.startDate"></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex md3 sm6 xs12>
                                <v-menu
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        full-width
                                        min-width="290px"
                                        offset-y
                                        transition="scale-transition"
                                        v-model="menuEnd"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                label="结束时间"
                                                prepend-icon="event"
                                                readonly
                                                v-model="editedItem.endDate"
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker @input="menuEnd = false"
                                                   v-model="editedItem.endDate"></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex md3 sm6 xs12></v-flex>
                            <v-flex md3 sm6 xs12>
                                <SearchText @choose-value="chooseFriend" name="朋友" type="name"></SearchText>
                            </v-flex>
                            <v-flex md12 sm12 xs12>
                                <v-chip-group column>
                                    <v-chip
                                            :key="index"
                                            @click:close="removeFriend(index)"
                                            close
                                            color="indigo"
                                            text-color="white"
                                            v-for="(item, index) in editedItem.friends"
                                    >
                                        <v-avatar>
                                            <v-icon>mdi-account-circle</v-icon>
                                        </v-avatar>
                                        {{item.name}}
                                    </v-chip>
                                </v-chip-group>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="close" color="blue darken-1" text>关闭</v-btn>
                    <v-btn @click="save" color="blue darken-1" text>保存</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-timeline :dense="$vuetify.breakpoint.smAndDown">
            <v-timeline-item
                    :key="index"
                    v-for="(item, index) in connects"
                    :color="colors[index] + ' lighten-1'"
                    :left="sides[index]"
                    :right="!sides[index]"
                    fill-dot
            >
                <template v-slot:opposite>
                    <span>{{item.startDate}}</span>
                </template>
                <v-card>
                    <v-card-title
                            :class="colors[index] + ' lighten-3'"
                    >
                        <v-icon
                                class="mr-4"
                                dark
                                size="42"
                        >
                            mdi-magnify
                        </v-icon>
                        <h2 class="display-1 white--text font-weight-light">{{item.type}}</h2>
                    </v-card-title>
                    <v-container>
                        <v-layout>
                            <v-flex md10 xs12>
                                {{item.friends.join(" ")}}
                            </v-flex>
                            <v-flex
                                    hidden-sm-and-down
                                    md2
                                    text-right
                            >
                                <v-icon size="64">mdi-calendar-text</v-icon>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-timeline-item>
        </v-timeline>
    </div>
</template>

<script>
    import SearchText from "./SearchText";

    export default {
        components: {
            SearchText,
        },
        name: "Connect",
        data: () => ({
            dialog: false,
            editedItem: {
                type: '',
                startDate: '',
                endDate: '',
                friends: [],
            },
            defaultItem: {
                type: '',
                startDate: '',
                endDate: '',
                friends: [],
            },
            editedIndex: -1,
            menuStart: false,
            menuEnd: false,

            connects: [],
        }),
        created() {
            this.getItems();
        },
        computed: {
            sides: function () {
                return this.connects.map(function (value, index) {
                    return index % 2 === 0;
                })
            },
            colors: function () {
                return this.connects.map(function (value, index) {
                    let colors = ['purple', 'red', 'blue', 'teal', 'lime', 'yellow', 'orange', 'brown'];
                    return colors[index % colors.length];
                })
            }
        },
        methods: {
            chooseResult: function (type, value) {
                eval('this.editedItem.' + type + "='" + value + "'");
            },
            removeFriend: function (index) {
                this.editedItem.friends.splice(index, 1)
            },
            chooseFriend: function (type, value) {
                this.editedItem.friends.push(value);
            },
            getItems() {
                let that = this;

                let url = process.env.VUE_APP_API_URL + '/connects?access-token=100-token';
                this.$http.get(url)
                    .then(function (response) {
                        // handle success
                        that.connects = response.data;
                        console.log(response);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    });
            },
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                }, 300)
            },
            save() {
                let that = this;
                if (this.editedIndex > -1) {
                    Object.assign(this.connects[this.editedIndex], this.editedItem);

                    this.$http.put(process.env.VUE_APP_API_URL + '/connects/' + this.connects[this.editedIndex]['_id'] + '?access-token=100-token', this.editedItem)
                        .then(function (response) {
                            // handle success
                            console.log(response);
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        });

                } else {
                    this.$http.post(process.env.VUE_APP_API_URL + '/connects?access-token=100-token', this.editedItem)
                        .then(function (response) {
                            // handle success
                            that.connects.push(response.data);

                            console.log(response);
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        });
                }
                this.close()
            }
        },
    }
</script>

<style scoped>

</style>