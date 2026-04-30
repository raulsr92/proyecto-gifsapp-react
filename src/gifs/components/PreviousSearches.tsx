
interface PreviousSearchesProps {
  searches: string[],
  onLabelClicked: (term:string)=> void
}

const PreviousSearches = ({searches, onLabelClicked}:PreviousSearchesProps) => {
  return (

    <>
        {/*Búsquedas previas*/}
 
           <div className="previous-searches">
             <h2>Búsquedas previas </h2>
             <ul className="previous-searches-list">

              {
                searches.map((busqueda) => (
                  <li  key={busqueda} onClick={()=> onLabelClicked(busqueda)}>
                    {busqueda}
                  </li>
                ))
              }
             </ul>
           </div>   
    </>

  )
}

export default PreviousSearches

