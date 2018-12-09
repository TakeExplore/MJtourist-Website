<template>
  <div id="app">
    <div id="fh5co-wrapper">
      <div id="fh5co-page">
        <v-nav></v-nav>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import '../src/common/js/jquery.easing.1.3.js'
  import '../src/common/js/bootstrap.min.js'
  import '../src/common/js/jquery.waypoints.min.js'
  import '../src/common/js/sticky.js'
  // import '../src/common/js/jquery.stellar.min.js'
  import '../src/common/js/hoverIntent.js'
  import '../src/common/js/superfish.js'
  import '../src/common/js/jquery.magnific-popup.min.js'
  import '../src/common/js/magnific-popup-options.js'
  import '../src/common/js/bootstrap-datepicker.min.js'
  import '../src/common/js/classie.js'
  import '../src/common/js/selectFx.js'
  // import '../src/common/js/main.js'

  import navBar from '@/components/navBar/navBar'
  export default {
    name: 'App',
    components:{
      'v-nav':navBar
    }
  }
</script>

<style lang="sass">
  @import '../src/common/sass/style.scss'
  @import '../src/common/css/animate.css'
  @import '../src/common/css/icomoon.css'
  @import '../src/common/css/bootstrap.css'
  @import '../src/common/css/superfish.css'
  @import '../src/common/css/magnific-popup.css'
  @import '../src/common/css/bootstrap-datepicker.min.css'
  @import '../src/common/css/cs-select.css'
  @import '../src/common/css/cs-skin-border.css'
  @import '../src/common/css/style.css'
  /**{*/
    /*margin: 0;*/
    /*padding: 0;*/
    /*font-size: 13px;*/
  /*}*/
  /*#navWrapper{*/

  /*}*/
</style>
