import React, { useState } from 'react'
import axios from "axios"


const TestRoute = () => {

    const [sent, setSent] = useState(false);
    const [text, setText] = useState("");
    
    const handleSend = async() => {
        setSent(true);
        try {
            await axios.post("http://localhost:8000/send_mail", {
                text
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <div>
        {!sent ? (
            <form onSubmit={handleSend}>
            <input type="text" name="" value={text} onChange= {(e) => setText(e.target.value)}/>

            <button type='submit'>Send email</button>

            </form>
        ) :
        (
            <div>
                <p>Email Sent</p>
            </div>
        )}
        
    </div>
    )
}

export default TestRoute