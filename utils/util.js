// const BASE_URL = "http://10.71.1.9:8998"  //本地测试地址
// const BASE_URL = "https://appminip-test.61draw.com" //测试线地址
const BASE_URL = "https://appminip.61draw.com"         //正式线地址

const IMG_BASEURL = "http://10.10.117.177:3000/images/"; //本地图片地址
// const IMG_BASEURL = "https://appdev.61draw.com/dev_test/miniprogram/"  //测试线图片地址
// const IMG_BASEURL = "http://appminip.61draw.com/res/images/"; //正式线图片地址

/**时间格式转换 */
const formatTime = timeStamp => {
  var date = new Date(timeStamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  
  return `${year}年${month}月${day}日`;

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



module.exports = {
  baseUrl: BASE_URL,
  img_baseUrl: IMG_BASEURL,
  formatTime: formatTime,
  secondToMin: secondToMin,
  qs: qs
}

