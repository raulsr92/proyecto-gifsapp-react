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
})


