import React, { useRef, useEffect, useState, useCallback } from 'react';
import './App.css';
import Afficheur from './components/afficheur';
import Editor from './components/editor';

function App() {
    const [data, setData] = useState({ id: 0, messages: [] })
    const myRef = useRef(null);

    const getMessage = useCallback(() => {
        fetch('http://' + window.location.hostname + ':3010/get?last=' + data.id, { method: 'POST', mode: 'cors' })
            .then(res => res.json())
            .then(res => {
                setTimeout(() => myRef.current.click(), 4000)
                if (res.messages.length) setData({
                    id: data.messages.length + res.messages.length,
                    messages: [...data.messages, ...res.messages]
                });
            })
    }, [data])

    const sendMessage = (data) => {
        fetch('http://' + window.location.hostname + ':3010/put', {
            method: 'PUT',
            mode: 'cors',
            body: new URLSearchParams({ message: data })
        }).then(() => getMessage())
    }

    useEffect(() => {
        getMessage();
    }, []);

    return (
        <div className="App">
            <div onClick={getMessage} ref={myRef} hidden></div>
            <Afficheur messages={data.messages} />
            <Editor sendMessage={sendMessage} />
        </div>
    );
}

export default React.memo(App);
