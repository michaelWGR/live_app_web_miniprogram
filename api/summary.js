const request = require('../utils/request.js')
const app = getApp();
const util = require('./../utils/util')

/** 用户基本信息 */
const getUserInfo = (params, token) => {
  return request.get('/v1/report/getUserInfo', params, token);
}

/** 用户课程阶段 */
const getLevelStage = (params, token) => {
  return request.get('/v1/report/getLevelStage', params, token);
}

/** 用户创作作品数 */
const getCommitClassTime = (params, token) => {
  return request.get('/v1/report/getCommitClassTime', params, token);
}

/** 用户累积时长 */
const getAccumulativeTime = (params, token) => {
  return request.get('/v1/report/getAccumulativeTime', params, token);
}

/** 用户阶段进度 */
const getStageReportSchedule = (params, token) => {
  return request.get('/v1/report/getStageReportSchedule', params, token);
}

/** 用户能力提升 */
const getAbilityPromotion = (params, token) => {
  return request.get('/v1/report/getAbilityPromotion', params, token);
}

/** 用户老师评语 */
const getTeacherComment = (params, token) => {
  return request.get('/v1/report/getTeacherComment', params, token);
}

/** 用户点赞老师评语 */
const teacherPraise = (params, token) => {
  return request.post('/v1/report/teacherPraise?teacherCommentId=' + params.teacherCommentId, params, token);
}

/** 用户取消点赞老师评语 */
const teacherCancelPraise = (params, token) => {
  return request.post('/v1/report/teacherCancelPraise?teacherCommentId=' + params.teacherCommentId, params, token);
}

/** 获取奖杯总数*/
const getTrophyNum = (params, token) => {
  return request.get('/v1/report/getTrophyNum', params, token);
}

/** 获取二维码*/
const test123 = (params, token) => {
  return request.get('/v1/report/test123', params, token);
}

/** 获取综合能力评估*/
const getSynthesisAbility = (params, token) => {
  return request.get('/v1/report/getSynthesisAbility', params, token);
}

/** 埋点*/
const postScaleData = (data, token) => {
  const params = util.qs(data)
  return request.post('/v1/report/postScaleData' + params, {}, token);
}

module.exports = {
  getUserInfo,
  getLevelStage,
  getCommitClassTime,
  getAccumulativeTime,
  getStageReportSchedule,
  getAbilityPromotion,
  getTeacherComment,
  teacherPraise,
  teacherCancelPraise,
  getTrophyNum,
  getSynthesisAbility,
  postScaleData,
  test123
}