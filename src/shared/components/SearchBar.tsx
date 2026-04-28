import { useEffect, useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onQuery: (query:string)=> void
}

const SearchBar = ({placeholder="Buscar", onQuery}:SearchBarProps) => {



  //Paso N° 01 Barra de búsqueda: Variable de estado

  const [query, setQuery]= useState('')


  //useEffect hook

  useEffect( ()=>{

    const timeoutId= setTimeout(()=>{
      onQuery(query)
    },1000)

    return ()=>{
      clearTimeout(timeoutId)
    }

  },[query, onQuery])


//métodos
 
  const handleSearch = ()=>{
    //Mandamos por la prop la variable de estado
      onQuery(query)

    //Limpiamos la caja de texto
      setQuery('')
  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
      if (e.key==="Enter") {
        handleSearch()
      }
  }

  return (
    <>
        {/*Search*/}

          <div className="search-container">
            <input 
              type="text" 
              placeholder={placeholder} 
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>Buscar</button>
          </div>

    </>
  )
}

export default SearchBar
