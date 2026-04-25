
interface PreviousSearchesProps {
  searches: string[]
}

const PreviousSearches = ({searches}:PreviousSearchesProps) => {
  return (

    <>
        {/*Búsquedas previas*/}
 
           <div className="previous-searches">
             <h2>Búsquedas previas</h2>
             <ul className="previous-searches-list">

              {
                searches.map((busqueda) => (
                  <li>{busqueda}</li>
                ))
              }
             </ul>
           </div>   
    </>

  )
}

export default PreviousSearches

