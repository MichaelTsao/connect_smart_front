<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
          <span>人脉挖掘</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
        <Friends/>
    </v-content>
  </v-app>
</template>

<script>
    import Friends from './components/Friends'

    export default {
  name: 'App',
  components: {
      Friends
  },
  data () {
    return {
      //
    }
  }
}
</script>
