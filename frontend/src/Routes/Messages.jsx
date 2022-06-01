export default function Messages(){
    return(
        <article>
            MESSAGES
            <section id="newMessage">
                <input type="text" placeholder="send to"/>
                <input type="text" placeholder="text"/>
                <button type="submit">send Message</button>
            </section>
            <br />
            <section id="readMessage">
                <input type="text" placeholder="from"/>
                <input type="text" placeholder="text"/>
                <input type="text" placeholder="answer"/>
                <button type="submit">Close</button>
                <button type="submit">Send</button>
            </section>
            <table id="messages">
                <tr>
                    <th>from</th>
                    <td>text of the Message</td>
                </tr>
            </table>
        </article>
    )
}