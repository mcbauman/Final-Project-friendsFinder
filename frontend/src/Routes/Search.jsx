import Activities from "../ActivitiesArray";

export default function Search(){
    return(
        <article>
            SEARCH
            <input type="text" placeholder="activity"/>
            <input type="text" placeholder="activity"/>
            <input type="text" placeholder="activity"/>
            <input type="text" placeholder="age from"/>
            <input type="text" placeholder="age to"/>
            <input type="text" placeholder="gender"/>
            <button type="submit">search</button>
        </article>
    )
}