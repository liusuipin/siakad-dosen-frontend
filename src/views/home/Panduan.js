import React, { Component, Fragment } from 'react';
import { TabPane, Row, Col, Card, CardText } from 'reactstrap';
// import { NavLink } from 'react-router-dom';
import PanduanSiakad from './panduan/panduan.doc';

export default class Panduan extends Component {
    render() {
        return (
            <Fragment>
                <TabPane tabId="5">
                    <Row className="mt-4">
                        {/* <Col sm="12">
                            <p>Anda dapat mengunduh panduan penggunaan SIAKAD dengan klik ikon di bawah.</p>
                        </Col> */}
                        <Col sm="1" md="3" className="p-2  text-center">
                            <a href={PanduanSiakad} download className="text-decoration-none text-success">
                                <Card body>
                                    <h1><i className="fas fa-cloud-download-alt"></i></h1>
                                    <CardText>Panduan Penggunaan SIAKAD</CardText>
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