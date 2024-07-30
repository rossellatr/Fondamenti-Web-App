import TextContainer from "./TextContainer";
import SendMessage from "./SendMessage";
import '../style/style_chat.css'
import {useEffect, useRef} from "react";

export default function Chat({rightChat, otherUser, loggedUser, showChatRoom}) {

    const ref = useRef(null)

    const scroll = () => {
        const lastChild = ref.current?.lastElementChild;
        lastChild?.scrollIntoView()
    }

    useEffect(() => {
        scroll()
    }, [rightChat, showChatRoom])

    //creiamo l'interfaccia generale della chat
    return (<div className={"boxchat"} ref={ref}>
        <h1>{otherUser}</h1>
        <TextContainer rightChat={rightChat} loggedUser={loggedUser}></TextContainer>
        <SendMessage receiver={otherUser} sender={loggedUser} rightChat={rightChat}></SendMessage>
    </div>)
}
