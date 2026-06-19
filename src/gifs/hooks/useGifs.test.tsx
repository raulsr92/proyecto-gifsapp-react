import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import useGifs from "./useGifs";


describe('useGifs',()=>{

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
})
