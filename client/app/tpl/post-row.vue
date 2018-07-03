<template>
  <div>
    <h2>={{ post.title }}=</h2>
  </div>
</template>

<script>

export default {
  props: {
    post: Object
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.post.title)
  }
}

</script>

<style lang="css"></style>
