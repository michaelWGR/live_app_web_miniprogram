/**
 * talkingData埋点：app.td_app_sdk.event(Object)
 * Object参数说明:
 * id (String) 事件id,
 * label (String) 事件描述,
 * params (Object) 事件参数
 */
const app = getApp();
const userId = app.globalData.userId
const openId = app.globalData.openId
const td_event = function({id, label, params}) {
    const tdParams = {
        userId,
        openId,
        ...params
    }
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
      id: 'C01',
      label: label,
      params: data
    })
}

const td_event_collections = function(data) {
    const label = data.label
    if(!label) throw new Error('label is required')
    delete data.label
    td_event({
      id: 'C0111',
      label: label,
      params: data
    })
}

export { td_event, td_event_summary, td_event_collections } 