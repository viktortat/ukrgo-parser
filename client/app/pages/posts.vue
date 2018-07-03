<template>
  <div>
    <Post v-for="post in posts" :post="post"></Post>
  </div>
</template>

<script>
import router from '@/router'
import { Api } from '@/services'
import Post from '@/tpl/post-row'

export default {
  components: { Post },
  data() {
    return {
      posts: [{
        "id": "12602502",
        "date": "2018-06-23T22:13:00+03:00",
        "url": "http://kiev.ukrgo.com/post_12602502_23_i_24_ijunja_2018_goda_samaja_luchshaja_cena_na_iphone_x_8000_grn..html",
        "title": "Iphone X",
        "img": "http://kiev.ukrgo.com/./img/no-photo.jpg",
        "images": [],
        "phones": ["0633437506"]
      }]
    }
  }
}
</script>

<style lang="css"></style>
