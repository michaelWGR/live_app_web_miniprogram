// const BASE_URL = "http://10.10.117.71:8998"  //本地测试地址
//const BASE_URL = "https://appminip-test.61draw.com" //测试环境地址
const BASE_URL = "https://appminip.61draw.com"         //正式环境地址
//const BASE_URL = 'http://10.60.7.187:8998'//预发布
// const IMG_BASEURL = "http://10.10.117.177:3000/images/"; //本地图片地址
//const IMG_BASEURL = "https://appdev.61draw.com/dev_test/miniprogram/"  //测试环境图片地址
const IMG_BASEURL = "http://appminip.61draw.com/res/images/"; //正式环境图片地址
const ENV = 'PROD';//环境变量；生产环境：'PROD'


/**
 * 时间格式转换
 * flat:分隔字符串，默认以中文分隔
 * zeroize: 是否补零
 *  */
const formatTime = (timeStamp, flag='ch', zeroize=false) => {
  var date = new Date(Number(timeStamp));
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  if(zeroize){
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    hour = hour < 10 ? '0' + hour : hour
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
  }
  if(flag === 'ch') {
    return `${year}年${month}月${day}日`;
  }else{
    return year + flag + month + flag + day
  }
  

  //精确到秒
  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/** 秒转分:秒 */
const secondToMin = (s) => {
  //将秒数除以60，然后下舍入，既得到分钟数
  var m = Math.floor(s / 60);
  //取得秒%60的余数，既得到秒数
  var s = s % 60;
  //将变量转换为字符串
  m += '';
  s += '';
  //如果只有一位数，前面增加一个0
  m = (m.length == 1) ? '0' + m : m;
  s = (s.length == 1) ? '0' + s : s;
  return m + ':' + s;
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

/**
 * @author Chowin
 * @description 得到两个数组的交集，两个数组的元素为数值或字符串
 * @param arr1 {Array}
 * @param arr2 {Array}
 * @returns {Array}
 */
export const getIntersection = (arr1, arr2) => {
  let len = Math.min(arr1.length, arr2.length);
  let i = -1;
  let res = [];
  while (++i < len) {
    const item = arr2[i];
    if (arr1.indexOf(item) > -1) {
      res.push(item);
    }
  }
  return res;
}

/**
 * @description 获取页面高度
 * @param id {String} 页面id
 * @param this {Object} 页面this
 * @returns {Array}
 */

 const getPageHeight = ({id, page}) => {
   return new Promise((resolve, reject) => {
    let systemInfo = wx.getSystemInfoSync();
    const query =  page.createSelectorQuery()
    query.select(id).boundingClientRect()
    query.exec(res => {
      resolve(res[0].height - systemInfo.windowHeight)
    })
   })
 }



module.exports = {
  baseUrl: BASE_URL,
  img_baseUrl: IMG_BASEURL,
  formatTime: formatTime,
  secondToMin: secondToMin,
  qs: qs,
  getPageHeight: getPageHeight,
  env: ENV
}

