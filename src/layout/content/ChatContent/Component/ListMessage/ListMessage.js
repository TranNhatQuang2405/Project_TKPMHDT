import React, { useEffect, useState } from "react";
import Message from "../Message/Message";
import "./listMessage.css";
import useListChildMessage from "configs/customHook/useListChildMessage";
import { useSelector } from "react-redux";
import MessageSending from "../Message/MessageSending";
import useSound from "use-sound";
import MessageSound from "sound/message.mp3";

function ListMessage(props) {
    const { keyId, uid, createAt } = props;
    const [listChild] = useListChildMessage(keyId, uid, createAt);
    const [list, setList] = useState([]);
    const listWaitSend = useSelector((state) => state.Sending.data[keyId]);
    const currentUser = useSelector((state) => state.UserInfo.user);
    const [listSendShow, setListSendShow] = useState([]);
    const [numNewMessage, setNumNewMessage] = useState(null);
    const [play] = useSound(MessageSound);
    useEffect(() => {
        if (listWaitSend && listWaitSend.length > 0) {
            var ctype = listWaitSend[0].type;
            var tmp = [];
            tmp.push(listWaitSend[0]);
            var tmpTotal = [];
            for (var i = 1; i < listWaitSend.length; i++) {
                if (listWaitSend[i].type !== ctype) {
                    tmp.reverse();
                    tmpTotal.push({ val: tmp, type: ctype });
                    tmp = [];
                    ctype = listWaitSend[i].type;
                    tmp.push(listWaitSend[i]);
                    if (i === listWaitSend.length - 1) {
                        tmp.reverse();
                        tmpTotal.push({ val: tmp, type: ctype });
                        tmp = [];
                    }
                } else if (i === listWaitSend.length - 1) {
                    tmp.push(listWaitSend[i]);
                    tmp.reverse();
                    tmpTotal.push({ val: tmp, type: ctype });
                    tmp = [];
                } else {
                    tmp.push(listWaitSend[i]);
                }
            }
            if (tmp.length > 0) {
                tmp.reverse();
                tmpTotal.push({ val: tmp, type: ctype });
            }
            tmpTotal.reverse();
            setListSendShow(tmpTotal);
        } else setListSendShow([]);

        return () => {};
    }, [listWaitSend]);

    useEffect(() => {
        if (listChild.length > 0) {
            var cuid = listChild[0].val.uidSend;
            var ctype = listChild[0].val.type;
            var tmp = [];
            tmp.push(listChild[0]);
            var tmpTotal = [];
            for (var i = 1; i < listChild.length; i++) {
                if (
                    listChild[i].val.uidSend !== cuid ||
                    listChild[i].val.type !== ctype
                ) {
                    tmp.reverse();
                    tmpTotal.push({ val: tmp, type: ctype, sendUid: cuid });
                    tmp = [];
                    ctype = listChild[i].val.type;
                    cuid = listChild[i].val.uidSend;
                    tmp.push(listChild[i]);
                    if (i === listChild.length - 1) {
                        tmp.reverse();
                        tmpTotal.push({ val: tmp, type: ctype, sendUid: cuid });
                        tmp = [];
                    }
                } else if (i === listChild.length - 1) {
                    tmp.push(listChild[i]);
                    tmp.reverse();
                    tmpTotal.push({ val: tmp, type: ctype, sendUid: cuid });
                    tmp = [];
                } else {
                    tmp.push(listChild[i]);
                }
            }
            if (tmp.length > 0) {
                tmp.reverse();
                tmpTotal.push({ val: tmp, type: ctype, sendUid: cuid });
            }
            setList(tmpTotal);
        } else setList([]);
        return () => {};
    }, [listChild]);

    return (
        <div className="ListMessage__parent">
            <div className="ListMessage__listChild fix_scroll">
                {listSendShow.map((value, index) => (
                    <MessageSending
                        key={index}
                        value={value}
                        user={currentUser}
                    />
                ))}
                {list.map((value, index) => (
                    <Message key={index} value={value} currentUid={uid} />
                ))}
            </div>
        </div>
    );
}

export default React.memo(ListMessage);
