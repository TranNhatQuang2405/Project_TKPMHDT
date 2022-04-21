import React from "react";
import "./setting.css";
import { Avatar } from "components";
import { Accordion, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { SetIsPending } from "configs/redux/Slice/UserSlice";
import { auth } from "configs/firebase/config";
import { updateLogOut } from "configs/firebase/ServiceFirebase/ServiceUpdate";
import { change } from "configs/redux/Slice/ThemeSlice";

function Setting() {
    const currentUser = useSelector((state) => state.UserInfo.user);
    const localTheme = useSelector((state) => state.LocalTheme.theme);
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        const userId = auth.currentUser.uid;
        dispatch(SetIsPending());
        auth.signOut()
            .then(() => {
                updateLogOut(userId);
            })
            .catch((e) => console.log(e));
    };
    return (
        <div className="Setting__body">
            <div className="ChatContent__userInfo-avatar">
                <Avatar width="5rem" />
                <div className="mt-2">{currentUser.displayName}</div>
            </div>
            <div className="ChatContent__userInfo-body fix_scroll p-4">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item
                        className="userInfo__AccordionItem"
                        eventKey="0"
                    >
                        <Accordion.Header className="header__AccordionItem">
                            <h6>
                                <i className="bi bi-menu-button-wide-fill pe-2 fz-20"></i>
                                App
                            </h6>
                        </Accordion.Header>
                        <Accordion.Body className="Setting__accordion-body">
                            <div>
                                <Form>
                                    <Form.Label></Form.Label>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Notification Sound"
                                    />
                                    <Form.Label />
                                    <Form.Label></Form.Label>
                                    <Form.Check
                                        checked={
                                            localTheme === "dark" ? true : false
                                        }
                                        onChange={() => dispatch(change())}
                                        type="switch"
                                        id="custom-switch"
                                        label="Dark Mode"
                                    />
                                    <Form.Label />
                                </Form>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        className="userInfo__AccordionItem"
                        eventKey="1"
                    >
                        <Accordion.Header className="header__AccordionItem">
                            <h6>
                                <i className="bi bi-person-lines-fill pe-2 fz-20"></i>
                                Account
                            </h6>
                        </Accordion.Header>
                        <Accordion.Body className="Setting__accordion-body">
                            <div
                                className="Setting__accordion-item"
                                onClick={() => handleSignOut()}
                            >
                                <i className="bi bi-box-arrow-right"></i>
                                <span className="Setting__accordion-itemSignOut">
                                    Sign Out
                                </span>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
}

export default Setting;