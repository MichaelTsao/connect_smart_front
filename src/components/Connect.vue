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
                                <SearchText :values.sync="editedItem.type" models="connects" name="类型"
                                            type="type"></SearchText>
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
                                            v-for="(item, index) in editedItem.friends"
                                            :key="index"
                                            @click:close="removeFriend(index)"
                                            close
                                            color="indigo"
                                            text-color="white"
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
                    v-for="(item, index) in connects"
                    :key="index"
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
                                size="38"
                        >
                            mdi-magnify
                        </v-icon>
                        <h2 class="display-1 white--text font-weight-light">{{item.type}}</h2>
                    </v-card-title>
                    <v-container>
                        <v-layout>
                            <v-flex md10 style="font-size: 1.5em" xs12>
                                {{ item.friends.map((i) => {return i.name;}).join(' ') }}
                            </v-flex>
                            <v-flex
                                    hidden-sm-and-down
                                    md2
                                    text-right
                            >
                                <v-icon @click="editItem(item)" size="34">mdi-pencil</v-icon>
                                <v-icon @click="deleteItem(item)" size="34">mdi-delete</v-icon>
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
                return this.connects.map((value, index) => index % 2 === 0)
            },
            colors: function () {
                return this.connects.map(function (value, index) {
                    let colors = ['purple', 'red', 'blue', 'teal', 'lime', 'yellow', 'orange', 'brown'];
                    return colors[index % colors.length];
                })
            },
        },
        methods: {
            removeFriend: function (index) {
                this.editedItem.friends.splice(index, 1)
            },
            chooseFriend: function (type, value) {
                this.editedItem.friends.push(value);
            },
            getItems() {
                let that = this;

                let url = process.env.VUE_APP_API_URL + '/connects?access-token=100-token&per-page=100';
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
                let saveItem = Object.assign({}, this.editedItem);
                saveItem.friends = saveItem.friends.map((i) => {
                    return i._id
                });

                if (this.editedIndex > -1) {
                    Object.assign(this.connects[this.editedIndex], this.editedItem);

                    this.$http.put(process.env.VUE_APP_API_URL + '/connects/' + this.connects[this.editedIndex]['_id']
                        + '?access-token=100-token', saveItem)
                        .then(function (response) {
                            // handle success
                            console.log(response);
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        });

                } else {
                    this.$http.post(process.env.VUE_APP_API_URL + '/connects?access-token=100-token', saveItem)
                        .then(function (response) {
                            // handle success
                            that.addConnects(response.data);

                            console.log(response);
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        });
                }
                this.close()
            },
            editItem(item) {
                this.editedIndex = this.connects.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },
            deleteItem(item) {
                const index = this.connects.indexOf(item);
                if (confirm('确定删除此好友?')) {
                    this.$http.delete(process.env.VUE_APP_API_URL + '/connects/' + this.connects[index]['_id'] + '?access-token=100-token')
                        .then(function (response) {
                            // handle success
                            console.log(response);
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        });

                    this.connects.splice(index, 1)
                }
            },
            addConnects(connect) {
                let pos = 0;
                for (let key in this.connects) {
                    if (connect.startDate < this.connects[key].startDate) {
                        pos++;
                    } else {
                        break;
                    }
                }
                this.connects.splice(pos, 0, connect);
            },
        },
    }
</script>

<style scoped>

</style>