<template>
    <v-container grid-list-xl>
        <v-layout
                flex-child
                wrap
        >
            <v-flex
                    d-flex
                    md4
                    xs12
                    :key="content.name"
                    v-for="content in contents"
            >
                <v-card>
                    <div
                            :id="'pie-'+content.type"
                            style="width: 350px; height:350px; margin-top: 25px; margin-left: 15px"
                    ></div>

                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{ content.name }}</h3>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>


        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Stat",

        data: () => ({
            contents: [
                {name: '关系点', type: 'relation'},
                {name: '行业', type: 'industry'},
                {name: '性别', type: 'gender'},
                {name: '地区', type: 'location'},
            ],
        }),

        mounted() {
            this.drawCharts();
        },

        methods: {
            drawCharts() {
                let echarts = require('echarts');
                const http = require('axios');

                for (let j in this.contents) {
                    let type = this.contents[j].type;
                    http.get(process.env.VUE_APP_API_URL + '/friends/groupby/' + type + '?access-token=100-token')
                        .then(function (response) {
                            let data = [];
                            for (let i in response.data) {
                                data.push({value: response.data[i].count, name: response.data[i]._id})
                            }

                            let myChart = echarts.init(document.getElementById('pie-' + type));
                            let option = {
                                tooltip: {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                                },
                                series: [{
                                    type: 'pie',
                                    name: '关系点',
                                    radius: '55%',
                                    data: data,
                                }]
                            };

                            // 使用刚指定的配置项和数据显示图表。
                            myChart.setOption(option);
                            // console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
        },
    }
</script>

<style scoped>

</style>