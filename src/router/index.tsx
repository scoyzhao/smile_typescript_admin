import React from 'react'
import { Route } from 'react-router-dom'
import loadable from '@loadable/component'

const Layout = loadable(() => import('../common/layout'))
const Login = loadable(() => import('../pages/login'))
const Home = loadable(() => import('../pages/home'))
const CommiteManage = loadable(() => import('../pages/commite-manage'))
const UserManage = loadable(() => import('../pages/user-manage'))
const WorkerManage = loadable(() => import('../pages/worker-manage'))
const Goods = loadable(() => import('../pages/goods'))
const LifeOrder = loadable(() => import('../pages/lifeOrder'))
const MealOrder = loadable(() => import('../pages/mealOrder'))
// export interface routeType {
//   path: string,
//   component: React.SFC
// }

export const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/commite-manage',
        component: CommiteManage,
      },
      {
        path: '/user-manage',
        component: UserManage,
      },
      {
        path: '/worker-manage',
        component: WorkerManage,
      },
      {
        path: '/goods',
        component: Goods,
      },
      {
        path: '/life-order',
        component: LifeOrder,
      },
      {
        path: '/meal-order',
        component: MealOrder,
      },
      {
        path: '/',
        component: Home
      }
    ]
  }
]

export function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={props => <route.component {...props } {...route} /> }
    />
  )
}
