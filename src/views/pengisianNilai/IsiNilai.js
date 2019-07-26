import React, { Component, Fragment } from 'react';
import { Row, Col, Breadcrumb, BreadcrumbItem, Table, FormGroup, Input, Form, Button  } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Navigation from '../../components/navigation/Navigation';
import Sidebar from '../../components/sidebar/Sidebar';
import Loading from '../../components/loading/Loading';
import { GlobalConsumer } from '../../context/context';
import './PengisianNilai.css';
import axios from 'axios';
import Swal from 'sweetalert2';

class IsiNilai extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            kodeKelas: props.match.params.kodeKelas,
            dataKelas: {
                dosen: [],
                kodeKelas: '',
                kodeSemester: '',
                namaMK: '',
                sksMK: '',
                tahunSemester: '',
                ruang: [],
                mahasiswa: [],
                prodi: '',
                nilai: [],
                nim: []
            }
        }
    }

    onChange = (e) => {
        let newData = [
            ...this.state.dataKelas.mahasiswa
        ];
        const index = e.target.dataset.index;
        newData[index] = {
            ...newData[index],
            nilai: e.target.value,
            nilaiUpdate: e.target.value,
            nilaiAwal: newData[index].nilai
        };
        this.setState({
            dataKelas: {
                ...this.state.dataKelas,
                mahasiswa: [
                    ...newData
                ]
            }
        })
        // console.log(newData)
        // this.setState({
        //     [e.target.name]: e.target.value
        // })
    }

    componentDidMount() {
        const token = sessionStorage.getItem("token")
        if (token === null) {
            this.setState({
                loggedIn: false
            })
        }
        this.getDataKelas()
    }

    logout = () => {
        sessionStorage.removeItem('token')
        this.setState({
            loggedIn: false
        })
    }

    getDataKelas = () => {
        axios.get(`http://localhost:3004/pengisianNilai/${this.state.kodeKelas}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    dataKelas: {
                        dosen: result.data.dosen,
                        kodeKelas: result.data.kelas.kelas,
                        kodeSemester: result.data.kelas.kodeSemester,
                        namaMK: result.data.kelas.namaMK,
                        sksMK: result.data.kelas.sksMK,
                        tahunSemester: result.data.kelas.tahunSemester,
                        ruang: result.data.ruang,
                        mahasiswa: result.data.mahasiswa.map((item, index) => ({
                            nilai: item.nilai,
                            nim: item.nim,
                            prodi: item.prodi,
                            nama: item.nama,
                            nilaiAwal: item.nilai,
                            nilaiUpdate: item.nilai
                        })),
                        prodi: 'Pendidikan Teknik Informatika & Komputer',
                        nilai: result.data.mahasiswa
                    },
                    isLoading: false
                })
            })
    }

    updateNilai = () => {
        const dataKelas = this.state.dataKelas.mahasiswa.map((item, i) => ({
            nim: item.nim,
            nilaiAwal: item.nilaiAwal,
            nilaiUpdate: item.nilaiUpdate
        }))
        // console.log(dataKelas)
        axios.put(`http://localhost:3004/pengisianNilai/${this.state.kodeKelas}`, {
            data: dataKelas
        }, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('token')
                }
            })
            .then(result => {
                this.getSuccessUpdate()
                this.props.history.push(`/pengisian-nilai`)
            })
            .catch(function (error) {
                return Swal.fire({
                    type: 'error',
                    title: 'Gagal Isi Nilai'
                })
            })
    }

    kembali = () => {
        this.props.history.push(`/pengisian-nilai`)
    }

    getSuccessUpdate = () => {
        return Swal.fire(
            'Sukses!',
            `Kode seksi <b>${this.state.dataKelas.kodeKelas}</b> berhasil di isi !`,
            'success'
        )
    }

    render() {
        let num = 1;
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />
        }
        return (
            this.state.isLoading ?
                <Loading title={'Daftar Nilai'} /> :
                <Fragment>
                    <Navigation logout={this.logout} />
                    <div className="wrapper">
                        <Sidebar />
                        <div className={this.props.state.sidebar ? "wrapper-content-close wrapper-content-blur" : "wrapper-content-open"}>
                            <div className={this.props.state.sidebar ? "container" : "container-fluid"}>
                                <Row className="mt-2 mb-4">
                                    <Col>
                                        <div>
                                            <Breadcrumb className="breadcrumb-me">
                                                <BreadcrumbItem><Link to='/pengisian-nilai'><i className="fas fa-edit mr-1"></i> Pengisian Nilai</Link></BreadcrumbItem>
                                                <BreadcrumbItem active>Daftar Nilai</BreadcrumbItem>
                                            </Breadcrumb>
                                        </div>
                                        <div className="col-md-12 mx-auto mt-2">
                                            <h4 className="text-center mb-">Daftar Nilai</h4>
                                            <Row>
                                                <Col md="12">
                                                <div>
                                                </div>
                                                    <Table borderless size="sm">
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">Kode Seksi</th>
                                                                <td>: &nbsp; {this.state.dataKelas.kodeKelas}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Nama MK</th>
                                                                <td>: &nbsp; {this.state.dataKelas.namaMK}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Semester</th>
                                                                <td>: &nbsp; {this.state.dataKelas.kodeSemester}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">SKS</th>
                                                                <td>: &nbsp; {this.state.dataKelas.sksMK}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm="12">
                                                    <div className="table-responsive tableFixHead">
                                                        <Form>
                                                            <Table striped bordered size="">
                                                                {/* <thead className="thead-light">
                                                                    <tr>
                                                                        <th rowSpan={2} className="text-center">No</th>
                                                                        <th rowSpan={2} className="text-center">NIM</th>
                                                                        <th rowSpan={2} className="text-center">Nama Mahasiswa</th>
                                                                        <th colSpan={10} className="text-center">Nilai</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="text-center">A</th>
                                                                        <th className="text-center">A-</th>
                                                                        <th className="text-center">B+</th>
                                                                        <th className="text-center">B</th>
                                                                        <th className="text-center">B-</th>
                                                                        <th className="text-center">C+</th>
                                                                        <th className="text-center">C</th>
                                                                        <th className="text-center">C-</th>
                                                                        <th className="text-center">D</th>
                                                                        <th className="text-center">E</th>
                                                                    </tr>
                                                                </thead> */}
                                                                <thead className="thead-light">
                                                                    <tr>
                                                                        <th className="text-center">No</th>
                                                                        <th className="text-center">NIM</th>
                                                                        <th className="text-center">Nama Mahasiswa</th>
                                                                        <th className="text-center">A</th>
                                                                        <th className="text-center">A-</th>
                                                                        <th className="text-center">B+</th>
                                                                        <th className="text-center">B</th>
                                                                        <th className="text-center">B-</th>
                                                                        <th className="text-center">C+</th>
                                                                        <th className="text-center">C</th>
                                                                        <th className="text-center">C-</th>
                                                                        <th className="text-center">D</th>
                                                                        <th className="text-center">E</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="overflow-auto">
                                                                    {
                                                                        this.state.dataKelas.mahasiswa.map((val, i) => {
                                                                            return (
                                                                                <tr key={i}>
                                                                                    <th scope="row" className="text-center">{num++}</th>
                                                                                    <td>{val.nim}</td>
                                                                                    <td>{val.nama}</td>
                                                                                    <td className="text-center">
                                                                                        <FormGroup check>
                                                                                            <Input data-index={i} type="radio" name={val.nim} value="A" checked={val.nilai === "A"} onChange={this.onChange} className="radio-nilai" />{' '}
                                                                                        </FormGroup>
                                                                                    </td>
                                                                                    <td className="text-center">
                                                                                        <FormGroup check>
                                                                                            <Input data-index={i} type="radio" name={val.nim} value="A-" checked={val.nilai === "A-"} onChange={this.onChange} className="radio-nilai" />{' '}
                                                                                        </FormGroup>
                                                                                    </td>
                                                                                    <td className="text-center">
                                                                                        <FormGroup check>
                                                                                            <Input data-index={i} type="radio" name={val.nim} value="B+" checked={val.nilai === "B+"} onChange={this.onChange} className="radio-nilai" />{' '}
                                                                                        </FormGroup>
                                                                                    </td>
                                                                                    <td className="text-center">
                                                                                        <FormGroup check>
                                                                                            <Input data-index={i} type="radio" name={val.nim} value="B" checked={val.nilai === "B"} onChange={this.onChange} className="radio-nilai" />{' '}
                                                                                        </FormGroup>
                                                                                    </td>
                                                                                    <td className="text-center">
                                                                                        <FormGroup check>
                                                                                            <Input data-index={i} type="radio" name={val.nim} value="B-" checked={val.nilai === "B-"} onChange={this.onChange} className="radio-nilai" />{' '}
                                                                                        </FormGroup>
                                                                                    </td>
                                                                                    <td className="text-center">
                                                                                        <FormGroup check>
                                                                                            <Input data-index={i} type="radio" name={val.nim} value="C+" checked={val.nilai === "C+"} onChange={this.onChange} className="radio-nilai" />{' '}
                                                                                        </FormGroup>
                                                                                    </td>
                                                                                    <td className="text-center">
                                                                                        <FormGroup check>
                                                                                            <Input data-index={i} type="radio" name={val.nim} value="C" checked={val.nilai === "C"} onChange={this.onChange} className="radio-nilai" />{' '}
                                                                                        </FormGroup>
                                                                                    </td>
                                                                                    <td className="text-center">
                                                                                        <FormGroup check>
                                                                                            <Input data-index={i} type="radio" name={val.nim} value="C-" checked={val.nilai === "C-"} onChange={this.onChange} className="radio-nilai" />{' '}
                                                                                        </FormGroup>
                                                                                    </td>
                                                                                    <td className="text-center">
                                                                                        <FormGroup check>
                                                                                            <Input data-index={i} type="radio" name={val.nim} value="D" checked={val.nilai === "D"} onChange={this.onChange} className="radio-nilai" />{' '}
                                                                                        </FormGroup>
                                                                                    </td>
                                                                                    <td className="text-center">
                                                                                        <FormGroup check>
                                                                                            <Input data-index={i} type="radio" name={val.nim} value="E" checked={val.nilai === "E"} onChange={this.onChange} className="radio-nilai" />{' '}
                                                                                        </FormGroup>
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </Table>
                                                        </Form>
                                                    </div>
                                                </Col>
                                                <Button className="btn-info btn-sm mx-auto mt-2" onClick={this.updateNilai}><i className="fas fa-save"></i> Simpan</Button>
                                                {/* <Button className="btn-info btn-sm ml-2 mt-2" onClick={this.kembali}><i class="fas fa-long-arrow-alt-left"></i> Kembali</Button> */}
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            {/* <Footer /> */}
                        </div>
                    </div>
                </Fragment>
        )
    }
}

export default GlobalConsumer(IsiNilai);

