import React from 'react';
import Activities from "../ActivitiesArray";
import Select from 'react-select';
import {useState} from "react";
import axios from "axios";

export default function Search(props){
    const [listOfUsers, setListOfUser]=useState([])
    const [interests,setInterests]=useState([])
    const [minAge,setMinAge]=useState(0)
    const [maxAge,setMaxAge]=useState(150)
    const [srchdGender,setSrchdGender]=useState("any")
    const options=Activities
    
    function submitFunction(e){
        e.preventDefault()
        const headers = { Authorization: `Bearer ${props.token}` }
        const body={interests,minAge,maxAge,srchdGender}
        axios.post("http://localhost:9000/user/find", body,{headers})
            .then(res => {
                setListOfUser(res.data)
                console.log(listOfUsers)
                console.log(res.data)
            })
            .catch(error => alert(error.response?.data?.error || "Unknown error"))
    }
    
    return(
        <article>

            SEARCH
            <form onSubmit={submitFunction}>
                <Select onChange={setInterests} closeMenuOnSelect={false} isMulti options={options}/>
                <input type="text" placeholder="age from"/>
                <input type="text" placeholder="age to"/>
                <input type="text" placeholder="gender"/>
                <select onChange={(e)=>setSrchdGender(e.target.value)}>
                    <option>any</option>
                    <option>male</option>
                    <option>female</option>
                    <option>diverse</option>
                </select>
                <button type="submit">search</button>
            </form>
            <section>
                {listOfUsers.map(item=>(
                        <div>
                            <div>{item.name}</div>
                            <div>{item.familyName}</div>
                            <div>{item.gender}</div>
                            <div>{item.dateOfBirth}</div>
                            <div>{item.userName}</div>
                        </div>
                ))}
            </section>

        </article>
    )
}