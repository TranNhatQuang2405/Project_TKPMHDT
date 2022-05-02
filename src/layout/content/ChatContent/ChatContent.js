/* eslint-disable no-redeclare */
import { Avatar } from "components";
import React, { useState } from "react";
import BackGround from "image/backgroud.png";
import {
    Col,
    Row,
    Dropdown,
    InputGroup,
    FormControl,
    Button,
    Image,
    Toast,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { invisible } from "configs/redux/Slice/ShowMessageSlice";
import { ListMessage, UserInfo } from "./Component";
import "./chatContent.css";
import {
    addChildMessage,
    addMessage,
} from "configs/firebase/ServiceFirebase/ServiceInsert";
import useIsOnline from "configs/customHook/useIsOnline";
import {
    GetCurrentMessage,
    clear,
} from "configs/redux/Slice/CurrentMessageSlide";
import {
    findUserByUid,
    getMessageByFriendUid,
} from "configs/firebase/ServiceFirebase/ServiceFind";
import { leaveGroup } from "configs/firebase/ServiceFirebase/ServiceDelete";
import {
    uploadFile,
    uploadImage,
    uploadVideo,
} from "configs/firebase/StorageFirebase";
import { add, remove } from "configs/redux/Slice/SendingSlice";
import AddMember from "./Component/AddMember/AddMember";

function ChatContent() {
    const show = useSelector((state) => state.ShowMessage.value);
    const currentUser = useSelector((state) => state.UserInfo.user);
    const MessageData = useSelector((state) => state.CurrentMessage.data);
    const IsOnline = useIsOnline(MessageData && MessageData.keyUser);
    const [showInfo, setShowInfo] = useState(false);
    const [showAddMember, setShowAddMember] = useState(false);
    const dispatch = useDispatch();
    const [Message, setMessage] = useState({
        message: "",
        file: [],
        ListNameFile: [],
    });
    const className_chat = show
        ? "chatContent__body chatContent__body-show"
        : "chatContent__body";

    const handleLeaveGroup = async () => {
        await leaveGroup(currentUser.key, MessageData.key, currentUser.uid);
        dispatch(invisible());
        dispatch(clear());
    };

    const getExtension = (filename) => {
        var parts = filename.split(".");
        return parts[parts.length - 1];
    };
    const checkTypeFile = (filename) => {
        var ext = getExtension(filename);
        switch (ext.toLowerCase()) {
            case "jpg":
            case "gif":
            case "bmp":
            case "png":
            case "jpeg":
                return 1;
            case "m4v":
            case "avi":
            case "mpg":
            case "mp4":
                return 2;
            default:
                return 0;
        }
    };

    const handleSend = async () => {
        const message = Message.message;
        const file = Message.file;
        var key = MessageData.key;
        var listImageVideo = [];
        var listFile = [];
        if (message.trim() === "" && file.length <= 0) return;
        if (MessageData.type === 1) {
            setMessage({ message: "", file: [], ListNameFile: [] });
            //Tìm key hoặc Tạo message khi chưa có
            if (!MessageData.key) {
                key = await getMessageByFriendUid(
                    MessageData.UidFriend,
                    currentUser.uid
                );
                if (!key)
                    key = await addMessage(1, null, null, null, [
                        MessageData.UidFriend,
                        currentUser.uid,
                    ]);
                dispatch(
                    GetCurrentMessage({
                        key: key,
                        typeMessage: 1,
                        friend: await findUserByUid(MessageData.UidFriend),
                    })
                );
            }
            //Gửi message đối với bạn
            if (file.length > 0) {
                for (var i = 0; i < file.length; i++) {
                    var check = checkTypeFile(file[i].name);
                    var url = "";
                    var waitUrl = URL.createObjectURL(file[i]);
                    if (check === 1) {
                        dispatch(add({ key: key, url: waitUrl, type: 1 }));
                        url = await uploadImage(file[i]);
                        listImageVideo.push(url);
                        dispatch(remove({ key: key, url: waitUrl, type: 1 }));
                    } else if (check === 2) {
                        dispatch(add({ key: key, url: waitUrl, type: 2 }));
                        url = await uploadVideo(file[i]);
                        listImageVideo.push(url);
                        dispatch(remove({ key: key, url: waitUrl, type: 2 }));
                    } else {
                        dispatch(add({ key: key, url: waitUrl, type: 3 }));
                        url = await uploadFile(file[i]);
                        listFile.push({ url: url, name: file[i].name });
                        dispatch(remove({ key: key, url: waitUrl, type: 3 }));
                    }
                }
                if (listImageVideo.length > 0) {
                    await addChildMessage(
                        key,
                        2,
                        currentUser.uid,
                        "@attach",
                        listImageVideo,
                        null
                    );
                }
                if (listFile.length > 0) {
                    for (var i = 0; i < listFile.length; i++) {
                        await addChildMessage(
                            key,
                            3,
                            currentUser.uid,
                            "@attach",
                            listFile[i].url,
                            listFile[i].name
                        );
                    }
                }
            } else if (message.trim() !== "") {
                await addChildMessage(
                    key,
                    1,
                    currentUser.uid,
                    message,
                    null,
                    null
                );
            }
        } else {
            setMessage({ message: "", file: [], ListNameFile: [] });
            //Gửi message đối với nhóm
            if (file.length > 0) {
                for (var i = 0; i < file.length; i++) {
                    var check = checkTypeFile(file[i].name);
                    var url = "";
                    var waitUrl = URL.createObjectURL(file[i]);
                    if (check === 1) {
                        dispatch(add({ key: key, url: waitUrl, type: 1 }));
                        url = await uploadImage(file[i]);
                        listImageVideo.push(url);
                        dispatch(remove({ key: key, url: waitUrl, type: 1 }));
                    } else if (check === 2) {
                        dispatch(add({ key: key, url: waitUrl, type: 2 }));
                        url = await uploadVideo(file[i]);
                        listImageVideo.push(url);
                        dispatch(remove({ key: key, url: waitUrl, type: 2 }));
                    } else {
                        dispatch(add({ key: key, url: waitUrl, type: 3 }));
                        url = await uploadFile(file[i]);
                        listFile.push({ url: url, name: file[i].name });
                        dispatch(remove({ key: key, url: waitUrl, type: 3 }));
                    }
                }

                if (listImageVideo.length > 0) {
                    await addChildMessage(
                        key,
                        2,
                        currentUser.uid,
                        "@attach",
                        listImageVideo,
                        null
                    );
                }
                if (listFile.length > 0) {
                    for (var i = 0; i < listFile.length; i++) {
                        await addChildMessage(
                            key,
                            3,
                            currentUser.uid,
                            "@attach",
                            listFile[i].url,
                            listFile[i].name
                        );
                    }
                }
                setMessage({ message: "", file: [], ListNameFile: [] });
            } else if (message.trim() !== "") {
                await addChildMessage(
                    key,
                    1,
                    currentUser.uid,
                    message,
                    null,
                    null
                );
            }
        }
    };

    const handleDeleteFile = (name) => {
        var ListNameFile = Message.ListNameFile;
        ListNameFile = ListNameFile.filter((value) => value !== name);
        const listfile = Message.file;
        const dt = new DataTransfer();

        for (let i = 0; i < listfile.length; i++) {
            const file = listfile[i];
            if (name !== file.name) dt.items.add(file);
        }
        setMessage((prev) => ({
            ...prev,
            file: dt.files,
            ListNameFile: ListNameFile,
        }));
    };

    const handleChangeMessage = (e) => {
        const message = e.target.value;
        setMessage((prev) => ({ ...prev, message: message }));
    };
    const handleChangeFile = (e) => {
        const listFile = e.target.files;
        var ListNameFile = [];
        for (var i = 0; i < listFile.length; i++) {
            const a = listFile[i].name;
            ListNameFile.push(a);
        }
        setMessage((prev) => ({
            ...prev,
            file: listFile,
            ListNameFile: ListNameFile,
        }));
    };

    if (MessageData && MessageData.type === 1) {
        return (
            <Col lg className={className_chat}>
                {/* Body message*/}
                <Row className="bottom_border">
                    <Col lg={4} xs={8}>
                        <div className="p-2 p-lg-3 align-content-center flex-grow-0 d-inline-flex">
                            <div className="d-flex align-items-center">
                                <div
                                    className="d-block d-lg-none me-3 ms-0 cur-pointer"
                                    onClick={() => dispatch(invisible())}
                                >
                                    <i className="bi bi-chevron-left"></i>
                                </div>
                                <div className="me-3 ms-0">
                                    <Avatar
                                        width="3.5rem"
                                        url={MessageData.photoURL}
                                        status={
                                            MessageData.type === 1
                                                ? IsOnline
                                                : MessageData.isOnline
                                        }
                                    />
                                </div>
                                <div className="flex-grow-1 overflow-hidden">
                                    <h5 className="fz-16 mb-0 text-truncate">
                                        {MessageData.name}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="d-flex h-100 align-items-center float-end pe-3">
                            <div className="ChatContent__icon d-none d-lg-flex">
                                <i className="bi bi-telephone-fill"></i>
                            </div>
                            <div className="ChatContent__icon d-none d-lg-flex">
                                <i className="bi bi-camera-video-fill"></i>
                            </div>
                            <div
                                className="ChatContent__icon d-none d-lg-flex"
                                onClick={() => setShowInfo(true)}
                            >
                                <i className="bi bi-person"></i>
                            </div>
                            <div className="ChatContent__icon d-flex">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        as="div"
                                        bsPrefix="listContact__dropdownToggle"
                                    >
                                        <i className="bi bi-three-dots"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        align="end"
                                        className="text-muted ChatContent__dropdown-background"
                                    >
                                        <Dropdown.Item className="listContact__dropdownItem d-lg-none d-block ChatContent__dropdownLink">
                                            Call
                                            <i className="bi bi-telephone-fill float-end"></i>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            className="listContact__dropdownItem d-lg-none d-block ChatContent__dropdownLink"
                                            onClick={() => {
                                                setShowInfo(true);
                                            }}
                                        >
                                            Info
                                            <i className="bi bi-person float-end"></i>
                                        </Dropdown.Item>
                                        <Dropdown.Item className="listContact__dropdownItem ChatContent__dropdownLink">
                                            Muted
                                            <i className="bi bi-bell-slash float-end"></i>
                                        </Dropdown.Item>
                                        <Dropdown.Item className="listContact__dropdownItem ChatContent__dropdownLink">
                                            Delete
                                            <i className="bi bi-trash3-fill float-end"></i>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="flex-grow-1 position-relative p-3">
                    <ListMessage
                        keyId={MessageData.key}
                        uid={currentUser.uid}
                    />
                </Row>
                <Row className="top_border p-2 p-lg-3 chatContent__input-parent">
                    <InputGroup>
                        <FormControl
                            className="bg-light border-0 seach__text-color chatContent__input fix_scroll"
                            placeholder="Enter Message..."
                            aria-label="Message"
                            as={
                                Message.ListNameFile &&
                                Message.ListNameFile.length > 0
                                    ? "div"
                                    : "textarea"
                            }
                            name="message"
                            value={Message.message}
                            onChange={handleChangeMessage}
                        >
                            {Message.ListNameFile &&
                            Message.ListNameFile.length > 0 ? (
                                Message.ListNameFile.map((value, index) => (
                                    <Toast
                                        key={index}
                                        className="chatContent__body-toast"
                                        onClose={() => handleDeleteFile(value)}
                                    >
                                        <Toast.Header className="chatContent__body-toast">
                                            {value}
                                        </Toast.Header>
                                    </Toast>
                                ))
                            ) : (
                                <></>
                            )}
                        </FormControl>
                        <Button
                            className="chatContent__button"
                            variant="outline-secondary"
                            htmlFor="file_send"
                            as="label"
                        >
                            <i className="bi bi-paperclip"></i>
                        </Button>
                        <InputGroup className="rounded-3 d-none">
                            <FormControl
                                id="file_send"
                                type="file"
                                multiple={true}
                                files={Message.file}
                                onChange={handleChangeFile}
                            ></FormControl>
                        </InputGroup>
                        <Button
                            className="chatContent__buttonSend"
                            variant="outline-secondary"
                            name="btn_send"
                            onClick={handleSend}
                        >
                            <i className="bi bi-play-fill"></i>
                        </Button>
                    </InputGroup>
                </Row>
                {/*Tab info */}
                <UserInfo
                    showInfo={showInfo}
                    setShowInfo={setShowInfo}
                    info={MessageData}
                />
            </Col>
        );
    } else if (MessageData && MessageData.type === 2) {
        return (
            <Col lg className={className_chat}>
                {/* Body message*/}
                <Row className="bottom_border">
                    <Col lg={4} xs={8}>
                        <div className="p-2 p-lg-3 align-content-center flex-grow-0 d-inline-flex">
                            <div className="d-flex align-items-center">
                                <div
                                    className="d-block d-lg-none me-3 ms-0 cur-pointer"
                                    onClick={() => dispatch(invisible())}
                                >
                                    <i className="bi bi-chevron-left"></i>
                                </div>
                                <div className="me-3 ms-0">
                                    <Avatar
                                        width="3.5rem"
                                        url={MessageData.photoURL}
                                        status={
                                            MessageData.type === 1
                                                ? IsOnline
                                                : MessageData.isOnline
                                        }
                                    />
                                </div>
                                <div className="flex-grow-1 overflow-hidden">
                                    <h5 className="fz-16 mb-0 text-truncate">
                                        {MessageData.name}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="d-flex h-100 align-items-center float-end pe-3">
                            <div className="ChatContent__icon d-none d-lg-flex">
                                <i className="bi bi-telephone-fill"></i>
                            </div>
                            <div className="ChatContent__icon d-none d-lg-flex">
                                <i className="bi bi-camera-video-fill"></i>
                            </div>
                            <div
                                className="ChatContent__icon d-none d-lg-flex"
                                onClick={() => setShowInfo(true)}
                            >
                                <i className="bi bi-person"></i>
                            </div>
                            <div className="ChatContent__icon d-flex">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        as="div"
                                        bsPrefix="listContact__dropdownToggle"
                                    >
                                        <i className="bi bi-three-dots"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        align="end"
                                        className="text-muted ChatContent__dropdown-background"
                                    >
                                        <Dropdown.Item className="listContact__dropdownItem d-lg-none d-block ChatContent__dropdownLink">
                                            Call
                                            <i className="bi bi-telephone-fill float-end"></i>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            className="listContact__dropdownItem d-lg-none d-block ChatContent__dropdownLink"
                                            onClick={() => {
                                                setShowInfo(true);
                                            }}
                                        >
                                            Info
                                            <i className="bi bi-person float-end"></i>
                                        </Dropdown.Item>
                                        <Dropdown.Item className="listContact__dropdownItem ChatContent__dropdownLink">
                                            Muted
                                            <i className="bi bi-bell-slash float-end"></i>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            className="listContact__dropdownItem ChatContent__dropdownLink"
                                            onClick={() =>
                                                setShowAddMember(true)
                                            }
                                        >
                                            Add Member
                                            <i className="bi bi-person-plus-fill float-end"></i>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            className="listContact__dropdownItem ChatContent__dropdownLink"
                                            onClick={handleLeaveGroup}
                                        >
                                            Leave Group
                                            <i className="bi bi-trash3-fill float-end"></i>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="flex-grow-1 position-relative p-3">
                    <ListMessage
                        keyId={MessageData.key}
                        uid={currentUser.uid}
                    />
                </Row>
                <Row className="top_border p-2 p-lg-3 chatContent__input-parent">
                    <InputGroup>
                        <FormControl
                            className="bg-light border-0 seach__text-color chatContent__input fix_scroll"
                            placeholder="Enter Message..."
                            aria-label="Message"
                            as={
                                Message.ListNameFile &&
                                Message.ListNameFile.length > 0
                                    ? "div"
                                    : "textarea"
                            }
                            name="message"
                            value={Message.message}
                            onChange={handleChangeMessage}
                        >
                            {Message.ListNameFile &&
                            Message.ListNameFile.length > 0 ? (
                                Message.ListNameFile.map((value, index) => (
                                    <Toast
                                        key={index}
                                        className="chatContent__body-toast"
                                        onClose={() => handleDeleteFile(value)}
                                    >
                                        <Toast.Header className="chatContent__body-toast">
                                            {value}
                                        </Toast.Header>
                                    </Toast>
                                ))
                            ) : (
                                <></>
                            )}
                        </FormControl>
                        <Button
                            className="chatContent__button"
                            variant="outline-secondary"
                            htmlFor="file_send"
                            as="label"
                        >
                            <i className="bi bi-paperclip"></i>
                        </Button>
                        <InputGroup className="rounded-3 d-none">
                            <FormControl
                                id="file_send"
                                type="file"
                                multiple={true}
                                files={Message.file}
                                onChange={handleChangeFile}
                            ></FormControl>
                        </InputGroup>
                        <Button
                            className="chatContent__buttonSend"
                            variant="outline-secondary"
                            name="btn_send"
                            onClick={handleSend}
                        >
                            <i className="bi bi-play-fill"></i>
                        </Button>
                    </InputGroup>
                </Row>
                {/*Tab info */}
                <UserInfo
                    showInfo={showInfo}
                    setShowInfo={setShowInfo}
                    info={MessageData}
                />
                <AddMember
                    show={showAddMember}
                    setShow={setShowAddMember}
                    keyId={MessageData.key}
                    uid={currentUser.uid}
                />
            </Col>
        );
    } else
        return (
            <Col lg className={className_chat}>
                <Image
                    src={BackGround}
                    width="100%"
                    height="100%"
                    className="chatContent__body-background"
                />
            </Col>
        );
}

export default ChatContent;
