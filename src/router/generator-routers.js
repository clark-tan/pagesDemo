import Api from '@/api/home'
import { PageLayout, RouteView, BlankLayout } from '@/layouts'

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  PageLayout: PageLayout,
  RouteView: RouteView,
  BlankLayout: BlankLayout,

  '403': () => import(/* webpackChunkName: "error" */ '@/views/exception/403'),
  '404': () => import(/* webpackChunkName: "error" */ '@/views/exception/404'),
  '500': () => import(/* webpackChunkName: "error" */ '@/views/exception/500'),

  // 首页
  home: () => import(/* webpackChunkName: "home" */ `@/views/home/home`),

  // 办事指南
  Guidelines: () => import(/* webpackChunkName: "Guidelines" */ '@/views/guidelines/index'),
  // 通知公告
  Notice: () => import(/* webpackChunkName: "Notice" */ '@/views/notice/index'),
  // 政策法规
  PoliciesAndRegulations: () =>
    import(/* webpackChunkName: "PoliciesAndRegulations" */ '@/views/policiesAndRegulations/index'),
  // 联系我们
  Contact: () => import(/* webpackChunkName: "Contact" */ '@/views/contact/index'),
  // 用户中心
  UserPanel: () => import(/* webpackChunkName: "UserPanel" */ '@/views/userPanel/index'),

  // 修改中
  // 信息公开--接口未开发，暂缓
  InfoPublic: () => import(/* webpackChunkName: "infoPublic" */ '@/views/infoPublic/index'),
  // 测绘机构信息
  YelloPages: () => import(/* webpackChunkName: "yelloPages" */ '@/views/yelloPages/index'),
  // 建议与投诉  此处名称修改位 Suggest => suggestAndComplaint
  SuggestAndComplaint: () => import(/* webpackChunkName: "suggestAndComplaint" */ '@/views/suggestAndComplaint/index'),
  // 预约进场 此处名称修改位 reservationEnter => preAppointment
  PreAppointment: () =>
    import(/* webpackChunkName: "preAppointment" */ '@/views/preAppointment/index'),
  // 测绘单位注册 此处名称修改位 unitCheckIn
  UnitCheckIn: () => import(/* webpackChunkName: "unitCheckIn" */ '@/views/unitCheckIn/index'),
  // 在线报告
  ReportOnline: () => import(/* webpackChunkName: "reportOnline" */ '@/views/reportOnline/index'),
  // 材料补充
  SupplementaryMaterials: () =>
    import(/* webpackChunkName: "supplementaryMaterials" */ '@/views/supplementaryMaterials/index'),
  // 进度查询
  BusinessProcess: () => import(/* webpackChunkName: "businessProcess" */ '@/views/businessProcess/index'),
  // 项目委托
  PreBusiness: () => import(/* webpackChunkName: "preBusiness" */ '@/views/preBusiness/index'),
  // 满意度评价 - 11
  SatisfactionEvaluation: () =>
    import(/* webpackChunkName: "satisfactionEvaluation" */ '@/views/satisfactionEvaluation/index'),
  Evaluation: () => import(/* webpackChunkName: "Evaluation" */ '@/views/Evaluation/index'),

  // 待修改
  // 在线支付
  PayOnline: () => import(/* webpackChunkName: "PayOnline" */ '@/views/payOnline/PayOnline')
}

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true
}

// // 菜单路由
// const menuRouter = {
//   path: '/portal',
//   component: 'BlankLayout',
//   meta: { title: '入口', keepAlive: false },
//   hidden: true,
//   redirect: '/portal/home',
//   children: []
// }

// 首页
const homeRouter = {
  path: '/portal/home',
  name: 'home',
  component: 'home',
  meta: { title: '首页', keepAlive: false, icon: 'onlineOfficeHall-bumen' }
}

// 根级菜单
const rootRouter = {
  key: '',
  name: 'index',
  path: '',
  component: 'PageLayout',
  redirect: '/portal/home',
  children: []
}

/**
 * 动态生成菜单
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = () => {
  return new Promise((resolve, reject) => {
    Api.GetMenuBar()
      .then(res => {
        console.log('res', res)
        const menuNav = []
        const childrenNav = []
        // 处理数据成树状结构并且对齐参数
        listToTree(res.rowsList, childrenNav, 0)
        rootRouter.children = childrenNav
        rootRouter.children.unshift(homeRouter)
        menuNav.push(rootRouter)
        console.log('menuNav', menuNav)
        const asyncRouter = generator(menuNav)
        asyncRouter.push(notFoundRouter)
        console.log('routers', asyncRouter)
        resolve(asyncRouter)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    // if (Window._.isEmpty(item.menuid)) {
    //   notification.error({
    //     message: '无menuid',
    //     description: '请在后台配置menuid'
    //   })
    //   return {
    //     path: '/',
    //     name: '404',
    //     component: constantRouterComponents['notFound'],
    //     meta: {
    //       title: '404',
    //       icon: '@/assets/logo.png',
    //       webicon: '@/assets/logo.png',
    //       intro: '404 not found'
    //     }
    //   }
    // } else {
    //   return {
    //     path: '/portal/' + item.menuid,
    //     name: item.menuid,
    //     component: constantRouterComponents[item.menuid] || constantRouterComponents['notFound'],
    //     meta: {
    //       title: item.title,
    //       icon: item.icon,
    //       webicon: item.webicon,
    //       intro: item.intro
    //     }
    //   }
    // }
    const { title, show, hideChildren, hiddenHeaderContent, target, icon } = item.meta || {}
    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址
      path: item.path || `${(parent && parent.path) || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.key || item.name || '',
      // 该路由对应页面的 组件 :方案1
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
      component: constantRouterComponents[item.component || item.key] || (() => import(`@/views/${item.component}`)),

      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title,
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        target: target,
        permission: item.name,
        intro: item.intro
      }
    }
    // 是否设置了隐藏菜单
    if (show === false) {
      currentRouter.hidden = true
    }
    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (Number(item.parentid) === parentId && item.component_name) {
      const child = {
        ...item,
        meta: {
          title: item.name,
          icon: item.icon
        },
        key: item.component_name || item.title,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, Number(item.id))
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}
