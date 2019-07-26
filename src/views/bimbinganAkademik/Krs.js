import React, { Component, Fragment } from 'react'
import { TabPane, Row, Col, Table, Button, FormText } from 'reactstrap';
import axios from 'axios'
// import { async } from 'q';

export default class Krs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                kodeSemester: 110
            },
            daftarSemester: [],
            daftarKrs: [],
            header: {
                kodeSemester: ''
                // ips: ''
            },
            totalSKS: '',
            // acc: {
            //     kodeKelas: '',
            //     accAwal: 0,
            //     accUpdate: 0
            // }
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
        this.getKrs()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.form !== prevState.form) {
            this.getKrs()
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

    getKrs = () => {
        axios.get(`http://localhost:3004/bimbinganAkademik/${this.props.nim}/krs/${this.state.form.kodeSemester}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    daftarKrs: result.data.result.krs.listKRS,
                    header: {
                        kodeSemester: result.data.result.header.kodeSemester
                        // ips: result.data.result.krs.ipSemester
                    },
                    totalSKS: result.data.result.krs.totalSKS
                })
            })
    }

    putAcc = (data) => {
        // console.log(data)
        axios.put(`http://localhost:3004/bimbinganAkademik/${this.props.nim}/krs/${this.state.form.kodeSemester}`, {
            data: [
                {
                    ...data
                }
            ]
        }, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('token'),
                    "Content-Type": "application/json"
                }
            })
            .then(result => {
                // console.log(result)
                this.getKrs()
            })
    }

    acc = async (e) => {
        const acc = e.currentTarget.dataset.acc;
        const data = acc === 'acc' ? {
            kodeKelas: e.currentTarget.dataset.key,
            accAwal: "TIDAK",
            accUpdate: "SETUJU"
        } : {
                kodeKelas: e.currentTarget.dataset.key,
                accAwal: "SETUJU",
                accUpdate: "TIDAK"
            }
        // console.log(data)
        this.setState({
            ...this.state,
            acc: data
        })
        // console.log(this.state.acc)
        // let data = JSON.stringify(this.state.acc)
        await this.putAcc(data)

    }

    render() {
        // let { form } = this.state
        let num = 1
        return (
            <Fragment>
                <TabPane tabId="4">
                    <Row className="mt-3">
                        <Col>
                            {/* <Form>
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
                            </Form> */}

                            <Row className="">
                                <Col sm={12}>
                                    <h6 className="text-dark">Kartu Rencana Studi Semester {this.state.header.kodeSemester}</h6>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col>
                                    <FormText color="muted">
                                        <span><b>Keterangan: </b> <br />
                                            1. Klik tombol (<i className="fas fa-check text-success"></i>) jika menyetujui matakuliah yang akan diambil mahasiswa bimbingan akademik <br />
                                            2. Klik tombol (<i className="fas fa-times text-danger"></i>) jika tidak menyetujui matakuliah yang akan diambil mahasiswa bimbingan akademik<br />
                                            3. Status setuju/tidak setuju akan tersimpan otomatis ketika tombol diklik
                                        </span>
                                    </FormText>
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
                                            <th className="text-center">Nama Dosen</th>
                                            <th className="text-center th-width140">Aksi</th>
                                            <th className="text-center">STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.daftarKrs.map((val, i) => (
                                            <tr key={i}>
                                                <th scope="row" className="text-center">{num++}</th>
                                                <td>{val.seksi}</td>
                                                <td>{val.mataKuliah}</td>
                                                <td className="text-center">{val.sks}</td>
                                                <td className="text-center">{val.namaDosen}</td>
                                                <td className="text-center ">
                                                    <Button className="btn-sm btn-success" onClick={this.acc} data-acc="acc" data-key={val.seksi}><i className="fas fa-check"></i></Button>
                                                    <Button className="btn-sm btn-danger ml-2" onClick={this.acc} data-acc="cancel" data-key={val.seksi}><i className="fas fa-times pl-1 pr-1"></i></Button>
                                                </td>
                                                <td className="text-center"><b>{val.accKRS}</b></td>
                                                {/* <td className={val.acc==="SETUJU" ? "text-center text-success" : "text-center-text-danger"}><b>{val.accKRS}</b></td> */}
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={7} className="text-center">Total SKS : <b>{this.state.totalSKS}</b></td>
                                        </tr>
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
