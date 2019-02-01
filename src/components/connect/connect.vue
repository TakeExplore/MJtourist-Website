<template>
  <div>
    <Intro></Intro>
    <essay></essay>
    <Booking></Booking>
  </div>
</template>

<script>
  import Booking from "./booking";
  import Intro from "./intro";
  import essay from "../children/essay"
  export default {
      name: "connect",
      components: {Booking,Intro,essay},

    }
</script>

<style scoped>

</style>
