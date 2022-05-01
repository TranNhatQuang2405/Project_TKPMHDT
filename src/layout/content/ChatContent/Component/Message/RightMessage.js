import React from "react";
import { Avatar } from "components";
import { Dropdown } from "react-bootstrap";

function RightMessage({ user, value }) {
    return (
        <div className="Message__Parent flex-row-reverse">
            <div className="d-flex flex-column-reverse">
                <Avatar width="2rem" url={user.photoURL} />
            </div>
            <div className="Message__Content-Right">
                {value.val.map((tmp) => (
                    <div className="nodeChildMessage-Right" key={tmp.key}>
                        <div className="childMessage">
                            <span>{tmp.val.title}</span>
                            <div className="d-flex">
                                <div className="childMessage-hour">
                                    {new Date(
                                        tmp.val.createAt
                                    ).toLocaleTimeString("en-US", {
                                        hour12: true,
                                        hour: "numeric",
                                        minute: "numeric",
                                    })}
                                </div>
                            </div>
                            {tmp.showSend === 1 ? (
                                <div className="showSend">Sent</div>
                            ) : tmp.showSend === 2 ? (
                                <div className="showSend">Seen</div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="messageAction">
                            <Dropdown>
                                <Dropdown.Toggle
                                    as="div"
                                    bsPrefix="listContact__dropdownToggle"
                                >
                                    <i className="bi bi-three-dots-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    align="end"
                                    className="text-muted messageAction__dropdown"
                                >
                                    <Dropdown.Item className="messageAction__dropdown-item">
                                        <i className="bi bi-share"></i>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="messageAction__dropdown-item">
                                        <i className="bi bi-trash3-fill"></i>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                ))}

                <div className="userName">{user.displayName}</div>
            </div>
        </div>
    );
}

export default React.memo(RightMessage);
