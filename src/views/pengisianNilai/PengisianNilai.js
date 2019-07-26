import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './PengisianNilai.css';
import { Row, Col, Breadcrumb, BreadcrumbItem, Table, Button } from 'reactstrap';
import { GlobalConsumer } from '../../context/context';
import Navigation from '../../components/navigation/Navigation';
import Sidebar from '../../components/sidebar/Sidebar';
import Loading from '../../components/loading/Loading';
import axios from 'axios';
import CetakNilai from './pdf/cetakNilai.pdf';
// import Footer from '../../components/footer/Footer';

class PengisianNilai extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: true,
            loggedIn: true,
            daftarKodeMK: []
        }
    }

    componentDidMount() {
        const token = sessionStorage.getItem("token")
        if (token === null) {
            this.setState({
                loggedIn: false
            })
        }
        this.getDaftarMK()
    }

    logout = () => {
        sessionStorage.removeItem('token')
        this.setState({
            loggedIn: false
        })
    }

    getDaftarMK = () => {
        axios.get(`http://localhost:3004/pengisianNilai/`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    daftarKodeMK: result.data.result,
                    isLoading: false
                })
            })
    }

    getIsiNilai = (e) => {
        // console.log(e.target.dataset.key)
        let kodeKelas = e.currentTarget.dataset.key
        this.props.history.push(`/pengisian-nilai/${kodeKelas}`)
    }

    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />
        }
        let num = 1;
        return (
            this.state.isLoading ?
                <Loading title={'Pengisian Nilai'} /> :
            <Fragment>
                <Navigation logout={this.logout} />
                <div className="wrapper">
                    <Sidebar sidebar={this.props.state.sidebar} sidebarHandler={this.props.state.sidebar} />
                    <div className={this.props.state.sidebar ? "wrapper-content-close wrapper-content-blur" : "wrapper-content-open"}>
                        <div className={this.props.state.sidebar ? "container" : "container-fluid"}>
                            <Row className="mt-2 mb-4">
                                <Col>
                                    <div>
                                        <Breadcrumb className="breadcrumb-me">
                                            <BreadcrumbItem><Link to="/beranda"><i className="fas fa-home mr-1"></i> Beranda</Link></BreadcrumbItem>
                                            <BreadcrumbItem active>Pengisian Nilai</BreadcrumbItem>
                                        </Breadcrumb>
                                    </div>
                                    <div className="col-md-12 mx-auto mt-2">
                                        <h4 className="text-center mb-4">Pengisian Nilai</h4>
                                        <div className="table-responsive">
                                            <Table bordered hover>
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th className="text-center">No</th>
                                                        <th className="text-center">Seksi MK</th>
                                                        <th className="text-center">Nama MK</th>
                                                        <th className="text-center">SKS MK</th>
                                                        <th className="th-width185">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.daftarKodeMK.map((i) => {
                                                            return (
                                                                <tr key={i.kodeKelas}>
                                                                    <td className="text-center">{num++}</td>
                                                                    <td>{i.kodeKelas}</td>
                                                                    <td>{i.namaMK}</td>
                                                                    <td className="text-center">{i.SKS}</td>
                                                                    <td className="text-center">
                                                                        {/* <Link to="/pengisian-nilai/struktur-data"> */}
                                                                        <Button onClick={this.getIsiNilai} data-key={i.kodeKelas} color="info" className="btn-sm mr-1"><i className="fas fa-pencil-alt"></i> Isi Nilai</Button>
                                                                        {/* </Link> */}
                                                                        <a href={CetakNilai} download>
                                                                            <Button color="info" className="btn-sm"><i className="fas fa-print"></i> PDF</Button>
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

            </Fragment>
        )
    }
}

export default GlobalConsumer(PengisianNilai);
