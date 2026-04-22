import { mockGifs } from "./mock-data/gifs-mock"


const GifsApp = () => {

  return (
    <>
        {/*Header*/}
          <div className="content-center">
              <h1>Buscador de Gifs</h1>
              <p>Descubre y comparte el gif perfecto</p>
          </div>

        {/*Search*/}

          <div className="search-container">
            <input type="text" placeholder="Buscar Gifs" />
            <button>Buscar</button>
          </div>

        {/*Búsquedas previas*/}

          <div className="previous-searches">
            <h2>Búsquedas previas</h2>
            <ul className="previous-searches-list">
              <li>Gokú</li>
              <li>Pokemon</li>
              <li>Mario Bross</li>
              <li>Bostezar</li>
            </ul>
          </div>

        {/* Gifs */}

          <div className="gifs-container">
            {
              mockGifs.map((gif)=> (
                <div key={gif.id} className="gif-card"> 
                  <img 
                    src={gif.url} 
                    alt={gif.title} 
                  />
                  <h2>{gif.title}</h2>
                  <p>
                     {gif.width} x { gif.height} (1.5mb)
                  </p>

                </div>
              ) )
            }

          </div>

    </>
  )
}

export default GifsApp
