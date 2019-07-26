import React, { Component, Fragment } from 'react';
import { TabPane, Row, Col, Card, CardText, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Unjlogo from '../../assets/img/unj2.png';
import './Home.css';
import axios from 'axios';
import FT from './bpa/ft.pdf';
import FBS from './bpa/fbs.pdf';
import FE from './bpa/fe.pdf';
import FIK from './bpa/fik.pdf';
import FIP from './bpa/fip.pdf';
import FIS from './bpa/fis.pdf';
import FMIPA from './bpa/fmipa.pdf';
import FPSI from './bpa/fis.pdf';

export default class Bpa extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tahun: 2019,
            daftarTahun: []
        }
    }

    componentDidMount() {
        this.getTahun()
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getTahun = () => {
        axios.get(`http://localhost:3004/ref/tahun`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    daftarTahun: result.data.result
                })
            })
    }
    render() {
        return (
            <Fragment>
                <TabPane tabId="3">
                    <Row className="mt-1">
                        <Col sm="12">
                            <Form className="mb-4">
                                <FormGroup row>
                                    <Col lg="3" sm="6" md="12" className="pt-3">
                                        <Label for="exampleSelect" className="text-left">Pilih Tahun :</Label>
                                        <Input type="select" name="tahun" className="form-control-sm" value={this.state.tahun} onChange={this.onChange}>
                                            {this.state.daftarTahun.map((val, i) => (
                                                <option value={val} key={i}>{val}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    {/* <Col sm="3" className="pt-3 mt-auto">
                                        <Button color="info" className="btn-sm"><i className="fas fa-search"></i> Proses</Button>
                                    </Col> */}
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col md="3" sm="1" className="p-3">
                            <Card body className="text-white" style={{ backgroundColor: '#197a4d' }}>
                                <img src={Unjlogo} width="50" className="mx-auto mb-2" alt="unj-logo" />
                                <CardText>Fakultas Ilmu Pendidikan</CardText>
                            </Card>
                            <a href={FIP} download><Button color="light" className="col-sm-12 text-secondary btn-sm"><i className="fas fa-cloud-download-alt"></i> Unduh</Button></a>
                        </Col>
                        <Col md="3" sm="1" className="p-3">
                            <Card body className="text-white" style={{ backgroundColor: '#fb005d' }}>
                                <img src={Unjlogo} width="50" className="mx-auto mb-2" alt="unj-logo" />
                                <CardText>Fakultas Bahasa & Seni</CardText>
                            </Card>
                            <a href={FBS} download><Button color="light" className="col-sm-12 text-secondary btn-sm"><i className="fas fa-cloud-download-alt"></i> Unduh</Button></a>
                        </Col>
                        <Col md="3" sm="1" className="p-3">
                            <Card body className="text-white" style={{ backgroundColor: '#e31a22', borderColor: '#e31a22' }}>
                                <img src={Unjlogo} width="50" className="mx-auto mb-2" alt="unj-logo" />
                                <CardText>Fakultas Ilmu Sosial</CardText>
                            </Card>
                            <a href={FIS} download><Button color="light" className="col-sm-12 text-secondary btn-sm"><i className="fas fa-cloud-download-alt"></i> Unduh</Button></a>
                        </Col>
                        <Col md="3" sm="1" className="p-3">
                            <Card body className="text-white" style={{ backgroundColor: '#006eae', borderColor: '#006eae' }}>
                                <img src={Unjlogo} width="50" className="mx-auto mb-2" alt="unj-logo" />
                                <CardText>Fakultas Teknik</CardText>
                            </Card>
                            <a href={FT} download> <Button color="light" className="col-sm-12 text-secondary btn-sm"><i className="fas fa-cloud-download-alt"></i> Unduh</Button></a>
                        </Col>
                        <Col md="3" sm="1" className="p-3">
                            <Card body className="text-white" style={{ backgroundColor: '#915295', borderColor: '#915295' }}>
                                <img src={Unjlogo} width="50" className="mx-auto mb-2" alt="unj-logo" />
                                <CardText>Fakultas MIPA</CardText>
                            </Card>
                            <a href={FMIPA} download><Button color="light" className="col-sm-12 text-secondary btn-sm"><i className="fas fa-cloud-download-alt"></i> Unduh</Button></a>
                        </Col>
                        <Col md="3" sm="1" className="p-3">
                            <Card body className="text-warning" style={{ backgroundColor: '#ffffff' }}>
                                <img src={Unjlogo} width="50" className="mx-auto mb-2" alt="unj-logo" />
                                <CardText>Fakultas Ilmu Keolahragaan</CardText>
                            </Card>
                            <a href={FIK} download><Button color="light" className="col-sm-12 text-secondary btn-sm"><i className="fas fa-cloud-download-alt"></i> Unduh</Button></a>
                        </Col>
                        <Col md="3" sm="1" className="p-3">
                            <Card body className="text-white" style={{ backgroundColor: '#ae7337', borderColor: '#ae7337' }}>
                                <img src={Unjlogo} width="50" className="mx-auto mb-2" alt="unj-logo" />
                                <CardText>Fakultas Ekonomi</CardText>
                            </Card>
                            <a href={FE} download><Button color="light" className="col-sm-12 text-secondary btn-sm"><i className="fas fa-cloud-download-alt"></i> Unduh</Button></a>
                        </Col>
                        <Col md="3" sm="1" className="p-3">
                            <Card body className=" text-white" style={{ backgroundColor: '#bdd7ee', borderColor: '#bdd7ee' }}>
                                <img src={Unjlogo} width="50" className="mx-auto mb-2" alt="unj-logo" />
                                <CardText>Fakultas Pend. Psikologi</CardText>
                            </Card>
                            <a href={FPSI} download><Button color="light" className="col-sm-12 text-secondary btn-sm"><i className="fas fa-cloud-download-alt"></i> Unduh</Button></a>
                        </Col>
                    </Row>

                </TabPane>
            </Fragment>
        )
    }
}