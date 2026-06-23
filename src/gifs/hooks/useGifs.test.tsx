import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import useGifs from "./useGifs";
import * as gifActions from "../actions/get-gifs-by-query.action";



describe('useGifs',()=>{

    beforeEach(() => {
        // Configuración inicial para cada test
        vi.restoreAllMocks() // limpia antes de cada test
    })

    test('should return default values and methods',()=>{

        //Montar el hook en un DOM simulado y obtener su resultado

        const {result} = renderHook(()=> useGifs())
        //console.log(result.current)

        //Lanzar las expectativas

        expect(result.current.arrayGifs).toStrictEqual([]) //Hecho por Raúl
        expect(result.current.arrayGifs.length).toBe(0) //Hecho por profesor

        expect(result.current.previousTerms).toStrictEqual([]) //Hecho por Raúl
        expect(result.current.previousTerms.length).toBe(0) //Hecho por profesor

        expect(result.current.handleSearch).toBeDefined()
        expect(typeof result.current.handleTermClicked).toBe("function") 
    })

    test('should return a list of gifs', async()=>{

        //Montar el hook en un DOM simulado y obtener su resultado
            const {result} = renderHook(()=> useGifs())
            
        //Actualizar estado de la variable arrayGifs al llamar a handleSearch()

            await act(async()=>{
                await result.current.handleSearch("goku")
            })


        //Lanzar las expectativas
            console.log(result.current.arrayGifs.length)
            expect(result.current.arrayGifs.length).toBe(10)
            
    })

    test('should return a list of gifs when handleTermClicked', async()=>{

        //Montar el hook en un DOM simulado y obtener su resultado
            const {result} = renderHook(()=> useGifs())

        //Actualizar estado de la variable arrayGifs al llamar a handleTermClicked()

            await act(async()=>{
                await result.current.handleTermClicked("goku")
            }) 
            
        //Lanzar las expectativas
            console.log(result.current.arrayGifs.length)
            expect(result.current.arrayGifs.length).toBe(10)           
    })

    test('should return a list of gifs from caché', async() => {

        //Montar el hook en un DOM simulado y obtener su resultado
                const {result} = renderHook(()=> useGifs())

        // 1° Primera búsqueda: llena arrayGifs y cache
            await act(async()=>{
                await result.current.handleTermClicked("goku")
            }) 

            expect(result.current.arrayGifs.length).toBe(10)   

        // 2° Mockear getGifsByQuery para que falle  
            const spy = vi.spyOn(gifActions,"getGifsByQuery")
            .mockRejectedValue(new Error('Esto es un error'))

        // 3° Segunda búsqueda con el mismo término
            await act(async()=>{
                await result.current.handleTermClicked("goku")
            })             

            expect(result.current.arrayGifs.length).toBe(10)   
            expect(spy).not.toHaveBeenCalled()
    })  
    
    test('should return no more than 8 previous terms - Raúl', async() => {
      
        //1° Montar el hook en un DOM simulado y obtener su resultado
        
        const {result} = renderHook(()=> useGifs())

        console.log("N° Búsquedas previas: "+result.current.previousTerms.length)

        //2° Actualizar el valor de la variable de estado previousTerms llamando a una búsqueda (1er llamado)

            await act(async()=>{
                await result.current.handleSearch("pikachu");
            })
            console.log("N° Búsquedas previas: "+result.current.previousTerms.length)

        //3° Actualizar el valor de la variable de estado previousTerms llamando a una búsqueda (2er llamado)

            await act(async()=>{
                await result.current.handleSearch("goku");
            })
            console.log("N° Búsquedas previas: "+result.current.previousTerms.length)

        //4° Actualizar el valor de la variable de estado previousTerms llamando a una búsqueda (3er llamado)

            await act(async()=>{
                await result.current.handleSearch("krillin");
            })
            console.log("N° Búsquedas previas: "+result.current.previousTerms.length)

        //5° Actualizar el valor de la variable de estado previousTerms llamando a una búsqueda (4to llamado)

            await act(async()=>{
                await result.current.handleSearch("feliz");
            })
            console.log("N° Búsquedas previas: "+result.current.previousTerms.length)

        //6° Actualizar el valor de la variable de estado previousTerms llamando a una búsqueda (5to llamado)

            await act(async()=>{
                await result.current.handleSearch("sad");
            })
            console.log("N° Búsquedas previas: "+result.current.previousTerms.length)

        //7° Actualizar el valor de la variable de estado previousTerms llamando a una búsqueda (6to llamado)

            await act(async()=>{
                await result.current.handleSearch("hungry");
            })
            console.log("N° Búsquedas previas: "+result.current.previousTerms.length)

        //8° Actualizar el valor de la variable de estado previousTerms llamando a una búsqueda (7mo llamado)

            await act(async()=>{
                await result.current.handleSearch("chavo del 8");
            })
            console.log("N° Búsquedas previas: "+result.current.previousTerms.length)

        //9° Actualizar el valor de la variable de estado previousTerms llamando a una búsqueda (8vo llamado)

            await act(async()=>{
                await result.current.handleSearch("bob");
            })
            console.log("N° Búsquedas previas: "+result.current.previousTerms.length)

        //10° Actualizar el valor de la variable de estado previousTerms llamando a una búsqueda (9no llamado)

            await act(async()=>{
                await result.current.handleSearch("futbol");
            })
            console.log("N° Búsquedas previas: "+result.current.previousTerms.length)
        
            expect(result.current.previousTerms.length).toBeLessThan(9)
    })

    test('should should return no more than 8 previous terms - profe', async() => {
        
        //1° Montar el hook en un DOM simulado y obtener su resultado
            const {result} = renderHook(()=> useGifs())

        // 2°
         
             vi.spyOn(gifActions,"getGifsByQuery")
                .mockResolvedValue([])
        // 3°
            await act(async()=>{
                    await result.current.handleSearch("goku1");
                    await result.current.handleSearch("goku2");
                    await result.current.handleSearch("goku3");
                    await result.current.handleSearch("goku4");
                    await result.current.handleSearch("goku5");
                    await result.current.handleSearch("goku6");
                    await result.current.handleSearch("goku7");
                    await result.current.handleSearch("goku8");
                    await result.current.handleSearch("goku9");
            })

            console.log(result.current.previousTerms)

        //4° Expectativa

        expect(result.current.previousTerms.length).toBe(8)

        expect(result.current.previousTerms).toEqual(expect.arrayContaining(['goku9', 'goku8','goku7', 'goku6','goku5', 'goku4','goku3', 'goku2']))
        expect(result.current.previousTerms).toStrictEqual(
            ['goku9', 'goku8','goku7', 'goku6','goku5', 'goku4','goku3', 'goku2']
        )

    })
    
    
})
