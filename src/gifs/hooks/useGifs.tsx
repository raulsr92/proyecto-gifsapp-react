import { useRef, useState } from "react"
import type { Gif } from "../interfaces/gif.interface"
import { getGifsByQuery } from "../actions/get-gifs-by-query.action"


//Almacenamiento de resultados atneriores

const useGifs = () => {

    const [previousTerms, setPreviousTerms] = useState<string[]>([])
    const [arrayGifs, setArrayGifs] = useState<Gif[]>([])

    const gifsCache = useRef<Record<string, Gif[]>>({})

   //Métodos
   
      const handleTermClicked = async(term: string) =>{
        /*
            const gifs = await getGifsByQuery(term)
            console.log(gifs)
            setArrayGifs(gifs)
        */
            console.log(term)

            if (gifsCache.current[term]) {
              setArrayGifs(gifsCache.current[term])
              return
            }

            const gifs = await getGifsByQuery(term)
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

          // 5° Llenar el objeto cache con la búsqueda reciente

            gifsCache.current[query] = gifs
            console.log(gifsCache)

      }   


  return {
    previousTerms,
    arrayGifs,
    handleTermClicked,
    handleSearch
  }
}

export default useGifs

