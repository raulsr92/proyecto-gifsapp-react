import {describe, expect, test} from "vitest"
import CustomHeader from "./CustomHeader"
import { render, screen } from "@testing-library/react"

describe('CustomHeader', ()=>{

    const title ='Título de prueba';
    const description = 'Description de producto';

    test('should render the title correctly', ()=>{

        render(<CustomHeader title={title}/>)

        screen.debug()

        expect(screen.getByText(title)).toBeDefined()

    })

    test('should render the description when  provided', ()=>{

        render(<CustomHeader title={title} description={description}/>)

        screen.debug()

        expect(screen.getByText(description)).toBeDefined()
        expect(screen.getByRole("paragraph")).toBeDefined()
        expect(screen.getByRole("paragraph").innerHTML).toBe(description)

    })

    test('should not render the description when not provided', ()=>{

        const {container} = render(<CustomHeader title={title}/>)

        screen.debug()

        const divElement = container.querySelector(".content-center")
        const h1 = divElement?.querySelector("h1")

        const parrafo = container.querySelector("p")

        console.log(h1?.innerHTML)

        expect(h1?.innerHTML).toBe(title)
        expect(parrafo).toBeNull()

    })


})


