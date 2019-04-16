import axios from 'axios';
import moxios from 'moxios';
import { loadCharactersActionCreator } from "./loadCharacters"

// jest.mock('axios')
//
// const resp = { data: { results: [] } }
// axios.get = jest.fn(() => {
//     console.log('Get called')
//     return {
//         then: jest.fn((fn) => {
//             fn(resp)
//             return {
//                 catch: jest.fn()
//             }
//         })
//     }
// })

const dispatch = jest.fn()


describe('action loadCharactersActionCreator', () => {

    beforeEach(() => {
        moxios.install()

    })

    it('tests moxios', (done) => {

        let onFulfilled = jest.fn()

        moxios.stubRequest('/say/hello', {
            status: 200,
            responseText: 'hello'
        })

        axios.get('/say/hello').then(onFulfilled)

        moxios.wait(function () {
            expect(onFulfilled).toBeCalled()
            console.log('Kekeke')
            done()
        })
    })

    it('works fine', (done) => {

        moxios.stubRequest('https://rickandmortyapi.com/api/character/', {
            status: 200,
            responseText: {
                results: [{ test: 'character' }]
            }
        })

        const dispatcher = loadCharactersActionCreator()
        expect(typeof dispatcher).toBe('function')

        dispatcher(dispatch)

        moxios.wait(function () {
            const req = moxios.requests.mostRecent()
            expect(dispatch).toBeCalledTimes(1)
            expect(dispatch.mock.calls[0][0]).toMatchSnapshot()
            done()
        })
    })

    afterEach(() => {
        moxios.uninstall()
    })

})
