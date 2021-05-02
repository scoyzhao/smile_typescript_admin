
import {http } from './http'
// * 登录
export const login = (params = {}) => http.post('admin/user/login', { ...params })

// * 获取社区名字
export const getCommiteNameById = (params = {}) => http.post('admin/commite/getCommiteNameById', { ...params })
// * 获取当前月订单
export const getOrderListByCommiteIdAndTime = (params = {}) => http.post('admin/mealOrder/getOrderListByCommiteIdAndTime', { ...params })
// * 获取社区列表
export const getCommiteInfo = (params = {}) => http.post('admin/commite/getCommiteInfo', { ...params })
// * 社区操作
export const addCommite = (params = {}) => http.post('admin/commite/addCommite', { ...params })
export const deleteCommite = (params = {}) => http.post('admin/commite/deleteCommite', { ...params })
export const editCommite = (params = {}) => http.post('admin/commite/editCommite', { ...params })
// * 社区人员管理
export const getCommiteUserList = (params = {}) => http.post('admin/user/getCommiteUserList', { ...params })
export const editUser = (params = {}) => http.post('admin/user/editUser', { ...params })
export const modifyPassword = (params = {}) => http.post('admin/user/modifyPassword', { ...params })
// * 社区工作人员管理
export const getWorkerList = (params = {}) => http.get('admin/worker/getWorkerList', { ...params })
export const addWorker = (params = {}) => http.post('admin/worker/addWorker', { ...params })
export const deleteWorker = (params = {}) => http.post('admin/worker/deleteWorker', { ...params })
export const editWorker = (params = {}) => http.post('admin/worker/editWorker', { ...params })
// * 商品相关
export const getGoodsList = (params = {}) => http.get('admin/goods/getGoodsList', { ...params })
export const deleteGood = (params = {}) => http.post('admin/goods/deleteGood', { ...params })
export const editGood = (params = {}) => http.post('admin/goods/editGood', { ...params })
// * 订单相关
export const getMealOrderList = (params = {}) => http.post('admin/mealOrder/getOrderList', { ...params })
export const editMealOrder = (params = {}) => http.post('admin/mealOrder/editOrder', { ...params })
export const getLifeOrderList = (params = {}) => http.post('admin/lifeOrder/getOrderList', { ...params })
export const editLifeOrder = (params = {}) => http.post('admin/lifeOrder/editOrder', { ...params })
// * 菜单相关
export const getMenuList = (params = {}) => http.get('admin/menu/getMenuList', { ...params })
export const editMenu = (params = {}) => http.post('admin/menu/editMenu', { ...params })
