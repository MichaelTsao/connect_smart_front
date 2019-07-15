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
                <v-sheet
                        class="d-flex"
                        :color='content.color+" lighten-3"'
                        height="424"
                        elevation=8
                >
                    <sheet-footer>
                        {{content.name}}
                    </sheet-footer>
                </v-sheet>
            </v-flex>


        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            contents: [
                {name: 'aa', color: 'green'},
                {name: 'ab', color: 'yellow'},
                {name: 'ac', color: 'red'},
                {name: 'ad', color: 'teal'},
                {name: 'ae', color: 'purple'},
            ],
        }),
        name: "Stat",
        components: {
            SheetFooter: {
                functional: true,

                render(h, {children}) {
                    return h('v-sheet', {
                        staticClass: 'mt-auto align-center justify-center d-flex',
                        props: {
                            color: 'rgba(0, 0, 0, .36)',
                            dark: true,
                            height: 50
                        }
                    }, children)
                }
            }
        }
    }
</script>

<style scoped>

</style>