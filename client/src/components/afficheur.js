import React, { useEffect, useRef } from 'react'

function Afficheur({ messages }) {
    const myref = useRef(null);
    useEffect(() => {
        if (myref.current) myref.current.scrollIntoView();
    }, [messages.length]);
    return (
        <div id='afficheur'>
            {
                messages.map((el, i) => <span key={i} className='message_item' ref={myref}>{el}</span>)
            }
        </div>
    )
}

export default React.memo(Afficheur);