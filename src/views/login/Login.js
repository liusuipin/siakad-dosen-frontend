import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Card, CardBody, Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import loginimg from './loginimgg.png'
import './Login.css';
import UnjLogo from '../../assets/img/unj.png';
import axios from 'axios';
import Swal from 'sweetalert2';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            jawaban: '',
            loggedIn: true,
            pertanyaan: '',
            idCaptcha: 0,
            nidniInvalid: false,
            passInvalid: false,
            jawabanInvalid: false
        }

        const token = sessionStorage.getItem("token")
        // let loggedIn = true
        if (token === null) {
            this.state.loggedIn = false
        }
    }

    getCaptcha = () => {
        axios.get('http://localhost:3004/captcha')
            .then(result => {
                this.setState({
                    pertanyaan: result.data.result.pertanyaan,
                    idCaptcha: result.data.result.id,
                })
            })
    }

    componentDidMount() {
        const token = sessionStorage.getItem('token')
        if (token) {
            this.setState({
                loggedIn: true
            })
        } else {
            this.getCaptcha()
            this.setState({
                loggedIn: false
            })
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        const { username, password, jawaban, idCaptcha } = this.state
        if (username === '' && password === '' && jawaban === '') {
            this.setState({
                nidnInvalid: true,
                passInvalid: true,
                jawabanInvalid: true
            })
        } else if(username === ''){
            this.setState({
                nidnInvalid: true,
            passInvalid: false,
            jawabanInvalid: false
            })
        }else if (username === '' && jawaban === '') {
            this.setState({
                nidnInvalid: true,
            passInvalid: false,
            jawabanInvalid: true
            })
        }else if(username === '' && password ===''){
            this.setState({
                nidnInvalid: true,
            passInvalid: true,
            jawabanInvalid: false
            })
        }else if (password === '') {
            this.setState({
                nidnInvalid: false,
            passInvalid: true,
            jawabanInvalid: false
            })
        }else if(password==='' && username===''){
            this.setState({
                nidnInvalid: true,
            passInvalid: true,
            jawabanInvalid: false
            })
        }else if(password==='' && jawaban ===''){
            this.setState({
                nidnInvalid: false,
                passInvalid: true,
                jawabanInvalid: true
            })
        }else if (jawaban === '') {
            this.setState({
                nidnInvalid: false,
            passInvalid: false,
            jawabanInvalid: true
            })
        } else if(jawaban === '' && username===''){
            this.setState({
                nidnInvalid: true,
            passInvalid: false,
            jawabanInvalid: true
            })
        } else if(jawaban==='' && password ===''){
            this.setState({
                nidnInvalid: false,
            passInvalid: true,
            jawabanInvalid: true
            })
        }else {
            axios.post('http://localhost:3004/login/', {
                username,
                password,
                idCaptcha,
                jawaban
            })
                .then(result => {
                    if (result.data.result.token) {
                        sessionStorage.setItem('token', result.data.result.token)
                        this.setState({
                            loggedIn: true
                        })
                    }
                })
                .catch(function (error) {
                        return Swal.fire({
                            type: 'error',
                            title: 'Gagal Masuk',
                            text: 'Mohon periksa kembali NIDN, kata sandi, dan jawaban pertanyaan keamanan anda!'
                        })
                })
                this.setState({
                    nidnInvalid: false,
                passInvalid: false,
                jawabanInvalid: false
                })
        }
    }

    getAlert = () => {
        return Swal.fire({
            type: 'error',
            title: 'Gagal Login',
            text: 'Mohon periksa kembali NIDN, Kata Sandi, dan Pertanyaan Keamanan',
            // footer: '<a href>Why do I have this issue?</a>'
        })
    }

    render() {

        if (this.state.loggedIn) {
            return <Redirect to="/beranda" />
        }

        return (
            <Fragment>
                <div className="bg-unj-login">
                    <Container className="my-auto">
                        <Row>
                            <div className="col-xl-10 col-lg-12 col-md-9 mt-6vh mx-auto my-5">
                                <Card className="o-hidden border-0 shadow-lg my-4">
                                    <CardBody>
                                        <Row>
                                            <div className="col-lg-7 mt-2 br-1 d-none d-lg-block">
                                                <div className="text-center">
                                                    <img src={UnjLogo} alt="logo" width="40" className="d-inline mb-3" />
                                                    <h2 className="text-center d-inline ml-2"><b>SIAKAD UNJ</b></h2>
                                                </div>
                                                <img src={loginimg} alt="illustrasi" className="img-thumbnail border-none" />
                                                <p className="text-center text-secondary">Sistem Informasi Akademik Universitas Negeri Jakarta</p>
                                            </div>
                                            <div className="col-lg-5 col-sm-12 p-4 my-auto">
                                                <div className="text-center d-lg-none d-xl-none mb-2">
                                                    <img src={UnjLogo} alt="logo" width="40" className="d-inline mb-3 " />
                                                    <h2 className="text-center d-inline ml-2"><b>SIAKAD UNJ</b></h2>
                                                </div>
                                                <h3 className="text-center d-none d-lg-block mb-4">Masuk</h3>



                                                <Form className="" onSubmit={this.submitForm}>
                                                    
                                                    <FormGroup className="formgroup">
                                                        
                                                        <i className={this.state.nidnInvalid ? 'd-none' : "fas fa-user user-icon text-secondary"}></i>
                                                        <Input type="text" name="username" placeholder="NIDN" className={this.state.nidnInvalid ? "form-control is-invalid" : "form-control"} value={this.state.username} onChange={this.onChange} />
                                                        <div className={this.state.nidnInvalid ? 'invalid-feedback' : 'd-none'}>
                                                            Mohon untuk memasukkan NIDN.
                                                        </div>
                                                    </FormGroup>

                                                    <FormGroup className="formgroup">
                                                        <i className={this.state.passInvalid ? 'd-none' : "fas fa-lock pass-icon text-secondary"}></i>
                                                        <Input type="password" name="password" placeholder="Kata Sandi" className={this.state.passInvalid ? "form-control is-invalid" : "form-control"} value={this.state.password} onChange={this.onChange} />
                                                        <div className={this.state.passInvalid ? 'invalid-feedback' : 'd-none'}>
                                                            Mohon untuk memasukkan kata sandi.
                                                        </div>
                                                    </FormGroup>

                                                    <hr/>

                                                    <Alert color="warning">
                                                        Berapakah hasil dari {this.state.pertanyaan} ?
                                                    </Alert>

                                                    <FormGroup className="formgroup">
                                                        <i className={this.state.jawabanInvalid ? 'none' : "fas fa-pencil-alt answer-icon text-secondary"}></i>
                                                        <Input type="text" name="jawaban" placeholder="Jawaban Anda" className={this.state.jawabanInvalid ? "form-control is-invalid" : "form-control"} value={this.state.jawaban} onChange={this.onChange} />
                                                        <div className={this.state.jawabanInvalid ? 'invalid-feedback' : 'd-none'}>
                                                            Mohon untuk memasukkan jawaban keamanan.
                                                        </div>
                                                    </FormGroup>
                                                    
                                                    <Button type="submit" className="col-sm-12 btn-success mt-2"><i className="fas fa-sign-in-alt fa-sm fa-fw mr-2"></i>Masuk</Button>
                                                    
                                                </Form>




                                            </div>
                                        </Row>
                                    </CardBody>
                                </Card>
                                <div className="text-center text-white mt-4">
                                    <p className="font-weight-bold">© 2019 UPT-TIK UNJ</p>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </div>
            </Fragment>
        )
    }
}
