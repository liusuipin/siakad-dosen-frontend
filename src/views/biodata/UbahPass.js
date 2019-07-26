import React, { Component, Fragment } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Navigation from '../../components/navigation/Navigation.js';
import Sidebar from '../../components/sidebar/Sidebar.js';
// import Footer from '../../components/footer/Footer.js';
import { GlobalConsumer } from '../../context/context.js';
import axios from 'axios';
import Swal from 'sweetalert2';


class UbahPass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oldPass: '',
            newPass: '',
            conPass: '',
            loggedIn: true,
            oldPasInvalid: false,
            newPassInvalid: false,
            conPassInvalid: false
        }
    }

    componentDidMount() {
        const token = sessionStorage.getItem("token")
        if (token === null) {
            this.setState({
                loggedIn: false
            })
        }
    }

    // alertFail=()=>{

    // }

    logout = () => {
        sessionStorage.removeItem('token')
        this.setState({
            loggedIn: false
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    doReset = () => {
        this.setState({
            oldPass: '',
            newPass: '',
            conPass: '',
            oldPasInvalid: false,
            newPassInvalid: false,
            conPassInvalid: false
        })
    }

    updatePass = (e) => {
        e.preventDefault()
        const newPass = this.state.newPass
        const conPass = this.state.conPass

        if (newPass.length < 5) {
            // return Swal.fire({
            //     type: 'error',
            //     title: 'Gagal',
            //     text: 'Kata sandi baru minimal 5 karakter!'
            // })
            this.setState({
                newPassInvalid: true
            })
        } else if (conPass !== newPass) {
            this.setState({
                newPassInvalid: false,
                conPassInvalid: false
            })
            // return Swal.fire({
            //     type: 'error',
            //     title: 'Gagal',
            //     text: 'Konfirmasi kata sandi tidak sama!'
            // })
            this.setState({
                conPassInvalid: true
            })
        } else {
            const { oldPass, newPass, conPass } = this.state
            axios.post('http://localhost:3004/user/password', {
                oldPass, newPass, conPass
            }, {
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    }
                })
                .then(result => {
                    this.getAlertPut()
                    this.doReset()
                })
                .catch(function (error) {
                    // handle error
                    // console.log('gagal login')
                    return Swal.fire({
                        type: 'error',
                        title: 'Gagal!',
                        text: 'Kata sandi gagal diubah!',
                        footer: 'Mohon periksa kembali kata sandi yang Anda masukkan!'
                    })
                })
            this.setState({
                oldPasInvalid: false,
                newPassInvalid: false,
                conPassInvalid: false
            })
        }
    }

    getAlertPut = () => {
        return Swal.fire(
            'Sukses!',
            'Kata sandi berhasil diubah!',
            'success'
        )
    }

    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />
        }
        return (
            <Fragment>
                <Navigation logout={this.logout} />
                <div className="wrapper">
                    <Sidebar />
                    <div className={this.props.state.sidebar ? "wrapper-content-close wrapper-content-blur" : "wrapper-content-open"}>
                        <div className={this.props.state.sidebar ? "container" : "container-fluid"}>
                            <Row className="mt-2 mb-5">
                                <Col md="12">
                                    <Breadcrumb className="breadcrumb-me">
                                        <BreadcrumbItem><Link to="/beranda"><i className="fas fa-home mr-1"></i> Beranda</Link></BreadcrumbItem>
                                        <BreadcrumbItem active>Ubah Kata Sandi</BreadcrumbItem>
                                    </Breadcrumb>
                                    <h4 className="text-center pb-2">Ubah Kata Sandi</h4>
                                    <Col md="6" className="mx-auto">
                                        <Form onSubmit={this.updatePass}>
                                            <FormGroup>
                                                <Label>Kata Sandi Lama</Label>
                                                <Input type="password" name="oldPass" className="form-control-sm" value={this.state.oldPass} onChange={this.onChange} required />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label>Kata Sandi Baru</Label>
                                                <Input type="password" name="newPass" className={this.state.newPassInvalid ? "form-control-sm is-invalid" : "form-control-sm"} value={this.state.newPass} onChange={this.onChange} required />
                                                <div className={this.state.newPassInvalid ? 'invalid-feedback' : 'd-none'}>
                                                    Kata sandi minimal 5 karakter.
                                                        </div>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label>Konfirmasi Kata Sandi Baru</Label>
                                                <Input type="password" name="conPass" className={this.state.conPassInvalid ? "form-control-sm is-invalid" : "form-control-sm"} value={this.state.conPass} onChange={this.onChange} required />
                                                <div className={this.state.conPassInvalid ? 'invalid-feedback' : 'd-none'}>
                                                    Konfirmasi kata sandi tidak sama.
                                                        </div>
                                            </FormGroup>
                                            <Button type="submit" color="info" className="btn-sm mt-2"><i className="fas fa-save"></i> Simpan</Button>
                                            <Button type="button" color="danger" className="ml-2 btn-sm mt-2" onClick={this.doReset}><i className="fas fa-undo"></i> Bersihkan</Button>
                                        </Form>
                                    </Col>
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

export default GlobalConsumer(UbahPass);