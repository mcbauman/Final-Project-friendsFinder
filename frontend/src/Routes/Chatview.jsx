export default function Chatview(props){
    //     function requestMessages(){
//         const headers = { Authorization: `Bearer ${props.token}` }
//         axios.get(`${process.env.REACT_APP_BE_SERVER}/chat/find/incoming`, {headers})
//             .then(res => {
//                 const data2=res.data.map(item=>item={...item,type:"incoming"})
//                 setInMsg(data2)
//             })
    return(
        <>
            <div>Some Text</div>
            <div>props.item.id</div>
            <div>{props.itemKey}</div>
        </>
    )
}