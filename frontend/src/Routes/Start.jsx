import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Start(props){
    const [data, setData] = useState(null)
    function apiToDb () {
        const headers = { Authorization: `Bearer ${props.token}` }
        const body =  data 
        axios.post(`${process.env.REACT_APP_BE_SERVER}/apidata`, body ,{headers})
            .then(res => console.log(res))
            .catch(error => console.error(error))
    }
    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://newsapi.org/v2/everything?q=tesla&from=2022-05-14&sortBy=publishedAt&language=en&apiKey=f385f7ce4f144b139b09ffd85acfc1e3`,
          };
          axios(options)
            .then(res => {
                console.log(res.data.articles);
                setData(res.data.articles)
                apiToDb()
            })
            .catch(error => console.error(error))
    }, [])
    console.log(data);
    return(
        <article>
            Start
            {data?(
            <div>{data.map(item => (               
                    <div>{item.author}</div>  
                              
            ))}</div>) : <div>loading</div>}
        </article>
    )
}
    // useEffect(() => {
    //     if(data){
    //         const config = {
    //             method: "POST",
    //             body: JSON.stringify({data}),
    //             headers: {
    //              "Content-type": "application/json"
    //             }
    //         }
    //            fetch("/apidata", {config})
    //             .then(res => res.json())
    //             .then(result => console.log(result))
    //        }
    // }, [])