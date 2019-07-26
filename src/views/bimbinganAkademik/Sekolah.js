import React, { Component, Fragment } from 'react'
import { TabPane, Row, Col, Table } from 'reactstrap';

export default class Sekolah extends Component {
    render() {
        return (
            <Fragment>
                <TabPane tabId="3">
                    <Row className="mt-3">
                        <Col>
                            <div className="table-responsive">
                                <Table bordered hover size="">
                                    <tbody>
                                        <tr>
                                            <th scope="row">NISN</th>
                                            <td> {this.props.dataSekolah.nisn}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">NPSN</th>
                                            <td> {this.props.dataSekolah.npsn}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Tahun Masuk</th>
                                            <td> {this.props.dataSekolah.tahunMasuk}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Tahun Lulus</th>
                                            <td> {this.props.dataSekolah.tahunLulus}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Rerata UN</th>
                                            <td> {this.props.dataSekolah.rerataUN}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Rerata Ijazah</th>
                                            <td> {this.props.dataSekolah.rerataIjazah}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Jurusan</th>
                                            <td> {this.props.dataSekolah.jurusan}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Nama Sekolah</th>
                                            <td> {this.props.dataSekolah.namaSekolah}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Jenis Sekolah</th>
                                            <td> {this.props.dataSekolah.jenisSekolah}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Akreditasi</th>
                                            <td> {this.props.dataSekolah.akreditasi}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Kecamatan</th>
                                            <td> {this.props.dataSekolah.kecamatan}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Kabupaten/Kota</th>
                                            <td> {this.props.dataSekolah.kabkot}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Provinsi</th>
                                            <td> {this.props.dataSekolah.provinsi}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
            </Fragment>
        )
    }
}
