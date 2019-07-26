import React, { Component, Fragment } from 'react'
import { TabPane, Row, Col, Table } from 'reactstrap';

export default class Biodata extends Component {
    render() {
        return (
            <Fragment>
                <TabPane tabId="1">
                    <Row className="mt-3">
                        <Col>
                            <div className="table-responsive">
                                <Table bordered hover size="">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Nama</th>
                                            <td> {this.props.dataBiodata.nama}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">NIK</th>
                                            <td> {this.props.dataBiodata.nik}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Tempat Tanggal Lahir</th>
                                            <td> {this.props.dataBiodata.tempatLahir}, {this.props.dataBiodata.tanggalLahir}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Jenis Kelamin</th>
                                            <td> {this.props.dataBiodata.jenisKelamin}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Agama</th>
                                            <td> {this.props.dataBiodata.agama}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Email</th>
                                            <td> {this.props.dataBiodata.email}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">No. HP</th>
                                            <td> {this.props.dataBiodata.hp}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Alamat</th>
                                            <td> {this.props.dataBiodata.alamat} RT.{this.props.dataBiodata.rt}/RW.{this.props.dataBiodata.rw}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Tempat Tinggal</th>
                                            <td> {this.props.dataBiodata.jenisTinggal}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Transportasi</th>
                                            <td> {this.props.dataBiodata.transportasi}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">RT/RW</th>
                                            <td> {this.props.dataBiodata.rt}/{this.props.dataBiodata.rw}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Kelurahan</th>
                                            <td> {this.props.dataBiodata.kelurahan}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Kecamatan</th>
                                            <td> {this.props.dataBiodata.kecamatan}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Kabupaten/Kota</th>
                                            <td> {this.props.dataBiodata.kabkot}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Provinsi</th>
                                            <td> {this.props.dataBiodata.provinsi}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Kode Pos</th>
                                            <td> {this.props.dataBiodata.kodePos}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Kewarganegaraan</th>
                                            <td> {this.props.dataBiodata.kewarganegaraan}</td>
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
