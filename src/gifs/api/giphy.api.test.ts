import { describe, expect, test } from 'vitest';
import { giphyApi } from './giphy.api';

describe('giphyApi' ,()=>{

    test('Should be configured correctly', ()=>{

        //console.log(giphyApi.defaults)
        const params = giphyApi.defaults.params;
        console.log(params)

        expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs')
        expect(params.lang).toBe('en')
        expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY)

        //alternativa para evaluar los params como objeto
        expect(params).toStrictEqual(
            { 
                lang: 'en', 
                api_key: import.meta.env.VITE_GIPHY_API_KEY 
            })    
    })
})