const request = require('../utils/request.js')
const app = getApp();

/** 请求权限 */
const authorize = (params) => {
  return request.post('/v1/applets/signature',params);
}


/**获取作品列表 */
const getWorkList = (params,token) => {
    return request.post('/v1/applets/commentList', params,token)
}

/** 获取作品信息*/
// const getWorkDetail = (params,token) => {
//     return request.post('/v1/applets/commentInfo', params,token)
// }

/** 获取优秀画作基本信息 */
const getWorkDetail = (params,token) => {
  return request.get('/v1/applets/excellentPaint',params,token)
}

/** 点赞||取消点赞 */
const praiseHandle = (params, token) => {
  return request.get('/v1/applets/addPraise', params, token)
}

/** 获取班级作品 */
const getClassHomework = (params, token) => {
  return request.get('/v1/applets/getClassHomework', params, token)
}

/** 获取班级教学时段 */
const getCourseSchedule = (params, token) => {
  return request.get('/v1/applets/getPreHomeworkList',params,token)
}

/** 获取班级课程信息 */
const getCourseBySchedule = (params, token) => {
  return request.get('/v1/applets/getCourseByCondition', params, token)
}

/** 根据课程获取班级作业 */
const getClassHomeworkByCourse = (params, token) => {
  return request.get('/v1/applets/getHomeworks', params, token)
}

const getUserId = (token) => {
  return request.get('/v1/report/getNowUserId', {}, token)
}


module.exports = {
  authorize,
  getWorkList,
  getWorkDetail,
  praiseHandle,
  getClassHomework,
  getCourseSchedule,
  getCourseBySchedule,
  getClassHomeworkByCourse,
  getUserId
}