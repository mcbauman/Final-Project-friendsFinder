import react, { useEffect, useState } from "react"

export default function Fetch(){
    const [fetchRes,setFetchRes]=useState()
    let howManyToFetch=50
    let howManyToSkip=0
useEffect(()=>{
    fetch(`${process.env.REACT_APP_MARVELAPI}${process.env.REACT_APP_ADRESS}?apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&limit=${howManyToFetch}&offset=${howManyToSkip}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        setFetchRes(data.data.results)
    });
},[])

function buildCard(props){
    return(
        <div className="card" key={props.id}>
            <p>{props.name}</p>
            <img src={props.thumbnail.path+"."+props.thumbnail.extension} alt="Walp" />
        </div>
    )
}

return(
    <>
        {fetchRes?fetchRes.map((item)=>buildCard(item)):<p>...LOADING...</p>}
        <pre>{JSON.stringify(fetchRes,null,2)}</pre>
    </>
)
}