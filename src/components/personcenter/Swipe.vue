<template>
    <div>
      <swipeout>
        <swipeout-item v-for="d in data" :key="d.id">
          <div slot="right-menu">
            <swipeout-button @click.native="onButtonClick('fav')" type="primary">删除</swipeout-button>
          </div>
          <div slot="content" class="demo-content vux-1px-t" style="height: 60px">
            {{d.content}}
          </div>
        </swipeout-item>
      </swipeout>
    </div>
</template>

<script>
import {Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
export default {
  name: "swipe",
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  data(){
    return {
      data: [
        {id:1, content:'111111111111'},

        {id:2, content:'222222222222'},

        {id:3, content:'333333333333'},

        {id:4, content:'444444444444'},

        {id:5, content:'555555555555'},

        {id:6, content:'666666666666'},

        {id:7, content:'777777777777'},

        {id:8, content:'888888888888'},

        {id:9, content:'999999999999'},

        {id:10, content:'10101010101'},

        {id:11, content:'12121212121'},

        {id:12, content:'13131313133'}
      ]
    }
  }
}
</script>

<style scoped>

</style>
