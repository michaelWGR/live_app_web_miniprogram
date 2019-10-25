import { abilityList, mockHomeworkList } from './mockData.js'
const util = require('./util.js')
const MAX_ABILITY_LENGTH = 197
function getAbilityData(data) {
  let res = []
  const list = data.length > 7 ? data.slice(0, 7) : data
  const abilityData = list.map((item, idx) => {
    return {
      text: item.question,
      length: Math.floor((item.nowStageTime / 5) * MAX_ABILITY_LENGTH),
      score: item.nowStageTime.toFixed(1),
      idx: idx
    }
  })
  for(let i = 0; i < abilityData.length; i++){
    let arr = []
    arr[0] = {
      type: 'text',
      x: 30,
      y: 557 + abilityData[i].idx * 33,
      text: abilityData[i].text,
      style: {
        width: 100,
        height: 27
      }
    }
    arr[1] = {
      type: 'image',
      x: 120,
      y: 550 + abilityData[i].idx * 33,
      url: `${util.img_baseUrl}/ability.png`,
      style: {
        width: abilityData[i].length,
        height: 27
      }
    }
    arr[2] = {
      type: 'text',
      x: 322,
      y: 558 + abilityData[i].idx * 33,
      text: abilityData[i].score,
      style: {
        width: 40,
        height: 27,
        color: '#FA552E'
      }
    }
    res = [...res, ...arr]
  }
  return res
}

function getPaintingData(data, paintingList) {

  let res = []
  paintingList.forEach((item, idx) => {
    let arr = []
    arr[0] = {
      type: 'text',
      x: 0,
      y: 1460 + idx * 300,
      text: item.courseName,
      style: {
        width: 375,
        fontSize: '16px',
        color: '#ff6c00',
        textAlign: 'center'
      }
    }
    arr[1] = {
      type: 'text',
      x: 0,
      y: 1490 + idx * 300,
      text: `Level ${data.level} stage ${data.stage}-第${item.courseOrder}节课`,
      style: {
        width: 375,
        color: '#666666',
        textAlign: 'center'
      }
    }
    arr[2] = {
      type: 'image',
      x: 80,
      y: 1530 + idx * 300,
      url: `${util.img_baseUrl}/painting.png`,
      style: {
        width: 197,
        height: 197
      }
    }
    res = [...res, ...arr]
  })
  return res
}

function generateCanvasData(data) {
  const abilityData = getAbilityData(abilityList)
  const paintingData = getPaintingData(data, mockHomeworkList)
  // const abilityData = []
  // const paintingData = []
  return [
    {
      // 报告头部图片
      type: 'image',
      x: 0,
      y: 0,
      url: 'http://appminip.61draw.com/res/images/summary-info-banner.png',
      style: {
        width: 375,
        height: 450
      }
    },{
        //level和stage的背景图片 
        type: 'image',
        x: 80,
        y: 130,
        url: 'http://appminip.61draw.com/res/images/summary-info-title.png',
        style: {
          width: 208,
          height: 48
        }
    },{
        //level和stage
        type: 'text',
        x: 135,
        y: 140,
        text: `Level ${data.level} stage${data.stage}`,
        style: {
          color: '#FF5917'
        }
    },{
        // 学生基本信息背景图
        type: 'image',
        x: 30,
        y: 290,
        url: `${util.img_baseUrl}/info-bg.png`,
        style: {
          width: 320,
          height: 172
        }
    },{
        //学生头像
        type: 'radius-image',
        x: 160,
        y: 260,
        url: data.headUrl ? data.headUrl : 'http://appminip.61draw.com/res/images/summary-info-headImage.png',
        style: {
          r: 35
        }
    },{
        // 学生昵称
        type: 'text',
        x: 160,
        y: 340,
        text: data.nickname + '宝贝',
        style: {
          color: '#333333',
          fontSize: '16px',
          fontWeight: 'bold'
        }
    },{
        // 画作总数
        type: 'text',
        x: 78,
        y: 390,
        text: data.homeworkTotal,
        style: {
          color: '#333333',
          fontSize: '14px',
        }
    },{
        // 新增作品数
        type: 'text',
        x: 107,
        y: 378,
        text: `新增${data.stageHomeworkTotal}幅`,
        style: {
          color: '#FF5917',
          fontSize: '12px',
        }
    },{
        // 总时间
        type: 'text',
        x: 210,
        y: 390,
        text: data.totalTime,
        style: {
          color: '#333333',
          fontSize: '14px',
        }
    },{
        // 增加时间
        type: 'text',
        x: 240,
        y: 378,
        text: `新增${data.nowStageTime}分钟`,
        style: {
          color: '#FF5917',
          fontSize: '12px',
        }
    },{
        // 综合能力评估背景
        type: 'image',
        x: 4,
        y: 480,
        url: `${util.img_baseUrl}/ability-bg.png`,
        style: {
          width: 370,
          height: 418
        }
    },
    ...abilityData,
    {
      // 综合能力评估的总结
      type: 'text',
      x: 50,
      y: 810,
      text: data.analysis,
      style: {
        width: 280
      }
    },{
      // 老师评语title背景
      type: 'image',
      x: 80,
      y: 910,
      url: `${util.img_baseUrl}/summary-comment-title.png`,
      style: {
        width: 223,
        height: 59
      }
    },{
      type: 'text',
      x: 134,
      y: 928,
      text: '老师评语',
      style: {
        width: 200,
        color: '#FFFA69',
        fontSize: '18px'
      }
    },{
      // 老师评语背景
      type: 'image',
      x: 1,
      y: 950,
      url: `${util.img_baseUrl}/summary-comment-bg.png`,
      style: {
        width: 375,
        height: 424
      }
    },{
      // 老师头像
      type: 'radius-image',
      x: 163,
      y: 1000,
      url: data.teacherAvatar ? data.teacherAvatar : 'http://appminip.61draw.com/res/images/summary-info-headImage.png',
      style: {
        r: 29
      }
    },{
      // 老师昵称
      type: 'text',
      x: 158,
      y: 1065,
      text: data.teacherName ? data.teacherName : '椰果老师',
      style: {
        fontWeight: 'bold',
        color: '#B27832',
        fontSize: '17px',
      }
    },{
      // 老师评语
      type: 'text',
      x: 60,
      y: 1090,
      text: data.comment ? data.comment : '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      style: {
        width: 280,
        fontSize: '15px',
        color: '#743F00',
        lineHeight: '30px'
      }
    },{
      // 比心图
      type: 'image',
      x: 162,
      y: 1252,
      url: `${util.img_baseUrl}/thanks.png`,
      style: {
        width: 48,
        height: 62
      }
    },{
      // 学生画作title背景
      type: 'image',
      x: 80,
      y: 1370,
      url: `${util.img_baseUrl}/student-painting-title.png`,
      style: {
        width: 223,
        height: 59
      }
    },{
      type: 'text',
      x: 128,
      y: 1385,
      text: '宝贝画作展示',
      style: {
        width: 200,
        color: '#FFFA69',
        fontSize: '18px'
      }
    },{
      // 学生画作背景
      type: 'image',
      x: 0,
      y: 1430,
      url: `${util.img_baseUrl}/painting-bg.png`,
      style: {
        width: 375,
        height: mockHomeworkList.length > 1 ? 650 : 350
      }
    },
    ...paintingData,
    {
      // 奖状背景
      type: 'image',
      x: 2,
      y: mockHomeworkList.length > 1 ? 2100 : 1800,
      url: `${util.img_baseUrl}/certificate-bg.png`,
      style: {
        width: 370,
        height: 415
      }
    },{
      type: 'text',
      x: 73,
      y: mockHomeworkList.length > 1 ? 2334 : 2034,
      text: data.nickname,
      style: {
        width: 200,
        color: '#ff6c00',
        fontSize: '14px'
      }
    },{
      type: 'text',
      x: 92,
      y: mockHomeworkList.length > 1 ? 2363 : 2063,
      text: `Level ${data.level} stage ${data.stage}`,
      style: {
        fontSize: '10px'
      }
    },{
      type: 'text',
      x: 0,
      y: mockHomeworkList.length > 1 ? 2410 : 2110,
      text: data.title,
      style: {
        width: 375,
        color: '#ff6c00',
        fontSize: '22px',
        fontWeight: 'bold',
        textAlign: 'center'
      }
    },{
      type: 'text',
      x: 0,
      y: mockHomeworkList.length > 1 ? 2530 : 2230,
      text: '让每个孩子都有一双发现美的眼睛',
      style: {
        width: 375,
        color: '#9e5600',
        fontSize: '16px',
        textAlign: 'center'
      }
    },{
      type: 'text',
      x: 0,
      y: mockHomeworkList.length > 1 ? 2558 : 2258,
      text: 'Let each child have the ability to feel beauty',
      style: {
        width: 375,
        color: '#9e5600',
        fontSize: '16px',
        textAlign: 'center'
      }
    },{
      type: 'image',
      x: 98,
      y: mockHomeworkList.length > 1 ? 2610 : 2310,
      url: `${util.img_baseUrl}/painting.png`,
      style: {
        width: 175,
        height: 175
      }
    },{
      type: 'text',
      x: 0,
      y: mockHomeworkList.length > 1 ? 2810 : 2510,
      text: '与我一起画画吧',
      style: {
        width: 375,
        color: '#9e5600',
        fontSize: '16px',
        textAlign: 'center'
      }
    },{
      type: 'text',
      x: 0,
      y: mockHomeworkList.length > 1 ? 2840 : 2540,
      text: '长按二维码 加入画啦啦',
      style: {
        width: 375,
        color: '#9e5600',
        fontSize: '16px',
        textAlign: 'center'
      }
    }
  ]
}

export default generateCanvasData