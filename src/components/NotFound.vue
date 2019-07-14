<template>
    <v-card>
        <v-card-text>
            <div class="text-xs-center">
                <img src="../assets/robot-error.webp">
                <h3 class="headline mb-0">走丢了？找个朋友帮你吧~~</h3>
                <v-btn color="orange" flat to="/friends">找朋友</v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "NotFound"
    }
</script>

<style scoped>

</style>