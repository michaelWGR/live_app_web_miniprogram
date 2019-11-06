/**
 * talkingData埋点：app.td_app_sdk.event(Object)
 * Object参数说明:
 * id (String) 事件id,
 * label (String) 事件描述,
 * params (Object) 事件参数
 */
const app = getApp();
const td_event = function({id, label, params}) {
    const tdParams = {
        userId: app.globalData.userId,
        openId: app.globalData.openId,
        ...params
    }
    console.log('发送埋点', {
        id,
        label,
        params: tdParams
    })
    app.td_app_sdk.event({
        id,
        label,
        params: tdParams
    })
}

const td_event_summary = function(data) {
    const label = data.label
    if(!label) throw new Error('label is required')
    delete data.label
    td_event({
      id: 'C01-阶段学习报告',
      label: label,
      params: data
    })
}

const td_event_collections = function(data) {
    const label = data.label
    if(!label) throw new Error('label is required')
    delete data.label
    td_event({
      id: 'C0112-画作集',
      label: label,
      params: data
    })
}

export { td_event, td_event_summary, td_event_collections } 