<template>
    <v-data-table
            :footer-props="{
                    itemsPerPageOptions: [10,25,-1],
                }"
            :headers="headers"
            :items="friends"
            class="mt-3"
    >
        <template v-slot:top>
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
                <v-flex class="mt-3 ml-2" md2 sm2 xs3>
                    <v-select
                            :items="relations"
                            @change="getItems"
                            label="关系点"
                            v-model="searchRelation"
                    ></v-select>
                </v-flex>
                <v-spacer></v-spacer>
                <v-dialog max-width="1000px" v-model="dialog">
                    <template v-slot:activator="{ on }">
                        <v-btn class="mb-2" color="primary" dark v-on="on">新朋友</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{formTitle}}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <!-- 关系信息 -->
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
                                        <SearchText :values.sync="editedItem.relation" name="关系点"
                                                    type="relation"></SearchText>
                                    </v-flex>

                                    <!-- 公司信息 -->
                                    <v-flex md4 sm6 xs12>
                                        <SearchText :values.sync="editedItem.company" name="公司"
                                                    type="company"></SearchText>
                                    </v-flex>
                                    <v-flex md4 sm6 xs12>
                                        <SearchText :values.sync="editedItem.position" name="职位"
                                                    type="position"></SearchText>
                                    </v-flex>
                                    <v-flex md4 sm6 xs12>
                                        <SearchText :values.sync="editedItem.industry" name="行业"
                                                    type="industry"></SearchText>
                                    </v-flex>

                                    <!-- 个人信息 -->
                                    <v-flex md2 sm6 xs12>
                                        <SearchText :values.sync="editedItem.location" name="地区"
                                                    type="location"></SearchText>
                                    </v-flex>
                                    <v-flex md2 sm6 xs12>
                                        <v-select
                                                :items="gender"
                                                label="性别"
                                                v-model="editedItem.gender"
                                        ></v-select>
                                    </v-flex>
                                    <v-flex md3 sm6 xs12>
                                        <SearchText :values.sync="editedItem.birthday" name="生日"
                                                    type="birthday"></SearchText>
                                    </v-flex>
                                    <v-flex md2 sm6 xs12>
                                        <SearchText :values.sync="editedItem.hometown" name="家乡"
                                                    type="hometown"></SearchText>
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
                            <v-btn @click="close" color="blue darken-1" text>关闭</v-btn>
                            <v-btn @click="save" color="blue darken-1" text>保存</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>

        <template v-slot:item.type="{ value }">
            {{ typeDict[value] }}
        </template>

        <template v-slot:item.familiar="{ value }">
            {{ familiarDict[value] }}
        </template>

        <template v-slot:item.force="{ value }">
            {{ forceDict[value] }}
        </template>

        <template v-slot:item.action="{ item }">
            <v-icon
                    @click="editItem(item)"
                    class="mr-2"
                    small
            >
                mdi-pencil
            </v-icon>
            <v-icon
                    @click="deleteItem(item)"
                    small
            >
                mdi-delete
            </v-icon>
        </template>

        <template v-slot:no-data>
            <v-btn @click="initialize" color="primary">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
    import SearchText from "./SearchText";

    export default {
        components: {
            SearchText,
        },

        data: () => ({
            dialog: false,
            headers: [
                {
                    text: '名字',
                    align: 'left',
                    // sortable: false,
                    value: 'name'
                },
                {text: '人脉强度', value: 'type'},
                {text: '熟识度', value: 'familiar'},
                {text: '影响力', value: 'force'},
                {text: '公司', value: 'company'},
                {text: '关系点', value: 'relation'},
                {text: '地区', value: 'location'},
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
            searchRelation: '',
            suggestKeywords: [],
            relations: [''],
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

            initialize() {
                this.getItems();

                let that = this;
                this.$http.get(process.env.VUE_APP_API_URL + '/friends/groupby/relation?access-token=100-token')
                    .then(function (response) {
                        for (let i in response.data) {
                            that.relations.push(response.data[i]._id)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            getItems() {
                let that = this;

                if (!this.searchName) {
                    this.searchName = ''
                }

                let url = process.env.VUE_APP_API_URL + '/friends?access-token=100-token&per-page=500';
                if (this.searchName) {
                    url += '&name=' + this.searchName;
                }
                if (this.searchRelation) {
                    url += '&relation=' + this.searchRelation;
                }
                this.$http.get(url)
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
                    this.$http.delete(process.env.VUE_APP_API_URL + '/friends/' + this.friends[index]['_id'] + '?access-token=100-token')
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
                if (this.editedIndex > -1) {
                    Object.assign(this.friends[this.editedIndex], this.editedItem);

                    this.$http.put(process.env.VUE_APP_API_URL + '/friends/' + this.friends[this.editedIndex]['_id'] + '?access-token=100-token', this.editedItem)
                        .then(function (response) {
                            // handle success
                            console.log(response);
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        });

                } else {
                    this.$http.post(process.env.VUE_APP_API_URL + '/friends?access-token=100-token', this.editedItem)
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
