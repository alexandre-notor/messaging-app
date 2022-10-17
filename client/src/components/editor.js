import React, { useState } from 'react';

function Editor({sendMessage}) {
    const [text, setText] = useState("")
    const submitText = (e) => {
        e.preventDefault();
        if(text.trim() === "") return;
        sendMessage(text.trim());
        setText('');
    }

    return (
        <form onSubmit={submitText}>
            <input type="text" onChange={(e) => setText(e.target.value)} value={text} />
            <button>Send</button>
        </form>
    )
}

export default Editor