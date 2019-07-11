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
                        @change="getItems"
                        clearable
                        label="名字"
                        v-model="searchName"
                ></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-dialog max-width="1000px" v-model="dialog">
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
                                <!--                                关系信息-->
                                <v-flex md3 sm6 xs12>
                                    <v-text-field
                                            label="名字"
                                            v-model="editedItem.name"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex md2 sm6 xs12>
                                    <v-select
                                            :items="types"
                                            label="人脉强度"
                                            v-model="editedItem.type"
                                    ></v-select>
                                </v-flex>
                                <v-flex md2 sm6 xs12>
                                    <v-select
                                            :items="familiars"
                                            label="熟识度"
                                            v-model="editedItem.familiar"
                                    ></v-select>
                                </v-flex>
                                <v-flex md2 sm6 xs12>
                                    <v-select
                                            :items="forces"
                                            label="影响力"
                                            v-model="editedItem.force"
                                    ></v-select>
                                </v-flex>
                                <v-flex md3 sm6 xs12>
                                    <v-menu offset-y v-model="showMenu.relation">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                    @keyup="queryForKeywords('relation', 'editedItem.relation', $event)"
                                                    label="关系点"
                                                    v-model="editedItem.relation"
                                            ></v-text-field>
                                        </template>
                                        <v-list>
                                            <v-list-tile
                                                    :key="index"
                                                    @click="setKeyword('relation', 'editedItem.relation', index)"
                                                    v-for="(item, index) in suggestKeywords"
                                            >
                                                <v-list-tile-title>{{ item }}</v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
                                </v-flex>

                                <!--                                公司信息-->
                                <v-flex md4 sm6 xs12>
                                    <v-menu offset-y v-model="showMenu.company">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                    @keyup="queryForKeywords('company', 'editedItem.company', $event)"
                                                    label="公司"
                                                    v-model="editedItem.company"
                                            ></v-text-field>
                                        </template>
                                        <v-list>
                                            <v-list-tile
                                                    :key="index"
                                                    @click="setKeyword('company', 'editedItem.company', index)"
                                                    v-for="(item, index) in suggestKeywords"
                                            >
                                                <v-list-tile-title>{{ item }}</v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
                                </v-flex>
                                <v-flex md4 sm6 xs12>
                                    <v-menu offset-y v-model="showMenu.position">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                    @keyup="queryForKeywords('position', 'editedItem.position', $event)"
                                                    label="职位"
                                                    v-model="editedItem.position"
                                            ></v-text-field>
                                        </template>
                                        <v-list>
                                            <v-list-tile
                                                    :key="index"
                                                    @click="setKeyword('position', 'editedItem.position', index)"
                                                    v-for="(item, index) in suggestKeywords"
                                            >
                                                <v-list-tile-title>{{ item }}</v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
                                </v-flex>
                                <v-flex md4 sm6 xs12>
                                    <v-menu offset-y v-model="showMenu.industry">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                    @keyup="queryForKeywords('industry', 'editedItem.industry', $event)"
                                                    label="行业"
                                                    v-model="editedItem.industry"
                                            ></v-text-field>
                                        </template>
                                        <v-list>
                                            <v-list-tile
                                                    :key="index"
                                                    @click="setKeyword('industry', 'editedItem.industry', index)"
                                                    v-for="(item, index) in suggestKeywords"
                                            >
                                                <v-list-tile-title>{{ item }}</v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
                                </v-flex>

                                <!--                                个人信息-->
                                <v-flex md2 sm6 xs12>
                                    <v-menu offset-y v-model="showMenu.location">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                    @keyup="queryForKeywords('location', 'editedItem.location', $event)"
                                                    label="地区"
                                                    v-model="editedItem.location"
                                            ></v-text-field>
                                        </template>
                                        <v-list>
                                            <v-list-tile
                                                    :key="index"
                                                    @click="setKeyword('location', 'editedItem.location', index)"
                                                    v-for="(item, index) in suggestKeywords"
                                            >
                                                <v-list-tile-title>{{ item }}</v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
                                </v-flex>
                                <v-flex md2 sm6 xs12>
                                    <v-select
                                            :items="gender"
                                            label="性别"
                                            v-model="editedItem.gender"
                                    ></v-select>
                                </v-flex>
                                <v-flex md3 sm6 xs12>
                                    <v-menu offset-y v-model="showMenu.birthday">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                    @keyup="queryForKeywords('birthday', 'editedItem.birthday', $event)"
                                                    label="生日"
                                                    v-model="editedItem.birthday"
                                            ></v-text-field>
                                        </template>
                                        <v-list>
                                            <v-list-tile
                                                    :key="index"
                                                    @click="setKeyword('birthday', 'editedItem.birthday', index)"
                                                    v-for="(item, index) in suggestKeywords"
                                            >
                                                <v-list-tile-title>{{ item }}</v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
                                </v-flex>
                                <v-flex md2 sm6 xs12>
                                    <v-menu offset-y v-model="showMenu.hometown">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                    @keyup="queryForKeywords('hometown', 'editedItem.hometown', $event)"
                                                    label="家乡"
                                                    v-model="editedItem.hometown"
                                            ></v-text-field>
                                        </template>
                                        <v-list>
                                            <v-list-tile
                                                    :key="index"
                                                    @click="setKeyword('hometown', 'editedItem.hometown', index)"
                                                    v-for="(item, index) in suggestKeywords"
                                            >
                                                <v-list-tile-title>{{ item }}</v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
                                </v-flex>
                                <v-flex md3 sm6 xs12>
                                    <v-text-field
                                            label="手机号"
                                            v-model="editedItem.phone"
                                    ></v-text-field>
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
                :rows-per-page-items='[10,25,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}]'
        >
            <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ typeDict[props.item.type] }}</td>
                <td class="text-xs-right">{{ familiarDict[props.item.familiar] }}</td>
                <td class="text-xs-right">{{ forceDict[props.item.force] }}</td>
                <td class="text-xs-right">{{ props.item.company }}</td>
                <td class="text-xs-right">{{ props.item.relation }}</td>
                <td class="text-xs-right">{{ props.item.location }}</td>
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
                {text: '关系点', value: 'relation', align: 'right'},
                {text: '地区', value: 'location', align: 'right'},
                {text: '操作', value: 'action', sortable: false, align: 'center'}
            ],
            friends: [],
            types: [{value: 3, text: '密友'}, {value: 2, text: '好友'}, {value: 1, text: '朋友'}],
            familiars: [{value: 3, text: '熟'}, {value: 2, text: '一般'}, {value: 1, text: '生'}],
            forces: [{value: 3, text: '强'}, {value: 2, text: '中'}, {value: 1, text: '弱'}],
            gender: [{value: 1, text: '男'}, {value: 2, text: '女'}],
            editedIndex: -1,
            editedItem: {
                name: '',
                type: 0,
                familiar: 0,
                force: 0,
                company: '',
                position: '',
                industry: '',
                location: '',
                gender: 0,
                phone: '',
                birthday: '',
                hometown: '',
                relation: ''
            },
            defaultItem: {
                name: '',
                type: 0,
                familiar: 0,
                force: 0,
                company: "",
                position: "",
                industry: "",
                location: '',
                gender: 0,
                phone: '',
                birthday: '',
                hometown: '',
                relation: ''
            },
            searchName: '',
            suggestKeywords: [],
            showMenu: {
                relation: false,
                location: false,
                position: false,
                industry: false,
                birthday: false,
                hometown: false,
                company: false
            },
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? '新朋友' : '老朋友'
            },

            typeDict() {
                return this.selectToDict(this.types)
            },

            familiarDict() {
                return this.selectToDict(this.familiars)
            },

            forceDict() {
                return this.selectToDict(this.forces)
            }
        },

        watch: {
            dialog(val) {
                val || this.close()
            }
        },

        created() {
            this.initialize();
        },

        methods: {
            selectToDict(select) {
                let dict = {0: '未知'};
                for (let key in select) {
                    dict[select[key]['value']] = select[key]['text']
                }
                return dict;
            },

            queryForKeywords: function (type, key, event) {
                let that = this;
                const http = require('axios');

                let value = eval('this.' + key);
                if (typeof value == 'undefined') {
                    value = '';
                }
                http.get(process.env.VUE_APP_API_URL + '/friends/suggest/' + type + '/' + encodeURI(value) + '?access-token=100-token')
                    .then(function (response) {
                        that.suggestKeywords = response.data;
                        // console.log(response);

                        that.$nextTick(() => {
                            eval('that.showMenu.' + type + ' = true');
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            setKeyword: function (type, key, index) {
                eval("this." + key + "='" + this.suggestKeywords[index] + "'");
            },

            initialize() {
                this.getItems();
            },

            getItems() {
                let that = this;
                const http = require('axios');

                if (!this.searchName) {
                    this.searchName = ''
                }

                http.get(process.env.VUE_APP_API_URL + '/friends?access-token=100-token&name=' + this.searchName)
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
                    http.delete(process.env.VUE_APP_API_URL + '/friends/' + this.friends[index]['_id'] + '?access-token=100-token')
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
                this.dialog = false;
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

                    http.put(process.env.VUE_APP_API_URL + '/friends/' + this.friends[this.editedIndex]['_id'] + '?access-token=100-token', this.editedItem)
                        .then(function (response) {
                            // handle success
                            console.log(response);
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        });

                } else {
                    http.post(process.env.VUE_APP_API_URL + '/friends?access-token=100-token', this.editedItem)
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
