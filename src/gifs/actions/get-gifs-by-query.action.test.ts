import { describe, expect, test } from 'vitest';
import AxiosMockAdapter from 'axios-mock-adapter'

import { getGifsByQuery } from './get-gifs-by-query.action';
import { giphyApi } from '../api/giphy.api';

import { giphySearchResponseMock } from '../../../tests/mocks/giphy.response.data';


describe('getGifsByQuery', ()=>{
    
    const mock = new AxiosMockAdapter(giphyApi)

    /*
    test('should return a list of gifs', async()=>{

        const gifs = await getGifsByQuery('goku');
        const [gifs1] = gifs;

        //Hacer evaluación

        expect(gifs1).toEqual({
            id: expect.any(String),
            width: expect.any(Number),
            height: expect.any(Number),
            title: expect.any(String),
            url: expect.any(String)
        })

        expect(gifs.length).toBe(10)

    })
    */

    test('should return a list of gifs', async ()=>{

        mock.onGet('/search').reply(200,giphySearchResponseMock);

        const gifs = await getGifsByQuery("goku");
        console.log("Resultado de test con API mock")
        console.log(gifs)

        expect(gifs.length).toBe(10)

        gifs.forEach((gif)=>{
            expect( typeof gif.id).toBe("string");
            expect( typeof gif.title).toBe("string")
            expect( typeof gif.url).toBe("string")
            expect( typeof gif.width).toBe("number")
            expect( typeof gif.height).toBe("number")
        })
        
    })
})
