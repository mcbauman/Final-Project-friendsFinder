import react, { useEffect, useState } from "react"
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from 'react-icons/fa';

export default function Fetch(){
    const [fetchRes,setFetchRes]=useState()
    let howManyToFetch=12
    let [howManyToSkip,setHowManyToSkip]=useState(0)
useEffect(()=>{
    fetch(`${process.env.REACT_APP_MARVELAPI}${process.env.REACT_APP_ADRESS}?apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&limit=${howManyToFetch}&offset=${howManyToSkip}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        setFetchRes(data.data.results)
    });
},[howManyToSkip])

function fiftyBackFunction(){
    if(howManyToSkip>=howManyToFetch){
        setHowManyToSkip(howManyToSkip-howManyToFetch)
    }else{
        setHowManyToSkip(0)
    }
}

function buildCard(props){
    return(
        <div className="card" key={props.id}>
            <p>{props.name}</p>
            <img src={props.thumbnail.path+"."+props.thumbnail.extension} alt="Walp" />
        </div>
    )
}

return(
    <article>
        <div>
            <button onClick={fiftyBackFunction}><FaArrowAltCircleLeft/></button>
            <button onClick={()=>setHowManyToSkip(howManyToSkip+howManyToFetch)}><FaArrowAltCircleRight/></button>
        </div>
        <div id="cardsWrapper">
        {fetchRes?fetchRes.map((item)=>buildCard(item)):<p>...LOADING...</p>}
        </div>
        {/* <pre>{JSON.stringify(fetchRes,null,2)}</pre> */}
        <div>
            <button onClick={fiftyBackFunction}><FaArrowAltCircleLeft/></button>
            <button onClick={()=>setHowManyToSkip(howManyToSkip+howManyToFetch)}><FaArrowAltCircleRight/></button>
        </div>
    </article>
)
}