import React, { Component, Fragment } from 'react';
import { TabPane, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
// import { Document, Page } from 'react-pdf';
import kalender from './kalenderAkademik.pdf';
import axios from 'axios';

export default class Kalender extends Component {
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
                <TabPane tabId="2">
                    <Row className="">
                        <Col sm="12">
                            <Form className="mb-4">
                                <FormGroup row>
                                    <Col lg="3" sm="6" md="12" className="pt-3">
                                        <Label>Pilih Tahun :</Label>
                                        <Input type="select" name="tahun" className="form-control-sm" value={this.state.tahun} onChange={this.onChange}>
                                            {
                                                this.state.daftarTahun.map((val, i) => {
                                                    return (
                                                        <option value={val} key={i}>{val}</option>
                                                    )
                                                })
                                            }
                                        </Input>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col sm="12" className="text-center">
                            <embed src={kalender} type="application/pdf" width="100%" height="600px" />
                        </Col>
                    </Row>
                </TabPane>
            </Fragment>
        )
    }
}
