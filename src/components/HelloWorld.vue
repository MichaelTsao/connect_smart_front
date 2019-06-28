<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-toolbar color="white" flat>
            <v-toolbar-title>我的圈子</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <v-flex class="mt-3 ml-2" md1 sm2 xs3>
                <v-text-field
                        clearable
                        label="名字"
                ></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-dialog max-width="500px" v-model="dialog">
                <template v-slot:activator="{ on }">
                    <v-btn class="mb-2" color="primary" dark v-on="on">新朋友</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex md4 sm6 xs12>
                                    <v-text-field label="名字" v-model="editedItem.name"></v-text-field>
                                </v-flex>
                                <v-flex md4 sm6 xs12>
                                    <v-select
                                            :items="types"
                                            label="人脉强度"
                                            v-model="editedItem.type"
                                    ></v-select>
                                </v-flex>
                                <v-flex md4 sm6 xs12>
                                    <v-select
                                            :items="familiars"
                                            label="熟识度"
                                            v-model="editedItem.familiar"
                                    ></v-select>
                                </v-flex>
                                <v-flex md4 sm6 xs12>
                                    <v-select
                                            :items="forces"
                                            label="影响力"
                                            v-model="editedItem.force"
                                    ></v-select>
                                </v-flex>
                                <v-flex md4 sm6 xs12>
                                    <v-text-field label="公司" v-model="editedItem.company"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="close" color="blue darken-1" flat>关闭</v-btn>
                        <v-btn @click="save" color="blue darken-1" flat>保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>

        <v-data-table
                :headers="headers"
                :items="friends"
                class="elevation-1"
        >
            <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.type }}</td>
                <td class="text-xs-right">{{ props.item.familiar }}</td>
                <td class="text-xs-right">{{ props.item.force }}</td>
                <td class="text-xs-right">{{ props.item.company }}</td>
                <td class="justify-center layout px-0">
                    <v-icon
                            @click="editItem(props.item)"
                            class="mr-2"
                            small
                    >
                        edit
                    </v-icon>
                    <v-icon
                            @click="deleteItem(props.item)"
                            small
                    >
                        delete
                    </v-icon>
                </td>
            </template>
            <template v-slot:no-data>
                <v-btn @click="initialize" color="primary">Reset</v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    export default {
        data: () => ({
            dialog: false,
            headers: [
                {
                    text: '名字',
                    align: 'left',
                    // sortable: false,
                    value: 'name'
                },
                {text: '人脉强度', value: 'type', align: 'right'},
                {text: '熟识度', value: 'familiar', align: 'right'},
                {text: '影响力', value: 'force', align: 'right'},
                {text: '公司', value: 'company', align: 'right'},
                {text: '操作', value: 'action', sortable: false, align: 'center'}
            ],
            friends: [],
            types: ['密友', '好友', '朋友'],
            familiars: ['熟', '一般', '生'],
            forces: ['强', '中', '弱'],
            editedIndex: -1,
            editedItem: {
                name: '',
                type: 0,
                familiar: 0,
                force: 0,
                company: 0
            },
            defaultItem: {
                name: '',
                type: 0,
                familiar: 0,
                force: 0,
                company: ""
            },
            api_url: "http://cs.cx"
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? '新朋友' : '老朋友'
            }
        },

        watch: {
            dialog(val) {
                val || this.close()
            }
        },

        created() {
            this.initialize()
        },

        methods: {
            initialize() {
                var that = this;
                const http = require('axios');
                http.get(this.api_url + '/friends?access-token=100-token')
                    .then(function (response) {
                        // handle success
                        that.friends = response.data;
                        console.log(response);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    });
            },

            editItem(item) {
                this.editedIndex = this.friends.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.friends.indexOf(item);
                if (confirm('确定删除此好友?')) {
                    const http = require('axios');
                    http.delete(this.api_url + '/friends/' + this.friends[index]['_id'] + '?access-token=100-token')
                        .then(function (response) {
                            // handle success
                            console.log(response);
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        });

                    this.friends.splice(index, 1)
                }
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                }, 300)
            },

            save() {
                var that = this;
                const http = require('axios');
                if (this.editedIndex > -1) {
                    Object.assign(this.friends[this.editedIndex], this.editedItem);

                    http.put(this.api_url + '/friends/' + this.friends[this.editedIndex]['_id'] + '?access-token=100-token', this.editedItem)
                        .then(function (response) {
                            // handle success
                            console.log(response);
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        });

                } else {
                    http.post(this.api_url + '/friends?access-token=100-token', this.editedItem)
                        .then(function (response) {
                            // handle success
                            that.friends.push(response.data);

                            console.log(response);
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        });
                }
                this.close()
            }
        }
    }
</script>

<style>

</style>
