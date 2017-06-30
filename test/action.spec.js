import { actionCtrCreator, actionCtrCreatorByModel } from '../src/action'


describe("actionCtrCreator", () => {
    it('type默认加前缀', () => {
        actionCtrCreator('preFix', ['a', 'b']).set({
            path: 'p',
            value: 10
        }).type.should.equal('preFix/set');
    })
    it('不带前缀', () => {
        actionCtrCreator('preFix', ['a', 'b'], false).set({
            path: 'p',
            value: 10
        }).type.should.equal('set');
    })
})

describe("actionCtrCreatorByModel", () => {
    it('type默认加前缀', () => {
        actionCtrCreatorByModel({
            namespace: 'example',
            state: {}
        }).set({
            path: 'p',
            value: 10
        }).type.should.equal('example/set')
    })

    it('不带前缀', () => {
        actionCtrCreatorByModel({
            namespace: 'example',
            state: {}
        }, false).set({
            path: 'p',
            value: 10
        }).type.should.equal('set')
    })

})
