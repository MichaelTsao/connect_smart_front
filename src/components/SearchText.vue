<template>
    <v-menu offset-y v-model="showMenu">
        <template v-slot:activator="{ on }">
            <v-text-field
                    :label="name"
                    @keyup="queryForKeywords()"
                    v-model="content"
            ></v-text-field>
        </template>
        <v-list>
            <v-list-item
                    :key="index"
                    @click="setKeyword(index)"
                    v-for="(item, index) in suggestKeywords"
            >
                <v-list-item-title v-if="type === 'name'">{{item.name}}({{item.company}})</v-list-item-title>
                <v-list-item-title v-else>{{item}}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
    export default {
        name: "SearchText",
        props: ['type', 'name', 'values', 'models'],
        data: function () {
            return {
                content: this.values,
                showMenu: false,
                suggestKeywords: [],
            }
        },
        watch: {
            values: function (val) {
                if (this.type !== 'name') {
                    this.content = val;
                }
            }
        },
        computed: {
            model() {
                return typeof this.models === 'undefined' ? 'friends' : this.models;
            }
        },
        methods: {
            queryForKeywords: function () {
                let that = this;

                if (typeof this.content == 'undefined') {
                    this.content = '';
                }

                this.$emit('update:values', this.content);

                let url = '';
                if (this.type === "name") {
                    url = process.env.VUE_APP_API_URL + '/' + this.model + '?access-token=100-token&name=' + encodeURI(this.content);
                } else {
                    url = process.env.VUE_APP_API_URL + '/' + this.model + '/suggest/' + this.type + '/' + encodeURI(this.content) + '?access-token=100-token';
                }
                this.$http.get(url)
                    .then(function (response) {
                        that.suggestKeywords = response.data;
                        // console.log(response);

                        if (typeof response.data !== 'undefined' && response.data.length > 0) {
                            that.$nextTick(() => {
                                that.showMenu = true;
                            });
                        } else {
                            that.showMenu = false;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            setKeyword: function (index) {
                let item = this.suggestKeywords[index];
                if (this.type === 'name') {
                    this.content = '';
                    this.$emit('choose-value', this.type, item);
                } else {
                    this.content = item;
                    this.$emit('update:values', item);
                }
            },
        }
    }
</script>

<style scoped>

</style>