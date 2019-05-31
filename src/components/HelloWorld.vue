<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-toolbar color="white" flat>
            <v-toolbar-title>我的圈子</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <v-flex md2 sm2 xs3>
                <v-text-field
                        label="姓名"
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
                                    <v-text-field label="Dessert name" v-model="editedItem.name"></v-text-field>
                                </v-flex>
                                <v-flex md4 sm6 xs12>
                                    <v-text-field label="Calories" v-model="editedItem.calories"></v-text-field>
                                </v-flex>
                                <v-flex md4 sm6 xs12>
                                    <v-text-field label="Fat (g)" v-model="editedItem.fat"></v-text-field>
                                </v-flex>
                                <v-flex md4 sm6 xs12>
                                    <v-text-field label="Carbs (g)" v-model="editedItem.carbs"></v-text-field>
                                </v-flex>
                                <v-flex md4 sm6 xs12>
                                    <v-text-field label="Protein (g)" v-model="editedItem.protein"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="close" color="blue darken-1" flat>Cancel</v-btn>
                        <v-btn @click="save" color="blue darken-1" flat>Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>

        <v-data-table
                :headers="headers"
                :items="desserts"
                class="elevation-1"
        >
            <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td>
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
                {text: '人脉强度', value: 'calories', align: 'right'},
                {text: '熟识度', value: 'fat', align: 'right'},
                {text: '影响力', value: 'carbs', align: 'right'},
                {text: '行业', value: 'protein', align: 'right'},
                {text: '操作', value: 'name', sortable: false, align: 'center'}
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0
            }
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
                this.desserts = [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0
                    },
                    {
                        name: 'Cupcake',
                        calories: 1305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7
                    }
                ]
            },

            editItem(item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                this.close()
            }
        }
    }
</script>

<style>

</style>
