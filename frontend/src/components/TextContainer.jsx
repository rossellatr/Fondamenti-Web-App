import Message from "./Message";
import {useEffect, useRef, useState} from "react";
import {socket} from "../socket";
import '../style/style_textcontainer.css'

export default function TextContainer({rightChat, loggedUser}) {
    const ref = useRef(null)
    const [chats, setChats] = useState([])

    const scroll = () => {
        const lastChild = ref.current?.lastElementChild;
        lastChild?.scrollIntoView()
    }

    useEffect(() => {
        socket.on("message", ({text, receiver, sender}) => {
            let p = document.createElement("p")
            let background;
            let clas;
            loggedUser._id === sender._id ? background = `#f96d00` : background = `#6643b5`
            loggedUser._id === sender._id ? clas = `right` : clas = `left`
            p.style.background = background;
            p.style.marginLeft = "auto";
            p.style.width = "fit-content";
            p.className = clas;
            p.innerHTML = text;
            ref.current.append(p)

            /*const NewMex=<Message key={message._id}
                                  message={message}
                                  loggedUser={loggedUser}></Message>

                                  chiedere ad Anas

                                  */

            scroll()
        })
    },[]);

    useEffect(()=>{
        scroll()
    })

    useEffect(() => {
        const Chats = rightChat.messages.map((message) => {
            return <Message key={message._id}
                            message={message}
                            loggedUser={loggedUser}></Message>
        })
        setChats(Chats)
        scroll()
    }, [rightChat])

    return (
        <div className={'chatdiv'} ref={ref}>
            {chats}
        </div>


    )
}


/*useEffect(() => {
        socket.on("message", ({text, receiver, sender}) => {
            let p = document.createElement("p")
            let background;
            let clas;
            loggedUser._id === sender._id ? background = `#f96d00` : background = `#6643b5`
            loggedUser._id === sender._id ? clas = `right` : clas = `left`
            p.style.background = background;
            p.style.marginLeft = "auto";
            p.style.width = "fit-content";
            p.className = clas;
            p.innerHTML = text;
            ref.current.append(p)
            scroll()
        },[])
    });*/



