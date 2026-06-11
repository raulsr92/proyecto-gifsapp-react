import {  beforeEach, describe, expect, test, vi } from 'vitest';
import AxiosMockAdapter from 'axios-mock-adapter'

import { getGifsByQuery } from './get-gifs-by-query.action';
import { giphyApi } from '../api/giphy.api';

import { giphySearchResponseMock } from '../../../tests/mocks/giphy.response.data';
//import { giphyEmptySearchResponseMock } from '../../../tests/mocks/giphy.response.empty.data';


describe('getGifsByQuery', ()=>{
    
    let mock = new AxiosMockAdapter(giphyApi)

    beforeEach(() => {
          mock = new AxiosMockAdapter(giphyApi)
    });

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

    test('should return an empty list of gifs if query is empty', async ()=>{

        //Eliminar el mock para el test actual

        mock.restore()

        const gifs = await getGifsByQuery("");
     
        console.log("Impresión en el test:")
        console.log(gifs)

        expect(gifs.length).toBe(0)
        
    })

    test('should handle error when the API return an error', async ()=>{

        //Implementar espía

        const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(()=>{console.log("Aqui va el error")})

        //Implementar mock
            mock.onGet('/search').reply(400,{
                data:{
                    message: "Bad request"
                }
            });
        //
            console.log("Testing errors")            
            const gifs = await getGifsByQuery("goku");  
            console.log(gifs)

        // Expects

            expect(gifs.length).toBe(0)
            expect(consoleErrorSpy).toHaveBeenCalled()
            //Que sea llamado el console.error con algun error 

            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything())

        
    })
})
