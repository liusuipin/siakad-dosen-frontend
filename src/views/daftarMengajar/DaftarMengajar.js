import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Breadcrumb, BreadcrumbItem, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { GlobalConsumer } from '../../context/context';
import Navigation from '../../components/navigation/Navigation';
import Sidebar from '../../components/sidebar/Sidebar';
import Loading from '../../components/loading/Loading';
import axios from 'axios';
import Absensi from './absensi/absensi.pdf';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import Report from './Report';
// import Footer from '../../components/footer/Footer';

class DaftarMengajar extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            modalDetail: false,
            daftarSemester: [],
            daftarMK: [],
            loggedIn: true,
            form: {
                kodeSemester: 110,
                kodeKelas: 1512600014
            },
            detail: {
                dosen: [],
                kodeKelas: '',
                kodeSemester: '',
                namaMK: '',
                sksMK: '',
                tahunSemester: '',
                ruang: [],
                mahasiswa: [],
                prodi: ''
            }
        }
    }

    onChange = (e) => {
        let newForm = { ...this.state.form }
        newForm[e.target.name] = e.target.value;
        this.setState({
            form: newForm
        })
    }

    logout = () => {
        sessionStorage.removeItem('token')
        this.setState({
            loggedIn: false
        })
    }

    componentDidMount() {
        const token = sessionStorage.getItem("token")
        if (token === null) {
            this.setState({
                loggedIn: false
            })
        }
        this.getSemester()
        this.getMK()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.form !== prevState.form) {
            this.getMK()
        }
    }

    modalDetail = () => {
        this.setState({
            modalDetail: !this.state.modalDetail
        })
    }

    getSemester = () => {
        axios.get('http://localhost:3004/ref/semester', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                this.setState({
                    daftarSemester: result.data.result,
                    isLoading: false
                })
            })
    }

    getMK = () => {
        axios.get(`http://localhost:3004/mataKuliah/${this.state.form.kodeSemester}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    daftarMK: result.data.result
                })
            })
    }

    getData = (e) => {
        // this.getDetail(e.target.dataset.key)
        let kodeKelas = e.currentTarget.dataset.key
        axios.get(`http://localhost:3004/mataKuliah/${this.state.form.kodeSemester}/${kodeKelas}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    ...this.state,
                    detail: {
                        dosen: result.data.dosen,
                        kodeKelas: result.data.kelas.kelas,
                        kodeSemester: result.data.kelas.kodeSemester,
                        namaMK: result.data.kelas.namaMK,
                        sksMK: result.data.kelas.sksMK,
                        tahunSemester: result.data.kelas.tahunSemester,
                        ruang: result.data.ruang,
                        mahasiswa: result.data.mahasiswa.length,
                        prodi: 'Pendidikan Teknik Informatika & Komputer'
                    }
                })
            })

        this.modalDetail()
    }

    render() {

        let { form } = this.state

        if (this.state.loggedIn === false) {
            return <Redirect to="/" />
        }

        let num = 1;
        return (
            this.state.isLoading ?
                <Loading title={'Daftar Mengajar'} /> :
                <Fragment>
                    <Navigation logout={this.logout} />
                    <div className="wrapper">
                        <Sidebar />
                        <div className={this.props.state.sidebar ? "wrapper-content-close wrapper-content-blur" : "wrapper-content-open"}>
                            <div className={this.props.state.sidebar ? "container" : "container-fluid"}>
                                <Row className="mt-2 mb-2">
                                    <Col>
                                        <div>
                                            <Breadcrumb className="breadcrumb-me">
                                                <BreadcrumbItem><Link to="/beranda"><i className="fas fa-home mr-1"></i> Beranda</Link></BreadcrumbItem>
                                                <BreadcrumbItem active>Daftar Mengajar</BreadcrumbItem>
                                            </Breadcrumb>
                                        </div>
                                        <div className="col-md-12 mx-auto mt-2">
                                            <h4 className="text-center mb-2">Daftar Mengajar</h4>
                                            <Form className="mb-3">
                                                <FormGroup row>
                                                    <Col lg="3" sm="6" md="12" className="pt-2">
                                                        <Label className="">Pilih Semester :</Label>
                                                        <Input type="select" name="kodeSemester" className="form-control-sm" value={form.kodeSemester} onChange={this.onChange} >
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

                                            {/* <PDFDownloadLink document={<Report kocak='alay' />} fileName="somename.pdf">
                                            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                                        </PDFDownloadLink> */}

                                            <div className="table-responsive">
                                                <Table bordered hover>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th className="text-center" colSpan={5}>Semester {this.state.form.kodeSemester}</th>
                                                        </tr>
                                                        <tr>
                                                            <th className="text-center">No</th>
                                                            <th className="text-center">Seksi MK</th>
                                                            <th className="text-center">Nama MK</th>
                                                            <th className="text-center th-width185">Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.daftarMK.map((val, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        <th scope="row" className="text-center">{num++}</th>
                                                                        <td>{val.kodeKelas}</td>
                                                                        <td>{val.namaMK}</td>
                                                                        <td className="text-center">
                                                                            <Button onClick={this.getData} className="btn-sm btn-info mr-2" color="info" data-key={val.kodeKelas}><i className="far fa-eye"></i> Detail</Button>
                                                                            <a href={Absensi} download>
                                                                                <Button className="btn-sm btn-info" color="info"><i className="fas fa-print"></i> CO6</Button>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            {/* <Footer /> */}
                        </div>
                    </div>

                    <Modal isOpen={this.state.modalDetail} toggle={this.modalDetail} className="modal-dialog-scrollable">
                        <ModalHeader toggle={this.modalDetail}>Detail Daftar Mengajar</ModalHeader>
                        <ModalBody>
                            <Table bordered>
                                <tbody>
                                    <tr>
                                        <td className="font-weight-bold">Nama MK</td>
                                        <td>{this.state.detail.namaMK}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-weight-bold">Seksi MK</td>
                                        <td>{this.state.detail.kodeKelas} </td>
                                    </tr>
                                    <tr>
                                        <td className="font-weight-bold">SKS MK</td>
                                        <td>{this.state.detail.sksMK}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-weight-bold">Program Studi</td>
                                        <td>{this.state.detail.prodi}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-weight-bold">Lokasi & Waktu</td>
                                        <td>
                                            {
                                                this.state.detail.ruang.map((val, i) => {
                                                    return (
                                                        <span key={i}>
                                                            {val.namaGedung} ({val.namaRuang}) & {val.hari} {val.waktuAwal} sd {val.waktuAkhir} <br />
                                                        </span>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                    {/* <tr>
                                    <td className="font-weight-bold">Pengajar</td>
                                    <td>
                                        {
                                            this.state.detail.dosen.map((val, i) => {
                                                return (
                                                    <span key={i}>Ke - {val.dosenKe}</span>
                                                )
                                            })
                                        }
                                    </td>
                                </tr> */}
                                    <tr>
                                        <td className="font-weight-bold">Tim Pengajar (ke-)</td>
                                        <td>
                                            {
                                                this.state.detail.dosen.map((val, i) => {
                                                    return (
                                                        <span key={i}>{val.nip} - {val.nama} <b>({val.dosenKe})</b> <br /></span>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-weight-bold">Jumlah Mahasiswa</td>
                                        <td>{this.state.detail.mahasiswa}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.modalDetail} className="btn-danger btn-sm"><i className="fas fa-times"></i> Tutup</Button>
                        </ModalFooter>
                    </Modal>

                </Fragment>
        )
    }
}

export default GlobalConsumer(DaftarMengajar);
