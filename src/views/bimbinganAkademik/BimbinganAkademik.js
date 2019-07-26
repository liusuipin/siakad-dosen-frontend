import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Breadcrumb, BreadcrumbItem, Table, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { GlobalConsumer } from '../../context/context';
import Navigation from '../../components/navigation/Navigation';
import Sidebar from '../../components/sidebar/Sidebar';
import Loading from '../../components/loading/Loading';
import axios from 'axios'// import Footer from '../../components/footer/Footer';

class BimbinganAkademik extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            loggedIn: true,
            modalView: false,
            table: false,
            tahunAngkatan: 2015,

            daftarTahun: [],
            daftarMahasiswa: []
        }
    }

    componentDidMount() {
        this._isMounted = true;
        const token = sessionStorage.getItem("token")
        if (token === null) {
            this.setState({
                loggedIn: false
            })
        }
        this.getAngkatan()
        this.getMahasiswa()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.tahunAngkatan !== prevState.tahunAngkatan) {
            this.getMahasiswa()
        }
    }

    logout = () => {
        sessionStorage.removeItem('token')
        this.setState({
            loggedIn: false
        })
    }

    toggle = () => {
        this.setState({
            modalView: !this.state.modalView
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getAngkatan = () => {
        // 016400
        axios.get(`http://localhost:3004/ref/tahun`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                if (this._isMounted) {
                    this.setState({
                        daftarTahun: result.data.result,
                        isLoading: false

                    });
                }
            })
    }

    getMahasiswa = () => {
        // 016400
        axios.get(`http://localhost:3004/bimbinganAkademik/tahun/${this.state.tahunAngkatan}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                if (this._isMounted) {
                    this.setState({
                        daftarMahasiswa: result.data.result,
                        isLoading: false
                    });
                }
            })
    }

    dataMahasiswa = (e) => {
        // console.log(e.target.dataset.key)
        let nim = e.currentTarget.dataset.key
        this.props.history.push(`/bimbingan-akademik/${nim}`)
    }

    render() {
        let num = 1;
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />
        }
        return (
            this.state.isLoading ?
                <Loading title={'Bimbingan Akademik'} /> :
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
                                                <BreadcrumbItem><Link to="/beranda"><i className="fas fa-home mr-1"></i> Beranda</Link></BreadcrumbItem>
                                                <BreadcrumbItem active>Bimbingan Akademik</BreadcrumbItem>
                                            </Breadcrumb>
                                        </div>
                                        <div className="col-md-12 mx-auto mt-2">
                                            <h4 className="text-center mb-2">Daftar Mahasiswa Bimbingan Akademik</h4>
                                            <Form className="mb-3">
                                                <FormGroup row>
                                                    <Col lg="3" sm="" md="12" className="pt-3">
                                                        <Label for="exampleSelect">Filter Angkatan</Label>
                                                        <Input type="select" name="tahunAngkatan" value={this.state.tahunAngkatan} className="form-control-sm" onChange={this.onChange}>
                                                            <option value="">--Pilih Tahun Angkatan--</option>
                                                            {
                                                                this.state.daftarTahun.map((val, i) => {
                                                                    return (
                                                                        <option value={val} key={i}>{val}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Input>
                                                    </Col>
                                                    {/* <Col sm="3" className="pt-3 mt-auto">
                                                    <Button color="info" className="btn-sm" onClick={this.tableView}><i className="fas fa-search"></i> Filter</Button>
                                                </Col> */}
                                                </FormGroup>
                                            </Form>
                                            {/* <Fade in={this.state.table} className="mt-3">
                                        </Fade> */}
                                            <div className="table-responsive">
                                                <Table bordered hover>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th className="text-center">No</th>
                                                            <th className="text-center">NIM</th>
                                                            <th className="text-center">Nama Mahasiswa</th>
                                                            <th className="text-center">Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.daftarMahasiswa.map((val, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        <th scope="row" className="text-center">{num++}</th>
                                                                        <td>{val.nim}</td>
                                                                        <td>{val.nama}</td>
                                                                        <td className="th-width140">
                                                                            <Button onClick={this.dataMahasiswa} data-key={val.nim} color="info" className="btn-sm"><i className="far fa-eye"></i> Detail</Button>
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

export default GlobalConsumer(BimbinganAkademik);
