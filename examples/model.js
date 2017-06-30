
import { modelCtr } from 'dva-atr'

export default modelCtr(({ actionCtr }) => ({

  namespace: 'example',

  state: {},

  subscriptions: {
    listen({ dispatch, history }) {
      dispatch(actionCtr.set({
        path: 'type',
        value: 'change'
      }))
    }
  }

}))