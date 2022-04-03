import { Avatar } from "components";
import React, { useState } from "react";
import {
    Col,
    Row,
    Dropdown,
    InputGroup,
    FormControl,
    Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { invisible } from "configs/redux/Slice/ShowMessageSlice";
import { ListMessage } from "./Component";
import "./chatContent.css";
function ChatContent() {
    const show = useSelector((state) => state.ShowMessage.value);
    const [showInfo, setShowInfo] = useState(false);
    const dispatch = useDispatch();
    const className_chat = show
        ? "chatContent__body chatContent__body-show"
        : "chatContent__body";
    return (
        <Col lg className={className_chat}>
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
                                <Avatar width="3.5rem" status={true} />
                            </div>
                            <div className="flex-grow-1 overflow-hidden">
                                <h5 className="fz-16 mb-0 text-truncate">
                                    Doris Brown
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
                <ListMessage />
            </Row>
            <Row className="top_border p-2 p-lg-3">
                <InputGroup>
                    <FormControl
                        className="bg-light border-0 seach__text-color chatContent__input"
                        placeholder="Enter Message..."
                        aria-label="Message"
                    />
                    <Button
                        className="chatContent__button"
                        variant="outline-secondary"
                    >
                        <i className="bi bi-emoji-smile"></i>
                    </Button>
                    <Button
                        className="chatContent__button"
                        variant="outline-secondary"
                    >
                        <i className="bi bi-paperclip"></i>
                    </Button>
                    <Button
                        className="chatContent__buttonSend"
                        variant="outline-secondary"
                    >
                        <i className="bi bi-play-fill"></i>
                    </Button>
                </InputGroup>
            </Row>
            <div className={`ChatContent__userInfo ${showInfo ? "show" : ""}`}>
                <div
                    className="ChatContent__userInfo-buttonClose"
                    onClick={() => setShowInfo(false)}
                >
                    <i className="bi bi-x-circle-fill"></i>
                </div>
                <div className="ChatContent__userInfo-avatar">
                    <Avatar width="5rem" />
                    <div>Trần Nhất Quang</div>
                </div>
            </div>
        </Col>
    );
}

export default ChatContent;
