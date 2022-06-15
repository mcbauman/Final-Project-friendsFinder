import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {checkFriends} from "../components/functions";

export default function Start(props){
    const notify = () => toast("Wow so easy!");

    function wakeUpServer(){
        axios.get(`${process.env.REACT_APP_BE_SERVER}/`)
            .then(res => {
                console.log("SEVER IS UP")
            })
            .catch(error => alert(error.response?.data?.error || "Unknown error"))
    }
    wakeUpServer()
    
    return(
        <article>
            Start
            <br />
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
            <ol>
                <li className='rowForum'>
                    <a href="/item">
                        <h4 className='titleForum'>
                            Thread 1
                        </h4>
                        <div className='bottomForum'>
                            <p className='timestampForum'>
                                15/06/2022
                            </p>
                            <p className='commentCountForum'>
                                comments
                            </p>
                        </div>
                    </a>                   
                </li>
                <li className='rowForum'>
                    <a href="/item">
                        <h4 className='titleForum'>
                            Thread 2
                        </h4>
                        <div className='bottomForum'>
                            <p className='timestampForum'>
                                15/06/2022
                            </p>
                            <p className='commentCountForum'>
                                comments
                            </p>
                        </div>
                    </a>                   
                </li>
            </ol>


        </article>
    )
}
