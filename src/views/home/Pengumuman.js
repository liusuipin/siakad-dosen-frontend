import React, { Component, Fragment } from 'react';
import { TabPane, Row, Col, Alert } from 'reactstrap';

export default class Pengumuman extends Component {
    render() {
        return (
            <Fragment>
                <TabPane tabId="1">
                    <Row className="mt-4">
                        <Col sm="8">
                            <Alert color="warning">
                                <h5><i className="ace-icon fa fa-bullhorn"></i> Pengumuman</h5>
                                <hr />
                                <span><i className="fas fa-arrow-right"></i> Batas akhir pengisian nilai semester 110 pada tanggal <b>27 Juli 2019 pukul 23.00 WIB</b></span><br />
                                <span><i className="fas fa-arrow-right"></i> Evaluasi dosen oleh mahasiswa pada tanggal <b>15 - 25  Juli 2019</b></span><br />
                                <span><i className="fas fa-arrow-right"></i> Batas akhir pengisian nilai skripsi di SIAKAD pada tanggal <b>27 Jui 2019 pukul 23.00 WIB</b></span>

                            </Alert>
                        </Col>
                        {/* <Col>

                        </Col> */}
                    </Row>
                </TabPane>
            </Fragment>
        )
    }
}
