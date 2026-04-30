import { mockGifs } from "./mock-data/gifs-mock"
import CustomHeader from "./shared/components/CustomHeader"
import SearchBar from "./shared/components/SearchBar"
import PreviousSearches from "./gifs/components/PreviousSearches"
import GiftList from "./gifs/components/GiftList"
import { useState } from "react"


const GifsApp = () => {

  const [previousTerms, setPreviousTerms] = useState(["pokemon", "bob esponja", "chavo del 8"])

  const handleTermClicked = (term: string) =>{

    console.log({term})
  }

  const handleSearch = (query: string = '') =>{

    // 1° Limpiar de espacios vacíos al inicio y final y convertir a minusculas
      query = query.trim().toLocaleLowerCase()

    // 2° Validar que no esté vacía
      if (query.length===0) return
    
    // 3° Verificar si ya existe en previousTerms

      if(previousTerms.includes(query)) return
      

    // 4° Agregar nuevo término al inicio y limitar array a 8

      setPreviousTerms(prev => [query,...prev].slice(0,8) )
  }


  return (
    <>
        <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el gif perfecto"/>

        <SearchBar placeholder="Buscar tus Gifs favoritos" onQuery={handleSearch}/>

        <PreviousSearches searches={previousTerms} onLabelClicked={handleTermClicked}/>

        <p style={{color:"white"}}>{previousTerms.length}</p>
        <GiftList gifs={mockGifs}/>

    </>
  )
}

export default GifsApp
