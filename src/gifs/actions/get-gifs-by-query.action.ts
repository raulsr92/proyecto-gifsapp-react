import type { GiphyResponse } from "../interfaces/giphy.response"
import type { Gif } from "../interfaces/gif.interface"
import { giphyApi } from "../api/giphy.api"


export const getGifsByQuery = async(query:string):Promise<Gif[]> =>{

    const response = await giphyApi<GiphyResponse>(`/search`,
        {
            params:{
                q: query,
                limit: 10,        
            }
         }
    )

    console.log(response.data)

    console.log("hemos hecho una petición http GET")
    
    return response.data.data.map(({id,title,images})=> (
        {
            ["id"]:id,
            ["title"]:title,
            ["url"]:images.original.url,
            ["width"]:parseInt(images.original.width),
            ["height"]:parseInt(images.original.height)
        }
    ))
    
}