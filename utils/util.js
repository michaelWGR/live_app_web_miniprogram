// const BASE_URL = "https://appminip-test.61draw.com" //测试线地址
const BASE_URL = "https://appminip.61draw.com"         //正式线地址

// const IMG_BASEURL = "https://appdev.61draw.com/dev_test/miniprogram/"  //测试线图片地址
const IMG_BASEURL = "http://appminip.61draw.com/res/images/"; //正式线图片地址

/**时间格式转换 */
const formatTime = timeStamp => {
  var date = new Date(timeStamp);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  
  return `${year}年${month}月${day}日`;

  //精确到秒
  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**json转query字符串 */
const qs = obj =>{
  if(!obj) return '';
  var params = '?' + Object.keys(obj).map(key=>encodeURIComponent(key) +'='+ encodeURIComponent(obj[key])).join('&');
  return params
}

module.exports = {
  baseUrl: BASE_URL,
  img_baseUrl: IMG_BASEURL,
  formatTime: formatTime,
  qs: qs
}

