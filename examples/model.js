
import { modelCtr } from 'dva-atr'

export default modelCtr(({ actionCtr }) => ({

  namespace: 'example',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch(actionCtr.set({
        path: 'type',
        value: 'change'
      }))
    },
  }

}))
