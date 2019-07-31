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
                <v-list-item-title>{{item}}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
    export default {
        name: "SearchText",
        props: ['type', 'name', 'values'],
        data: function () {
            return {
                content: this.values,
                showMenu: false,
                suggestKeywords: [],
            }
        },
        methods: {
            queryForKeywords: function () {
                let that = this;

                if (typeof this.content == 'undefined') {
                    this.content = '';
                }
                this.$http.get(process.env.VUE_APP_API_URL + '/friends/suggest/' + this.type + '/' + encodeURI(this.content) + '?access-token=100-token')
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
                this.content = this.suggestKeywords[index];
                this.$emit('choose-value', this.type, this.content);
            },
        }
    }
</script>

<style scoped>

</style>