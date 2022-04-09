import React, { useState } from "react";
import {
    Row,
    Col,
    InputGroup,
    FormControl,
    OverlayTrigger,
    Tooltip,
    Dropdown,
    Modal,
} from "react-bootstrap";
import { Avatar } from "components";
import { useSelector } from "react-redux";
import "./listContact.css";

function ListContact() {
    const localTheme = useSelector((state) => state.LocalTheme.theme);
    const [show, setShow] = useState(false);
    return (
        <div className="pt-4 px-3 ListContact__Parent">
            <Row>
                <Col>
                    <h4 className="mb-4">Contacts</h4>
                </Col>
                <Col>
                    <Modal
                        show={show}
                        centered
                        onHide={() => setShow(false)}
                        data-layout-mode={localTheme}
                    >
                        <Modal.Header closeButton className="modal__bg-fix">
                            <h5>Add contact</h5>
                        </Modal.Header>
                        <Modal.Body className="modal__bg-fix">
                            <InputGroup className="mb-4 rounded-3">
                                <InputGroup.Text
                                    className="bg-light ps-3 pe-1 text-muted-bg border-0"
                                    id="basic-addon1"
                                >
                                    <i
                                        className="bi bi-search cur-pointer"
                                        style={{ lineHeight: 2 }}
                                    ></i>
                                </InputGroup.Text>
                                <FormControl
                                    className="bg-light border-0 seach__text-color"
                                    placeholder="Search users..."
                                    aria-label="Search users..."
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <h6>List contact</h6>
                        </Modal.Body>
                    </Modal>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Add Contact</Tooltip>}
                    >
                        <i
                            className="bi bi-person-plus-fill fz-20 float-end me-2 cur-pointer"
                            onClick={() => setShow(true)}
                        ></i>
                    </OverlayTrigger>
                </Col>
            </Row>
            <InputGroup className="mb-4 rounded-3">
                <InputGroup.Text
                    className="bg-light ps-3 pe-1 text-muted-bg border-0"
                    id="basic-addon1"
                >
                    <i className="bi bi-search cur-pointer lh-2"></i>
                </InputGroup.Text>
                <FormControl
                    className="bg-light border-0 seach__text-color"
                    placeholder="Search users..."
                    aria-label="Search users..."
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
            <div className="ListContact__Child">
                <div className="ListContact__NodeChild fix_scroll">
                    <div className="listContact__GroupAtoZ">
                        <div className="listContact__AtoZ">A</div>
                        <div className="p-2 d-flex cur-pointer listChatContent__child">
                            <Col lg={2} xs={2} className="align-self-center">
                                <Avatar width="70%" />
                            </Col>
                            <Col
                                lg={8}
                                xs={8}
                                className="align-self-center flex-grow-1"
                            >
                                <h5 className="fz-15 text-truncate">
                                    Trần Nhất Quang
                                </h5>
                            </Col>
                            <Col
                                lg="auto"
                                xs="auto"
                                className="align-self-center"
                            >
                                <Dropdown>
                                    <Dropdown.Toggle
                                        as="div"
                                        bsPrefix="listContact__dropdownToggle"
                                    >
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        align="end"
                                        className="text-muted"
                                    >
                                        <Dropdown.Item className="listContact__dropdownItem">
                                            Share
                                            <i className="bi bi-share float-end text-muted"></i>
                                        </Dropdown.Item>
                                        <Dropdown.Item className="listContact__dropdownItem">
                                            Remove
                                            <i className="bi bi-trash3-fill float-end text-muted"></i>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </div>
                    </div>
                    <div className="listContact__GroupAtoZ">
                        <div className="listContact__AtoZ">A</div>
                        <div className="p-2 d-flex cur-pointer listChatContent__child">
                            <Col lg={2} xs={2} className="align-self-center">
                                <Avatar width="70%" />
                            </Col>
                            <Col
                                lg={8}
                                xs={8}
                                className="align-self-center flex-grow-1"
                            >
                                <h5 className="fz-15 text-truncate">
                                    Trần Nhất Quang
                                </h5>
                            </Col>
                            <Col
                                lg="auto"
                                xs="auto"
                                className="align-self-center"
                            >
                                <Dropdown>
                                    <Dropdown.Toggle
                                        as="div"
                                        bsPrefix="listContact__dropdownToggle"
                                    >
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        align="end"
                                        className="text-muted"
                                    >
                                        <Dropdown.Item className="listContact__dropdownItem">
                                            Share
                                            <i className="bi bi-share float-end text-muted"></i>
                                        </Dropdown.Item>
                                        <Dropdown.Item className="listContact__dropdownItem">
                                            Remove
                                            <i className="bi bi-trash3-fill float-end text-muted"></i>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListContact;
