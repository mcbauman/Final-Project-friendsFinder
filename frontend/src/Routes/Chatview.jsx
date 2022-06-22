import {IoIosCloseCircleOutline} from "react-icons/io"

export default function Chatview(props){
    //     function requestMessages(){
//         const headers = { Authorization: `Bearer ${props.token}` }
//         axios.get(`${process.env.REACT_APP_BE_SERVER}/chat/find/incoming`, {headers})
//             .then(res => {
//                 const data2=res.data.map(item=>item={...item,type:"incoming"})
//                 setInMsg(data2)
//             })
    return(
        <div className="messages">
            {/* <img className="img2" src={`${process.env.REACT_APP_BE_SERVER}/picture/${item.author.profilePicture}`:exmpl}/> */}
            <div>Some Text</div>
            <div>props.item.id</div>
            <div>{props.itemKey}</div>
            <IoIosCloseCircleOutline/>
        </div>
    )
}

    {/* <div key={item._id} className="messages">
            <img className="img2" src={item.author.profilePicture?`${process.env.REACT_APP_BE_SERVER}/picture/${item.author.profilePicture}`:exmpl}/>
            <div className="author">{item.author.userName}</div>
            <div className="subject">{item.subject}</div>
            <button className={isFriend(item.author._id,friends)+" btn1"} onClick={()=>addFriend(item.author._id,props.token,setFriends)}><FaUserFriends/></button>
            <button className="btn2" onClick={()=>writeMessage(item._id,item.author._id)}><MdOutlineEmail/></button>
            <form className={vis===item._id?"show":"hide"}>
                <input type="text" placeholder="subject" value={subject} onChange={(e)=>setSubject(e.target.value)}/>
                <input type="text" placeholder="your text" value={content} onChange={(e)=>setContent(e.target.value)}/>
            </form>
            <div className="profileText">{item.content}</div>
        </div> */}