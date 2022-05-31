import React from 'react';
import Activities from "../ActivitiesArray";
import Select from 'react-select';
// import makeAnimated from 'react-select/animated';


export default function Search(){
    const options=Activities
    // const animatedComponents = makeAnimated();
    
    return(
        <article>
            SEARCH
            <Select
                closeMenuOnSelect={false}
                // components={animatedComponents}
                // defaultValue={[options[0], options[1]]}
                isMulti
                options={options}
            />
            <input type="text" placeholder="age from"/>
            <input type="text" placeholder="age to"/>
            <input type="text" placeholder="gender"/>
            <button type="submit">search</button>
        </article>
    )
}