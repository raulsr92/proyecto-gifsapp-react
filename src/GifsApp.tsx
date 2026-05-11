//import { mockGifs } from "./mock-data/gifs-mock"
import CustomHeader from "./shared/components/CustomHeader"
import SearchBar from "./shared/components/SearchBar"
import PreviousSearches from "./gifs/components/PreviousSearches"
import GiftList from "./gifs/components/GiftList"
import useGifs from "./gifs/hooks/useGifs"

const GifsApp = () => {

  //Llamada a customHook

  const {previousTerms,arrayGifs,handleTermClicked,handleSearch} = useGifs();

  return (
    <>
        <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el gif perfecto"/>

        <SearchBar placeholder="Buscar tus Gifs favoritos" onQuery={handleSearch}/>

        <PreviousSearches searches={previousTerms} onLabelClicked={handleTermClicked}/>

        <p style={{color:"white"}}>{previousTerms.length}</p>
        <GiftList gifs={arrayGifs}/>

    </>
  )
}

export default GifsApp
