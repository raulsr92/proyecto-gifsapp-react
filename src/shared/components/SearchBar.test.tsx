import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('Componente Search Bar', ()=>{

    test('should render searchbar correctly ', () => {

       const {container} = render(<SearchBar onQuery={()=>{}}/>)
      
       expect(container).toMatchSnapshot()

       expect(screen.getByRole("textbox")).toBeDefined()
       expect(screen.getByRole("button")).toBeDefined()

    })

    test('should call onquery withthe correct value after 1000ms', async() => {

        // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ 2° Mock function

            const onQueryMock = vi.fn()
      
        // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ 1° Renderizar componente 
            render(<SearchBar onQuery={onQueryMock}/>)

        // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦v✦ 3° Almacenar el input

        const input = screen.getByRole("textbox");


        // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦v✦ 4° Disparar un evento para darle un valor al input

        fireEvent.change(input, { target: { value:'pikachu' }})
        //screen.debug()

        // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦v✦ 6° Expectativa esperando hasta que sea invocado
        
       await waitFor(()=>{
            expect(onQueryMock).toHaveBeenCalled()
            expect(onQueryMock).toHaveBeenCalledWith('pikachu')
        })
    })

    test('should call only once with the last value (debounce)',async()=>{

        // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ 2° Mock function
            const onQueryMock = vi.fn()
      
        // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ 1° Renderizar componente 
            render(<SearchBar onQuery={onQueryMock}/>)

        // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦v✦ 3° Almacenar el input
            const input = screen.getByRole("textbox");

        // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦v✦ 4° Disparar un evento para darle un valor al input
            fireEvent.change(input, { target: { value:'chavo'}})
            fireEvent.change(input, { target: { value:'chavo del'}})
            fireEvent.change(input, { target: { value:'chavo del ocho'}})

            //screen.debug()

        // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦v✦ 6° Expectativa esperando hasta que sea invocado
            await waitFor(()=>{
                expect(onQueryMock).toHaveBeenCalledWith('chavo del ocho')
                expect(onQueryMock).toHaveBeenCalledTimes(1)
            })
    })


    test('should call onQuery when button clicked with the input value',async()=>{
        // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ 2° Mock function
            const onQueryMock = vi.fn()
      
        // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ 1° Renderizar componente 
            render(<SearchBar onQuery={onQueryMock}/>)

        // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ 3° Almacenar el input
            const input = screen.getByRole("textbox");
            const button = screen.getByRole("button");

        // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ 4° Disparar un evento para darle un valor al input
            fireEvent.change(input, { target: { value:'fUtBoL'}})

        // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ 5° Disparar un evento de click al botón
            fireEvent.click(button)

        // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ 6° Expectativa esperando hasta que sea invocado
             
                expect(onQueryMock).toHaveBeenCalledWith('fUtBoL')
                expect(onQueryMock).toHaveBeenCalledTimes(1)
           
    })

    test('should the input has the correct placeholder value',()=>{

            const myPlaceHolder='busca tu gifs favorito' 
        
            render(<SearchBar placeholder={myPlaceHolder} onQuery={()=>{}}/>)

            screen.debug()

            expect(screen.getAllByPlaceholderText(myPlaceHolder)).toBeDefined()

    })
})


