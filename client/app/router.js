import Router from 'vue-router'
import Posts from '@/pages/posts'
import Post from '@/pages/post'


export default new Router({
  routes: [
    {
      path: '/',
      name: 'posts',
      component: Posts
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: Post
    }
  ]
})
