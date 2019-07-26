import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Breadcrumb, BreadcrumbItem, Table, Button } from 'reactstrap';
import { GlobalConsumer } from '../../context/context';
import Navigation from '../../components/navigation/Navigation';
import Sidebar from '../../components/sidebar/Sidebar';
// import Footer from '../../components/footer/Footer';
// import DataMengajar from './DataMengajar';

class JadwalMengajar extends Component {
    render() {
        return (
            <Fragment>
                <Navigation />
                <div className="wrapper">
                    <Sidebar />
                    <div className={this.props.state.sidebar ? "wrapper-content-close wrapper-content-blur" : "wrapper-content-open"}>
                        <div className={this.props.state.sidebar ? "container" : "container-fluid"}>
                            <Row className="mt-2 mb-4">
                                <Col>
                                    <div>
                                        <Breadcrumb className="breadcrumb-me">
                                            <BreadcrumbItem><Link to="/"><i className="fas fa-home mr-1"></i> Beranda</Link></BreadcrumbItem>
                                            <BreadcrumbItem active>Jadwal Mengajar</BreadcrumbItem>
                                        </Breadcrumb>
                                    </div>
                                    <div className="col-md-12 mx-auto mt-2">
                                        <h4 className="text-center mb-4">Jadwal Mengajar</h4>
                                        {/* <DataMengajar data={this.dataSet} /> */}
                                        <div className="table-responsive">
                                            <Table bordered>
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Lokasi Waktu</th>
                                                        <th>Program Studi</th>
                                                        <th>Seksi MK</th>
                                                        <th>Kode MK</th>
                                                        <th>Nama MK</th>
                                                        <th className="text-center">SKS MK</th>
                                                        <th>Pengajar</th>
                                                        <th>Partner</th>
                                                        <th>Mahasiswa</th>
                                                        <th>Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Gedung L2(404) Waktu Senin 15:00 sd 15:00 Gedung L2(404) Waktu Senin 15:00 sd 15:50</td>
                                                        <td>S2-Pendidikan Teknologi dan Kejuruan</td>
                                                        <td>1517800003</td>
                                                        <td>52462033</td>
                                                        <td>Pengembangan Web Interprise</td>
                                                        <td className="text-center">3</td>
                                                        <td>Ke.2</td>
                                                        <td>0006075806 Yuliatri Sastra Wijaya 00224087402 Hamidillah Ajie</td>
                                                        <td>0</td>
                                                        <td>
                                                            <Button color="primary" className="btn-sm"><i className="fas fa-folder-open"></i> Detail</Button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Gedung L2(404) Waktu Senin 15:00 sd 15:00 Gedung L2(404) Waktu Senin 15:00 sd 15:50</td>
                                                        <td>S2-Pendidikan Teknologi dan Kejuruan</td>
                                                        <td>1517800003</td>
                                                        <td>52462033</td>
                                                        <td>Pengembangan Web Interprise</td>
                                                        <td className="text-center">3</td>
                                                        <td>Ke.2</td>
                                                        <td>0006075806 Yuliatri Sastra Wijaya 00224087402 Hamidillah Ajie</td>
                                                        <td>0</td>
                                                        <td>
                                                            <Button color="primary" className="btn-sm"><i className="fas fa-folder-open"></i> Detail</Button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Gedung L2(404) Waktu Senin 15:00 sd 15:00 Gedung L2(404) Waktu Senin 15:00 sd 15:50</td>
                                                        <td>S2-Pendidikan Teknologi dan Kejuruan</td>
                                                        <td>1517800003</td>
                                                        <td>52462033</td>
                                                        <td>Pengembangan Web Interprise</td>
                                                        <td className="text-center">3</td>
                                                        <td>Ke.2</td>
                                                        <td>0006075806 Yuliatri Sastra Wijaya 00224087402 Hamidillah Ajie</td>
                                                        <td>0</td>
                                                        <td>
                                                            <Button color="primary" className="btn-sm"><i className="fas fa-folder-open"></i> Detail</Button>
                                                        </td>
                                                    </tr>
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

    // dataSet = [
    //     ["Gedung L2(404) Waktu Senin 15:00 sd 15:00 Gedung L2(404) Waktu Senin 15:00 sd 15:50", "S2-Pendidikan Teknologi dan Kejuruan", "1517800003", "52462033", "Pengembangan Web Interprise", "3", "Ke.2", "0006075806 Yuliatri Sastra Wijaya 00224087402 Hamidillah Ajie", "0", "hapus atau update"],
    //     ["Gedung L2(404) Waktu Senin 15:00 sd 15:00 Gedung L2(404) Waktu Senin 15:00 sd 15:50", "S2-Pendidikan Teknologi dan Kejuruan", "1517800003", "52462033", "Pengembangan Web Interprise", "3", "Ke.2", "0006075806 Yuliatri Sastra Wijaya 00224087402 Hamidillah Ajie", "0", "hapus atau update"],
    //     ["Gedung L2(404) Waktu Senin 15:00 sd 15:00 Gedung L2(404) Waktu Senin 15:00 sd 15:50", "S2-Pendidikan Teknologi dan Kejuruan", "1517800003", "52462033", "Pengembangan Web Interprise", "3", "Ke.2", "0006075806 Yuliatri Sastra Wijaya 00224087402 Hamidillah Ajie", "0", "hapus atau update"],
    //     ["Gedung L2(404) Waktu Senin 15:00 sd 15:00 Gedung L2(404) Waktu Senin 15:00 sd 15:50", "S2-Pendidikan Teknologi dan Kejuruan", "1517800003", "52462033", "Pengembangan Web Interprise", "3", "Ke.2", "0006075806 Yuliatri Sastra Wijaya 00224087402 Hamidillah Ajie", "0", "hapus atau update"]
    // ];

}

export default GlobalConsumer(JadwalMengajar);

