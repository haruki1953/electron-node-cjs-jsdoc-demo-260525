interface RouterItem {
  path: string
  name: string
  paramsKey?: Record<string, string>
}

// 路由信息字典，导出以便整个程序中使用
export const routerDict = {
  HomePage: {
    path: '/',
    name: 'HomePage',
  },
  LayoutSimple: {
    path: '/LayoutSimple',
    name: 'LayoutSimple',
  },
} as const satisfies Record<string, RouterItem>
