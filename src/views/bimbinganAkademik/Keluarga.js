import React, { Component, Fragment } from 'react'
import { TabPane, Row, Col, Table } from 'reactstrap';

export default class Keluarga extends Component {
    render() {
        return (
            <Fragment>
                <TabPane tabId="2">
                    <Row className="mt-3">
                        <Col>
                            <div className="table-responsive">
                                <Table bordered hover size="">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Kontak</th>
                                            <td> {this.props.dataKeluarga.kontak}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Alamat</th>
                                            <td> {this.props.dataKeluarga.alamat} RT.{this.props.dataKeluarga.rt}/RW.{this.props.dataKeluarga.rw}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Kelurahan</th>
                                            <td> {this.props.dataKeluarga.kelurahan}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Kecamatan</th>
                                            <td> {this.props.dataKeluarga.kecamatan}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Kabupaten/Kota</th>
                                            <td> {this.props.dataKeluarga.kabkot}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Provinsi</th>
                                            <td> {this.props.dataKeluarga.provinsi}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Kode Pos</th>
                                            <td> {this.props.dataKeluarga.kode_pos}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row" colSpan={2} className="text-center bg-light">Data Ayah</th>
                                        </tr>

                                        <tr>
                                            <th scope="row">Nama Ayah</th>
                                            <td> {this.props.dataKeluarga.ayah.nama}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">NIK</th>
                                            <td> {this.props.dataKeluarga.ayah.nik}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Tanggal Lahir</th>
                                            <td>  {this.props.dataKeluarga.ayah.lahir}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Pendidikan</th>
                                            <td> {this.props.dataKeluarga.ayah.pendidikan}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Pekerjaan</th>
                                            <td> {this.props.dataKeluarga.ayah.pekerjaan}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Penghasilan</th>
                                            <td> {this.props.dataKeluarga.ayah.penghasilan}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row" colSpan={2} className="text-center bg-light">Data Ibu</th>
                                        </tr>

                                        <tr>
                                            <th scope="row">Nama Ibu</th>
                                            <td> {this.props.dataKeluarga.ibu.nama}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">NIK</th>
                                            <td> {this.props.dataKeluarga.ibu.nik}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Tanggal Lahir</th>
                                            <td>  {this.props.dataKeluarga.ibu.lahir}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Pendidikan</th>
                                            <td> {this.props.dataKeluarga.ibu.pendidikan}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Pekerjaan</th>
                                            <td> {this.props.dataKeluarga.ibu.pekerjaan}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Penghasilan</th>
                                            <td> {this.props.dataKeluarga.ibu.penghasilan}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row" colSpan={2} className="text-center bg-light">Data Wali</th>
                                        </tr>

                                        <tr>
                                            <th scope="row">Nama Wali</th>
                                            <td> {this.props.dataKeluarga.wali.nama}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">NIK</th>
                                            <td> {this.props.dataKeluarga.wali.nik}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Tanggal Lahir</th>
                                            <td>  {this.props.dataKeluarga.wali.lahir}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Pendidikan</th>
                                            <td> {this.props.dataKeluarga.wali.pendidikan}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Pekerjaan</th>
                                            <td> {this.props.dataKeluarga.wali.pekerjaan}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Penghasilan</th>
                                            <td> {this.props.dataKeluarga.wali.penghasilan}</td>
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
