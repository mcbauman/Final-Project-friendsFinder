import exmpl from "../components/exmpl.jpeg"


export default function ForumPost(props){
    
    {forum&&forum.length?(forum.map(item => 
        <div key={item._id} className="forum" onClick={() => setHidden(hidden==="hide"?"show":"hide")} >
            <img src={item.author.profilePicture?`${process.env.REACT_APP_BE_SERVER}/picture/${item.author.profilePicture}`:exmpl}/>
            <div><span>Created by: </span>{item.author.userName}</div>
            <div><span>Created at: </span>{new Date(item.createdAt).toLocaleDateString()}</div>
            <div className='subj'><span>Subject: </span>{item.subject}</div>
            <div className='cont'>{item.content}</div>
            <form onSubmit={handleComment}>
                <input className={hidden} onChange={(e)=> setComment(e.target.value)} placeholder='Leave comment' />
                <button className={hidden} type="submit" >Submit your comment</button>
            </form>
            <div> {comment} </div>
            <br />
        </div>
    )):<div className="loadingio-spinner-ripple-jjyczsl43u"><div className="ldio-qydde5o934a"><div></div><div></div></div></div>}
}