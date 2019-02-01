<template>
  <div>
    <TipsBox></TipsBox>
    <essay></essay>
  </div>
</template>

<script>
  import TipsBox from "../children/tipsBox";
  import essay from "../children/essay";
  export default {
    name: "tripKnow",
    components: {TipsBox,essay},
  }
</script>

<style scoped>

</style>
