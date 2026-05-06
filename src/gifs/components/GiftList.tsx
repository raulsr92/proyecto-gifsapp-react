
import type { FC } from "react"
import type { Gif } from "../interfaces/gif.interface"


interface GiftListProps{
    gifs:Gif[]
}

const GiftList:FC<GiftListProps> = ({gifs}) => {
  return (
    <>
        {/* Gifs */}
          <div className="gifs-container">
            {
              gifs.map((gif)=> (
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

export default GiftList

