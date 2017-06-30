# dva-atr
对于dva`无侵入开发`

# 使用

```bash
$ npm install dva-atr
```

```bash
$ yarn add dva-atr
```

```javascript
import { modelCtr, actionCtrCenter } from 'dva-atr'
```



# 创建model

```javascript

import { modelCtr } from 'dva-atr'
import { Map } from 'immutable'

export default modelCtr(({ actionCtr, actionCtrCenter }) => ({

  namespace: 'example',

  state: {},

  effects: {
     * fetch(__, { call, put, select }) {
        const json = yield call(requestMgr.fetch, ...)
        if (json) {
            /**
             * 请在修改model过程当初，保证state的类型始终是你期望的
             */
            yield put(actionCtr.set({
                path: '/',
                value: Map(json)
            }))
        }
    }
  },

  subscriptions: {
    listen({ dispatch, history }) {
      dispatch(actionCtr.set({
        path: 'type',
        value: 'change'
      }))
    }
  }

}))

```
## listen

- listen可以接受一个函数或者数组（默认监听当前namesapce为路由的路径）

- listen还可以接受一个对象，key值为监听的路由

- 注意：监听路由都不需要在前面加上`/`

```javascript
 `if (pathname === `/${namespace}`) `
```

# 管理组件中使用

## actionCtr/reducers

|名称|说明|
|-- |-- |
|set|设置`path`路径下的`value`为新值|
|setMutil|一次性设置多次，只触发一次渲染|
|reset|重置`path`路径下的model为初始化值(modelCtr创建时候，返回的state)|
|resetMutil|一次性重置多次，只触发一次渲染|
|update|更新`path`路径下的model，`deal`字段为函数`oldModel => newModel`|

```javascript

import { actionCtrCenter } from 'dva-atr'

const mapDispatchToProps = dispatch => ({
  onBtnClick() {
    dispatch(actionCtrCenter['example'].set({
        path: 'type',
        value: 'change-click'
    }))
    dispatch(actionCtrCenter['example'].update({
        path: 'Index.modal.visible',
        deal: val => !val
    }))
  },
  onLogoutBtnClick() {
    _.forEach(actionCtrCenter, actionCtr => {
        dispatch(actionCtr.reset({
            path: '/'
        }))
    })
  }
})

const mapStateToProps = ({
   example
}) => {
   /**
    * 注意model的类型为immutable，请根据你的需求进行关联
    */  
  return example.toJS()
}


```

