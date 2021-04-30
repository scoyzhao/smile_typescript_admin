import {
  HomeOutlined,
  EditOutlined,
  TagsOutlined,
  MessageOutlined,
  IssuesCloseOutlined,
  ProjectOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';
export interface menuType {
  title: string,
  key: string,
  icon?: any,
  path?: string,
  children?: menuType[]
}

export const menuConfig:menuType[] = [
  {
    title: 'HOME',
    key: 'home',
    icon: HomeOutlined,
    path: '/',
  },
  {
    title: '社区管理',
    key: 'commite-manage',
    icon: HomeOutlined,
    path: '/commite-manage',
  },
  {
    title: '用户管理',
    key: 'user-manage',
    icon: HomeOutlined,
    path: '/user-manage',
  },
  {
    title: '工作人员管理',
    key: 'worker-manage',
    icon: HomeOutlined,
    path: '/worker-manage',
  },
  {
    title: '商品列表',
    key: 'goods',
    icon: HomeOutlined,
    path: '/goods',
  },
  {
    title: '社区订餐',
    key: 'meal-order',
    icon: HomeOutlined,
    path: '/meal-order',
  },
  {
    title: '生活订单',
    key: 'life-order',
    icon: HomeOutlined,
    path: '/life-order',
  },
]
