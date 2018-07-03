<template>
  <div>
    <header class="white-bg">
    </header>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import { Api } from '@/services';

export default {
  name: 'app',
  data () {
    return {

    }
  },
  mounted(){
    // Api.getPurchases();
  }
}
</script>

<style>

</style>
