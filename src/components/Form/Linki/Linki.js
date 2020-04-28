import React from 'react'

const Linki = (props) => {
    return (
        <div>
            <h3>Dodane linki:</h3>
            {props.imgUrlList.map((el, i) => <h6 key={i}>{el}</h6>)}
        </div>
    )
}

export default Linki
