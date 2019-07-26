import React, { Component, Fragment } from 'react'
import { GlobalConsumer } from '../../context/context';
import { Row, Col, Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Navigation from '../../components/navigation/Navigation';
import Sidebar from '../../components/sidebar/Sidebar';
import Loading from '../../components/loading/Loading';
import Tabs from './Tabs';
import axios from 'axios'

class DataMahasiswa extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            loggedIn: true,
            nim: props.match.params.nim,
            data: {
                foto: '',
                nama: '',
                nim: '',
                prodi: '',
                angkatan: '',
                ipk: '',
                ips: ''
            }
        }
    }

    componentDidMount() {
        const token = sessionStorage.getItem("token")
        if (token === null) {
            this.setState({
                loggedIn: false
            })
        }
        this.getDataMahasiswa()
    }

    logout = () => {
        sessionStorage.removeItem('token')
        this.setState({
            loggedIn: false
        })
    }

    getDataMahasiswa = () => {
        axios.get(`http://localhost:3004/bimbinganAkademik/${this.state.nim}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    data: {
                        foto: result.data.result.mahasiswa.mahasiswa.foto,
                        nama: result.data.result.mahasiswa.mahasiswa.nama,
                        nim: result.data.result.mahasiswa.mahasiswa.nim,
                        prodi: result.data.result.mahasiswa.mahasiswa.prodi,
                        angkatan: result.data.result.mahasiswa.mahasiswa.angkatan,
                        ipk: result.data.result.ipk,
                        ips: result.data.result.ips
                    },
                    isLoading: false
                })
            })
    }

    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />
        }
        return (
            this.state.isLoading ?
                <Loading title={'Data Mahasiswa'} /> :
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
                                                <BreadcrumbItem><Link to='/bimbingan-akademik'><i className="fas fa-users mr-2"></i> Bimbingan Akademik</Link></BreadcrumbItem>
                                                <BreadcrumbItem active>Data Mahasiswa</BreadcrumbItem>
                                            </Breadcrumb>
                                        </div>
                                        <div className="col-md-12 mx-auto mt-2">
                                            <h4 className="text-center">Data Mahasiswa</h4>
                                            <Row className="mt-3">
                                                <Col sm={2} className="mx-auto text-center mt-2">
                                                    <img src={this.state.data.foto} className="img-thumbnail" alt="Foto Mahasiswa" />

                                                </Col>
                                                <Col sm={9} className="mt-2">
                                                    <Table borderless size="sm">
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">Nama</th>
                                                                <td>: &nbsp; {this.state.data.nama}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">NIM</th>
                                                                <td>: &nbsp; {this.state.data.nim}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Program Studi</th>
                                                                <td>: &nbsp; {this.state.data.prodi}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Angkatan</th>
                                                                <td>: &nbsp; {this.state.data.angkatan}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">IPK</th>
                                                                <td>: &nbsp; {this.state.data.ipk}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">IPS</th>
                                                                <td>: &nbsp; {this.state.data.ips}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>

                                            <Row className="mt-3">
                                                <Tabs nim={this.state.nim} />
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

export default GlobalConsumer(DataMahasiswa);
