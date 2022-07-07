import React, { useEffect } from "react";
import Activities from "../components/ActivitiesArray";
import Select from "react-select";
import { useState } from "react";
import axios from "axios";
import { FaHandshake,FaUserFriends  } from "react-icons/fa"
import { MdOutlineEmail, MdSearch} from "react-icons/md";
import exmpl from "../components/exmpl.jpeg"
import { isFriend, checkFriends, addFriend } from "../components/functions";
import { Context } from "../components/context"
import trans from "../components/trans";
import { useContext } from "react";
import logo from "../components/COF.png";
import { toast, ToastContainer } from "react-toastify";
import { sortByDistance } from "sort-by-distance";
import "../components/Search.scss";

export default function Search(props) {
  const [listOfUsers, setListOfUser] = useState([]);
  const [interests, setInterests] = useState([]);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(150);
  const [srchdGender, setSrchdGender] = useState("any");
  const options = Activities;
  const [vis, setVis] = useState(false);
  const [content, setContent] = useState("");
  const [friends, setFriends] = useState([]);
  const { lang } = useContext(Context);
  const notifyFeedback = (text) => toast(text);

  function requestServer() {
    const body = { interests, minAge, maxAge, srchdGender };
    const headers = { Authorization: `Bearer ${props.token}` };
    body.interests = body.interests.map((item) => item.value);
    axios
      .post(`${process.env.REACT_APP_BE_SERVER}/user/find`, body, { headers })
      .then((res) => {
        const opts = {yName: "latitude", xName: "longitude"};
        const origin = { longitude: 10.0368384, latitude: 53.5658496 };
        console.log(sortByDistance(origin, res.data, opts));
        const sortedByDistance = sortByDistance(origin, res.data, opts);
        setListOfUser(sortedByDistance);
        console.log("SEARCH RES.DATA l24", res.data);
      })
      .catch((error) => alert(error.response?.data?.error || "Unknown error"));
    checkFriends(props.token, setFriends);
  }

  useEffect(() => {
    requestServer();
  }, []);

  function submitFunction(e) {
    e.preventDefault();
    requestServer();
  }

  function writeMessage(id) {
    setVis(vis ? 0 : id);
    if (vis && content.length > 1) {
      const headers = { Authorization: `Bearer ${props.token}` };
      const data = { content, user: props.user, recipient: id };
      axios
        .post(`${process.env.REACT_APP_BE_SERVER}/chats`, data, { headers })
        .then((res) => {
          setContent("");
          notifyFeedback(`Your message was send`);
        })
        .catch(error => notifyFeedback(error.response.data.error[0].content || "Unknown error"))
    }
  }
    return(
        <article>
            <form onSubmit={submitFunction}>
                <input className="ageInput midW" type="text"
                onChange={(e)=>setMinAge(e.target.value||0)} placeholder={trans[lang].minAge}/>
                <input className="ageInput midW" type="text" 
                onChange={(e)=>setMaxAge(e.target.value||150)} placeholder={trans[lang].maxAge}/>
                <select onChange={(e)=>setSrchdGender(e.target.value)}>
                    <option>{trans[lang].any}</option>
                    <option>♂️</option>
                    <option>♀️</option>
                    <option>⚧</option>
                </select>
                <Select className='selectInSearch' onChange={setInterests} closeMenuOnSelect={false} 
                isMulti options={options}/>
                <button type="submit">
                    {/* <MdSearch/> */}
                </button>
            </form>
            {listOfUsers&&listOfUsers.length?(
            <section id="messages">
                {listOfUsers.map(item=>(
                    <div key={item._id} className="ProfileCard">
                        <img className='imgSearch' 
                        src={item.profilePicture?`${process.env.REACT_APP_BE_SERVER}/picture/${item.profilePicture}`:exmpl}/>
                        <div className="searchDivUserName">{item.userName}</div>
                        <div className='gender'>{item.gender}</div>
                        <div className='age'>{item.age}</div>
                        <button className={isFriend(item._id,friends)+" btn1"} 
                            onClick={()=>addFriend(item._id,props.token,setFriends)}>
                            {/* <FaUserFriends/> */}
                            <FaHandshake/>
                            </button>
                        <button className="btn2" onClick={()=>writeMessage(item._id)}>
                            <MdOutlineEmail/></button>
                        <div className="profileText">{item.profileText}</div>
                        <form className={vis===item._id?"show":"hide"} 
                            onSubmit={(e)=>{e.preventDefault();writeMessage(item._id)}}>
                            <input type="text" placeholder="your text" value={content} 
                            onChange={(e)=>setContent(e.target.value)} className="maxW"/>
                        </form>
                    </div>
                ))}
            </section>):(<img src={logo} id="henriksLoadingAnimation" />)}
            <ToastContainer position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
        </article>
    )
}