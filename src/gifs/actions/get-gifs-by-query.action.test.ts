import { describe, expect, test } from 'vitest';
import { getGifsByQuery } from './get-gifs-by-query.action';

describe('getGifsByQuery', ()=>{

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
})
