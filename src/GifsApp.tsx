import { mockGifs } from "./mock-data/gifs-mock"
import CustomHeader from "./shared/components/CustomHeader"
import SearchBar from "./shared/components/SearchBar"
import PreviousSearches from "./gifs/components/PreviousSearches"
import GiftList from "./gifs/components/GiftList"


const GifsApp = () => {

  return (
    <>
        <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el gif perfecto"/>

        <SearchBar placeholder="Buscar tus Gifs favoritos"/>

        <PreviousSearches searches={["Digimon", "Gokú", "Dragon Ball Z", "Ash ketchup"]}/>

        <GiftList gifs={mockGifs}/>

    </>
  )
}

export default GifsApp
