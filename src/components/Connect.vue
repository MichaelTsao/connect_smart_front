<template>
    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item
                :color="colors[index] + ' lighten-1'"
                :key="index"
                fill-dot
                :left="sides[index]"
                :right="!sides[index]"
                v-for="(item, index) in connects"
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
</template>

<script>
    export default {
        name: "Connect",
        data: () => ({
            connects: [
                {
                    "_id": "5d3d96523b9e5330bd14ca92",
                    "type": "聚会",
                    "startDate": "2019-07-11",
                    "endDate": "2019-07-12",
                    "friends": [
                        "5cf0f5230af46ccb8e4c6ee3",
                        "5cf0f5230af46ccb8e4c6111",
                    ]
                },
                {
                    "_id": "5d3d96523b9e5330bd14ca92",
                    "type": "吃饭",
                    "startDate": "2019-07-11",
                    "endDate": "2019-07-12",
                    "friends": [
                        "5cf0f5230af46ccb8e4c6ee3"
                    ]
                },
                {
                    "_id": "5d3d96523b9e5330bd14ca92",
                    "type": "聚会",
                    "startDate": "2019-07-11",
                    "endDate": "2019-07-12",
                    "friends": [
                        "5cf0f5230af46ccb8e4c6ee3"
                    ]
                },
                {
                    "_id": "5d3d96523b9e5330bd14ca92",
                    "type": "聚会",
                    "startDate": "2019-07-11",
                    "endDate": "2019-07-12",
                    "friends": [
                        "5cf0f5230af46ccb8e4c6ee3"
                    ]
                },
                {
                    "_id": "5d3d96523b9e5330bd14ca92",
                    "type": "聚会",
                    "startDate": "2019-07-11",
                    "endDate": "2019-07-12",
                    "friends": [
                        "5cf0f5230af46ccb8e4c6ee3",
                        "5cf0f5230af46ccb8e4c6111",
                    ]
                },
                {
                    "_id": "5d3d96523b9e5330bd14ca92",
                    "type": "吃饭",
                    "startDate": "2019-07-11",
                    "endDate": "2019-07-12",
                    "friends": [
                        "5cf0f5230af46ccb8e4c6ee3"
                    ]
                },
                {
                    "_id": "5d3d96523b9e5330bd14ca92",
                    "type": "聚会",
                    "startDate": "2019-07-11",
                    "endDate": "2019-07-12",
                    "friends": [
                        "5cf0f5230af46ccb8e4c6ee3"
                    ]
                },
                {
                    "_id": "5d3d96523b9e5330bd14ca92",
                    "type": "聚会",
                    "startDate": "2019-07-11",
                    "endDate": "2019-07-12",
                    "friends": [
                        "5cf0f5230af46ccb8e4c6ee3"
                    ]
                },
                {
                    "_id": "5d3d96523b9e5330bd14ca92",
                    "type": "聚会",
                    "startDate": "2019-07-11",
                    "endDate": "2019-07-12",
                    "friends": [
                        "5cf0f5230af46ccb8e4c6ee3",
                        "5cf0f5230af46ccb8e4c6111",
                    ]
                },
                {
                    "_id": "5d3d96523b9e5330bd14ca92",
                    "type": "吃饭",
                    "startDate": "2019-07-11",
                    "endDate": "2019-07-12",
                    "friends": [
                        "5cf0f5230af46ccb8e4c6ee3"
                    ]
                },
                {
                    "_id": "5d3d96523b9e5330bd14ca92",
                    "type": "聚会",
                    "startDate": "2019-07-11",
                    "endDate": "2019-07-12",
                    "friends": [
                        "5cf0f5230af46ccb8e4c6ee3"
                    ]
                },
                {
                    "_id": "5d3d96523b9e5330bd14ca92",
                    "type": "聚会",
                    "startDate": "2019-07-11",
                    "endDate": "2019-07-12",
                    "friends": [
                        "5cf0f5230af46ccb8e4c6ee3"
                    ]
                },
            ],
        }),
        created() {
            // this.getItems();
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
            }
        },
    }
</script>

<style scoped>

</style>