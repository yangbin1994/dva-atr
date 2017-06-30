import _ from 'lodash'

/** 
 * eventCreator的生成器
 */
export const actionCtrCenter = {}

export const actionCtrCreator = (prefix, actionNames, hasPrefix = true) => {
    const dist = {}
    _.forEach(['set', 'setMutil', 'reset', 'resetMutil', 'update', ...actionNames], actionName => {
        dist[actionName] = payload => {
            return {
                type: (hasPrefix ? (prefix + '/') : '') + actionName,
                payload
            }
        }
    })
    actionCtrCenter[prefix] = dist
    return dist
}

export const actionCtrCreatorByModel = (model, hasPrefix) => {
    const prefix = model.namespace
    const actionNames = _.map(_.assign({}, _.get(model, 'reducers'), _.get(model, 'effects')), (val, key) => key)
    return actionCtrCreator(prefix, actionNames, hasPrefix)
}