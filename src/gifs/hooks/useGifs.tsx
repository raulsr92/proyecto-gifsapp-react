import { useState } from "react"
import type { Gif } from "../interfaces/gif.interface"
import { getGifsByQuery } from "../actions/get-gifs-by-query.action"


const useGifs = () => {

   const [previousTerms, setPreviousTerms] = useState<string[]>([])

  const [arrayGifs, setArrayGifs] = useState<Gif[]>([])


  const handleTermClicked = async(term: string) =>{

    const gifs = await getGifsByQuery(term)

    console.log(gifs)

    setArrayGifs(gifs)
  }

  const handleSearch = async(query: string = '') =>{

    // 1° Limpiar de espacios vacíos al inicio y final y convertir a minusculas
      query = query.trim().toLocaleLowerCase()

    // 2° Validar que no esté vacía
      if (query.length===0) return
    
    // 3° Verificar si ya existe en previousTerms

      if(previousTerms.includes(query)) return
      

    // 4° Agregar nuevo término al inicio y limitar array a 8

      setPreviousTerms(prev => [query,...prev].slice(0,8) )

      const gifs = await getGifsByQuery(query)

      console.log(gifs)

      setArrayGifs(gifs)

      //return gifs

  }   


  return {
    previousTerms,
    arrayGifs,
    handleTermClicked,
    handleSearch
  }
}

export default useGifs

