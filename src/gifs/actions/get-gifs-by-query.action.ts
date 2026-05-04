import axios from "axios"
import type { GiphyResponse } from "../interfaces/giphy.response"
import type { Gif } from "../interfaces/gif.interface"


export const getGifsByQuery = async(query:string):Promise<Gif[]> =>{

    const response = await axios.get<GiphyResponse>(`https://api.giphy.com/v1/gifs/search`,
        {
            params:{
                q: query,
                limit: 10,
                lang:'en',
                api_key:'7nJj8i5hUqjAQKroCEwPGUaD16Im7qAW'
        
            }
         }
    )

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