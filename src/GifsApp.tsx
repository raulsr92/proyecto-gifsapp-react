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

  return (
    <>
        <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el gif perfecto"/>

        <SearchBar placeholder="Buscar tus Gifs favoritos"/>

        <PreviousSearches searches={previousTerms} onLabelClicked={handleTermClicked}/>

        <GiftList gifs={mockGifs}/>

    </>
  )
}

export default GifsApp
