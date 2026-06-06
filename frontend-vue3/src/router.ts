import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { routerDict } from './config'

import { LayoutSimple, HomePage } from './views'

// 路由
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      ...routerDict.LayoutSimple,
      component: LayoutSimple,
      redirect: routerDict.HomePage.path,
      children: [
        {
          ...routerDict.HomePage,
          component: HomePage,
        },
      ],
    },
  ],
  // 路由滚动行为定制
  // scrollBehavior: async (to, from, savedPosition) => {}
})

// 路由访问拦截
router.beforeEach((to, from) => {
  // 路由不存在，拦截到首页
  if (router.resolve(to.path).matched.length === 0) {
    return routerDict.HomePage.path
  }
})

// 新页面回到顶部
router.afterEach((to, from) => {
  // 之所以不用 createRouter 中的 scrollBehavior 来控制，是因为 scrollBehavior 会等到组件onMounted后再进行
  // router.afterEach 是在组件setup前进行

  // 路径不变时（query可以改变），不滚动
  if (to.path === from.path) {
    return
  }
  // 回到顶部（不使用页面原生滚动条，使用的是自设的滚动条）
  const appMainElScrollbarWrap = document.querySelector<HTMLElement>(
    '.appMainElScrollbar > .el-scrollbar__wrap'
  )
  appMainElScrollbarWrap?.scrollTo({
    top: 0,
    behavior: 'instant',
  })
})

export default router
