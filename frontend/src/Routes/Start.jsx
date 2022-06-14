

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Start(){
    const notify = () => toast("Wow so easy!");
    
    return(
        <article>
            Start
            <div>some text</div>
                <button onClick={notify}>Notify!</button>
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