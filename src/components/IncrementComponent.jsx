import React from "react"

export const IncrementComponent = React.memo(({increment}) => {
  
    console.log('Me estoy redibujando')
  
    return (
        <>
        <button onClick={() => increment(1)} type="button" className="btn btn-success">Incrementar + 1</button>
        </>
  )
})
