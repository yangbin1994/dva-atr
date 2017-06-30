import { fromJS } from 'immutable'
import { actionCtrCreatorByModel } from './action'
import _ from 'lodash'

const handlePath = path => {
    if (_.isArray(path))
        path = _.map(path, path => path === '/' ? [] : path.split('.'))
    else
        path === '/' ? path = [] : path = path.split('.')
    return path
}

const modelCreator = ({ namespace, state = {}, reducers, effects, subscriptions }, actionCtr) => {
    const initialModel = fromJS(state)
    return {
        actionCtr, path: namespace, namespace, state: initialModel, effects,
        subscriptions: subscriptions && {
            setup({ dispatch, history }) {

                const { setup, listen } = subscriptions
                setup && setup.call(this, { dispatch, history })
                listen && history.listen(function ({ pathname, query }) {
                    if (_.isFunction(listen)) {
                        if (pathname === `/${namespace}`) {
                            listen.call(this, { dispatch, query })
                        }
                    } else if (_.isArray(listen)) {
                        if (pathname === `/${namespace}`) {
                            _.forEach(listen, cb => cb.call(this, { dispatch, query }))
                        }
                    } else if (_.isObject(listen)) {
                        _.forEach(listen, (cb, targetPathname) => {
                            if (pathname === `/${targetPathname}`) {
                                cb.call(this, { dispatch, query })
                            }
                        })
                    }

                })
            }
        },
        reducers: {
            reset(state, { payload: { path } }) {
                path = handlePath(path)
                return state.setIn(path, initialModel.getIn(path))
            },
            resetMutil(state, { payload: { path } }) {
                path = handlePath(path)
                return _.reduce(path, (state, path) => state.setIn(path, initialModel.getIn(path)), state)
            },
            set(state, { payload: { path, value } }) {
                path = handlePath(path)
                return state.setIn(path, value)
            },
            setMutil(state, { payload: { path, value } }) {
                path = handlePath(path)
                return _.reduce(path, (state, path, index) => state.setIn(path, value[index]), state)
            },
            update(state, { payload: { path, deal } }) {
                path = handlePath(path)
                return state.updateIn(path, val => deal(val, state))
            },
            ...reducers
        }
    }
}

export const modelCtr = modelMaker => {
    let actionCtr = {}
    const model = modelMaker({ actionCtr })
    _.assign(actionCtr, actionCtrCreatorByModel(model, false))
    const distModel = modelCreator(model, actionCtrCreatorByModel(model))
    return distModel
}


