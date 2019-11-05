const env = require('./../util.js').env
const appKey = env === 'TEST' ? '326E130E8F1945FAB90DED59CE04D76F' : 'F54706FA53104CAE8881B576D72329D6'
exports.config = {
  appkey: appKey,
  appName: 'stageReport',
  versionName: 'talking-data',
  versionCode: '1.0.0',
  wxAppid: 'wx9e4e7177092de21a',
  getLocation: false, // 默认不获取用户位置
  autoOnPullDownRefresh: false, // 默认不统计下拉刷新数据
  autoOnReachBottom: false // 默认不统计页面触底数据
};
