import React, { Component } from 'react';
import { UncontrolledAlert, Row, Col } from 'reactstrap';
import axios from 'axios';

export default class Welcome extends Component {

    constructor() {
        super()
        this.state = {
            namaDosen: '',
            kelamin: ''
        }
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        axios.get('http://localhost:3004/user/biodata', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    namaDosen: result.data.result.nama,
                    kelamin: result.data.result.jenisKelamin.kode
                })
            })
    }

    render() {
        return (
            // this.state.kelamin === "L" ?
            //     <Row>
            //         <Col>
            //             <UncontrolledAlert color="success">
            //                 <i className="fas fa-user-check"></i> <span>Halo <b>Pak {this.state.namaDosen}</b>, <br />
            //                     Selamat datang di SIAKAD (Sistem Informasi Akademik)(versi-3). Semoga dapat membantu pada setiap kegiatan administrasi akademik anda.</span>
            //             </UncontrolledAlert>
            //         </Col>
            //     </Row> :
            //     <Row>
            //         <Col>
            //             <UncontrolledAlert color="success">
            //                 <i className="fas fa-user-check"></i> <span>Halo <b>Bu {this.state.namaDosen}</b>, <br />
            //                     Selamat datang di SIAKAD (Sistem Informasi Akademik)(versi-3). Semoga dapat membantu pada setiap kegiatan administrasi akademik anda.</span>
            //             </UncontrolledAlert>
            //         </Col>
            //     </Row>
            <Row>
                <Col>
                    <UncontrolledAlert color="success">
                        <i className="fas fa-user-check"></i> <span>Halo <b>{this.state.kelamin === "L" ? 'Pak' : this.state.kelamin === "P" ? 'Bu' : ''} {this.state.namaDosen}</b>, <br />
                            Selamat datang di SIAKAD (Sistem Informasi Akademik)(versi-3). Semoga dapat membantu pada setiap kegiatan administrasi akademik anda.</span>
                    </UncontrolledAlert>
                </Col>
            </Row>
        )
    }
}