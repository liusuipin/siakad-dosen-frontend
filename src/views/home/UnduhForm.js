import React, { Component, Fragment } from 'react';
import { TabPane, Row, Col, Card, CardText } from 'reactstrap';
// import { NavLink } from 'react-router-dom';
import FormEmail from './form/formEmail.doc';
import FormInput from './form/formInput.doc';
import FormPass from './form/formPass.doc';

export default class UnduhForm extends Component {
    render() {
        return (
            <Fragment>
                <TabPane tabId="4">
                    <Row className="mt-4 text-center">
                        <Col sm="1" md="3" className="p-2">
                            <a href={FormPass} download className="text-decoration-none text-success">
                                <Card body>
                                    <h1><i className="fas fa-key"></i></h1>
                                    <CardText>Form Pergantian Kata Sandi</CardText>
                                    {/* <Button>Go somewhere</Button> */}
                                </Card>
                            </a>
                        </Col>
                        <Col sm="1" md="3" className="p-2">
                            <a href={FormInput} download className="text-decoration-none text-success">
                                <Card body>
                                    <h1><i className="fas fa-file-download"></i></h1>
                                    <CardText>Form Input Pergantian Nilai</CardText>
                                    {/* <Button>Go somewhere</Button> */}
                                </Card>
                            </a>
                        </Col>
                        <Col sm="1" md="3" className="p-2">
                            <a href={FormEmail} download className="text-decoration-none text-success">
                                <Card body>
                                    <h1><i className="fas fa-mail-bulk"></i></h1>
                                    <CardText>Form Pembuatan Email UNJ</CardText>
                                    {/* <Button>Go somewhere</Button> */}
                                </Card>
                            </a>
                        </Col>
                    </Row>
                </TabPane>
            </Fragment>
        )
    }
}