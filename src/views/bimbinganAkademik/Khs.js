import React, { Component, Fragment } from 'react'
import { TabPane, Row, Col, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'

export default class Khs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                kodeSemester: 110
            },
            daftarSemester: [],
            daftarKhs: [],
            header: {
                kodeSemester: '',
                ips: ''
            },
            totalSKS: ''
        }
    }

    onChange = (e) => {
        let newForm = { ...this.state.form }
        newForm[e.target.name] = e.target.value;
        this.setState({
            form: newForm
        })
    }

    componentDidMount() {
        this.getSemester()
        this.getKhs()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.form !== prevState.form) {
            this.getKhs()
        }
    }

    getSemester = () => {
        axios.get('http://localhost:3004/ref/semester', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    daftarSemester: result.data.result
                })
            })
    }

    getKhs = () => {
        axios.get(`http://localhost:3004/bimbinganAkademik/${this.props.nim}/khs/${this.state.form.kodeSemester}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    daftarKhs: result.data.result.khs.listKHS,
                    header: {
                        kodeSemester: result.data.result.header.kodeSemester,
                        ips: result.data.result.khs.ipSemester
                    },
                    totalSKS: result.data.result.khs.totalSKS,
                })
            })
    }

    render() {
        let { form } = this.state
        let num = 1
        return (
            <Fragment>
                <TabPane tabId="5">
                    <Row className="mt-3">
                        <Col>
                            <Form>
                                <FormGroup row>
                                    <Col lg="3" sm="6" md="12" className="">
                                        <Label for="exampleSelect">Semester :</Label>
                                        <Input type="select" name="kodeSemester" value={form.kodeSemester} className="form-control-sm" onChange={this.onChange}>
                                            {
                                                this.state.daftarSemester.map((val, i) => {
                                                    return (
                                                        <option value={val.kodeSemester} key={i}>{val.kodeSemester} - {val.tahunSemester}</option>
                                                    )
                                                })
                                            }
                                        </Input>
                                    </Col>
                                </FormGroup>
                            </Form>

                            <Row className="mb-3 mt-2">
                                <Col sm={4}>
                                    <h6 className="text-dark">Kartu Hasil Studi Semester {this.state.header.kodeSemester}</h6>
                                </Col>
                                <Col sm={3} className="">
                                    <h6 className="text-dark">Total SKS : {this.state.totalSKS}</h6>
                                </Col>
                                <Col sm={5} className="">
                                    <h6 className="text-dark">IPS : {this.state.header.ips}</h6>
                                </Col>
                            </Row>

                            <div className="table-responsive">
                                <Table bordered hover size="">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="text-center">No</th>
                                            <th className="text-center">Kode Seksi</th>
                                            <th className="text-center">Mata Kuliah</th>
                                            <th className="text-center">SKS</th>
                                            <th className="text-center">Bobot</th>
                                            <th className="text-center">Nilai</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.daftarKhs.map((val, i) => (
                                            <tr key={i}>
                                                <th scope="row" className="text-center">{num++}</th>
                                                <td>{val.seksi}</td>
                                                <td>{val.mataKuliah}</td>
                                                <td className="text-center">{val.sks}</td>
                                                <td className="text-center">{val.bobot}</td>
                                                <td className="text-center">{val.nilai}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
            </Fragment>
        )
    }
}
