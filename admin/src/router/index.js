import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  },

  {
    path: '/girls',
    component: Layout,
    redirect: '/girls/list',
    name: 'Girls',
    meta: { title: '妹子们', icon: 'girl' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/list/index'),
        meta: { title: '列表', icon: 'list' }
      },
      {
        path: 'detail',
        name: 'Detail',
        hidden: true,
        component: () => import('@/views/list/detail/index'),
        meta: { title: '详情', icon: 'tree' }
      },
      {
        path: 'chart',
        name: 'Chart',
        component: () => import('@/views/list/chart/index'),
        meta: { title: '图表', icon: 'chart' }
      }
    ]
  },

  {
    path: '/spider',
    component: Layout,
    name: 'Spider',
    redirect: '/spider/status',
    meta: { title: '爬取设置', icon: 'spider' },
    children: [
      {
        path: 'status',
        name: 'SpiderStatus', // 命中vue文件名字 进行缓存 （socket页-保活）
        component: () => import('@/views/spider/index'),
        meta: { title: '爬取状态', icon: 'status' }
      },
      {
        path: 'ip',
        name: 'Ip',
        component: () => import('@/views/spider/ip/index'),
        meta: { title: '代理IP', icon: 'ip' }
      },
      {
        path: 'config',
        name: 'Config',
        component: () => import('@/views/spider/config/index'),
        meta: { title: '参数配置', icon: 'config' }
      }
    ]
  },

  {
    path: '/permission',
    component: Layout,
    // redirect: '/settings/menu1',
    name: 'Permission',
    meta: {
      title: '权限管理',
      icon: 'permission'
    },
    children: [
      {
        path: 'admin',
        component: () => import('@/views/permission/admin/index'),
        name: 'Admin',
        meta: { title: '管理员列表', icon: 'admin' }
      },
      {
        path: 'role',
        name: 'Role',
        hidden: true,
        component: () => import('@/views/permission/role/index'),
        meta: { title: '角色列表', icon: 'role' }
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    redirect: '/log/index',
    name: 'Log',
    meta: {
      title: '日志记录',
      icon: 'log'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/log/visit/index'),
        name: 'LogIndex',
        meta: { title: '访问日志', icon: 'visit' }
      },
      {
        path: 'error',
        name: 'LogError',
        hidden: true,
        component: () => import('@/views/log/error/index'),
        meta: { title: '错误日志', icon: 'error' }
      },
      {
        path: 'file',
        name: 'LogFile',
        component: () => import('@/views/log/file/index'),
        meta: { title: '日志文件', icon: 'log_file' }
      }
    ]
  },
  {
    path: '/center',
    component: Layout,
    // redirect: '/center/index',
    name: 'Center',
    meta: {
      title: '个人中心',
      icon: 'center'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/center/index'),
        name: 'InfoIndex',
        meta: { title: '我的信息', icon: 'center' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '多层网',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [{
      path: 'https://github.com/Xu-Angel/Girl',
      meta: { title: '查看Github', icon: 'link' }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
