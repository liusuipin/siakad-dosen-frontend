import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import notfoundimg from './notfoundimg.png';
// import Navigation from '../../components/navigation/Navigation';

class NotFound extends Component {
    render() {
        return (
            <Fragment>
                {/* <Navigation /> */}
                <div className="bg-white">
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-sm-5">
                                <img src={notfoundimg} width="" className="img-thumbnail border-none" alt="illustration" />
                            </div>
                            <div className="col-sm-7 mt-3">
                                <h2>Halaman Tidak Ditemukan</h2>
                                <p>Maaf, halaman yang anda tuju tidak ditemukan (error 404).</p>
                                <br />
                                <br />
                                <p>
                                    <b>Apa yang dapat Anda lakukan selanjutnya ?</b>
                                    <br />
                                    1. Periksa kembali apakah alamat URL yang Anda masukkan sudah benar.
                                    <br />
                                    2. Anda dapat kembali ke halaman Beranda <span className="text-success font-weight-bold">SIAKAD UNJ</span> dengan klik tombol dibawah.
                                </p>
                                <Link to="/"><Button className="btn-success">Kembali ke-Menu Utama</Button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default NotFound;