import React, { Component, Fragment } from 'react';
import Navigation from '../../components/navigation/Navigation.js';
import Sidebar from '../../components/sidebar/Sidebar.js';
import Loading from '../../components/loading/Loading';
// import Footer from '../../components/footer/Footer.js';
import { Row, Col, Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { GlobalConsumer } from '../../context/context.js';
import axios from 'axios';
import Swal from 'sweetalert2';

class Biodata extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            loggedIn: true,
            form: {
                nama: '',
                nidn: '',
                nip: '',
                nik: '',
                npwp: '',
                kodeLama: '',
                tempatLahir: '',
                tanggalLahir: '',
                jnsKelamin: '',
                gelarDepan: '',
                gelarBelakang: '',
                tugasTambahan: '',
                jabTambahan: '',
                jabStatus: '',
                jabFungsional: '',
                jabGolongan: '',
                alamat: '',
                kontak: '',
                email: '',
                provinsi: '',
                kodeProvinsi: '',
                kabupaten: '',
                kecamatan: ''
            },

            daftarJabStruktural: [],
            daftarJabFungsional: [],
            daftarStatusDosen: [],
            daftarJabGolongan: [],
            daftarProvinsi: [],
            daftarKabKot: [],
            daftarKecamatan: []
        }
    }

    onChange = (e) => {
        let newForm = { ...this.state.form }
        newForm[e.target.name] = e.target.value;
        this.setState({
            form: newForm
        })
    }

    getAlertPut = () => {
        return Swal.fire(
            'Sukses!',
            'Biodata berhasil diubah!',
            'success'
        )
    }

    logout = () => {
        sessionStorage.removeItem('token')
        this.setState({
            loggedIn: false
        })
    }

    componentDidMount() {
        const token = sessionStorage.getItem("token")
        if (token === null) {
            this.setState({
                loggedIn: false
            })
        }
        this.getBiodata()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.form !== prevState.form) {
            // console.log(this.state.form)
            this.getJabStruktural()
            this.getJabatan()
            this.getStatusDosen()
            this.getJabGolongan()
            this.getProvinsi()
            this.getKabKot()
            this.getKecamatan()
        }
    }

    getBiodata = () => {
        axios.get('http://localhost:3004/user/biodata', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    isLoading: false,
                    form: {
                        nama: result.data.result.nama,
                        nidn: result.data.result.nidn,
                        nip: result.data.result.nip,
                        nik: result.data.result.nik,
                        npwp: result.data.result.npwp,
                        kodeLama: result.data.result.kodeaLama,
                        tempatLahir: result.data.result.kelahiran.tempatLahir,
                        tanggalLahir: result.data.result.kelahiran.tanggalLahir,
                        jnsKelamin: result.data.result.jenisKelamin.kode,
                        gelarDepan: result.data.result.gelarDepan,
                        gelarBelakang: result.data.result.gelarBelakang,
                        jabTambahan: result.data.result.jabTambahan.kodeTugas,
                        jabFungsional: result.data.result.jabFungsional.kodeFungsional,
                        jabStatus: result.data.result.jabStatus.kodeStatus,
                        jabGolongan: result.data.result.JabGolongan.kodeGolongan,
                        alamat: result.data.result.alamat,
                        kontak: result.data.result.kontak,
                        email: result.data.result.email,
                        provinsi: result.data.result.provinsi.kodeProvinsi,
                        kabkot: result.data.result.kabkot.kodeKabkot,
                        kecamatan: result.data.result.kecamatan.kodeKecamatan
                    }
                })
            })
    }

    getJabStruktural = () => {

        axios.get('http://localhost:3004/ref/jabstruktural', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    daftarJabStruktural: result.data.result
                })
            })
    }

    getJabatan = () => {
        axios.get('http://localhost:3004/ref/jabfungsional', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    daftarJabFungsional: result.data.result
                })
            })
    }

    getStatusDosen = () => {
        axios.get('http://localhost:3004/ref/jabstatus', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    daftarStatusDosen: result.data.result
                })
            })
    }

    getJabGolongan = () => {
        axios.get('http://localhost:3004/ref/jabgolongan', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    daftarJabGolongan: result.data.result
                })
            })
    }

    getProvinsi = () => {
        axios.get('http://localhost:3004/ref/provinsi', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    daftarProvinsi: result.data.result
                })
            })
    }

    getKabKot = () => {
        // 010000 (kode provinsi dki jkt)
        axios.get(`http://localhost:3004/ref/kabkot/${this.state.form.provinsi}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    daftarKabKot: result.data.result
                })
            })
    }

    getKecamatan = () => {
        // 016400
        axios.get(`http://localhost:3004/ref/kecamatan/${this.state.form.kabkot}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    daftarKecamatan: result.data.result
                })
            })
    }

    updateBiodata = () => {
        const { nama, gelarDepan, gelarBelakang, nip, nik, npwp, kodeLama, tmpLahir, tglLahir, jnsKelamin, jabTambahan, jabStatus, jabFungsional, jabGolongan, kontak, email, alamat, provinsi, kabkot, kecamatan } = this.state.form

        axios.put('http://localhost:3004/user/biodata', {
            nama, gelarDepan, gelarBelakang, nip, nik, npwp, kodeLama, tmpLahir, tglLahir, jnsKelamin, jabTambahan, jabStatus, jabFungsional, jabGolongan, kontak, email, alamat, provinsi, kabkot, kecamatan
        }, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('token')
                }
            })
            .then(result => {
                this.getAlertPut()
            })
    }

    doReset = () => {
        this.getBiodata()
    }

    render() {
        const { form } = this.state;
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />
        }
        return (
            this.state.isLoading ?
                <Loading title={'Biodata Dosen'} /> :

                <Fragment>
                    <Navigation logout={this.logout} namaDosen={form.nama} />
                    <div className="wrapper">
                        <Sidebar />
                        <div className={this.props.state.sidebar ? "wrapper-content-close wrapper-content-blur" : "wrapper-content-open"}>
                            <div className={this.props.state.sidebar ? "container" : "container-fluid"}>
                                <Row className="mt-2 mb-5">
                                    <Col md="12">
                                        <Breadcrumb className="breadcrumb-me">
                                            {/* <BreadcrumbItem active>Beranda</BreadcrumbItem> */}
                                            <BreadcrumbItem><Link to="/beranda"><i className="fas fa-home mr-1"></i> Beranda</Link></BreadcrumbItem>
                                            <BreadcrumbItem active>Biodata Dosen</BreadcrumbItem>
                                        </Breadcrumb>
                                        <div className="col-md-12 mx-auto mt-2">
                                            <h4 className="text-center">Biodata Dosen</h4>
                                            <Form className="mt-3">
                                                <FormGroup row>
                                                    <Label sm={5}>Nomor Induk Dosen Nasional (NIDN)</Label>
                                                    <Col sm={7}>
                                                        <Input type="number" name="nidn" id="nidn" defaultValue={form.nidn} className="form-control-sm" disabled />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Nama Lengkap Dosen (tanpa gelar)</Label>
                                                    <Col sm={7}>
                                                        <Input type="text" name="nama" value={form.nama} className="form-control-sm" onChange={this.onChange} />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Nomor Induk Pegawai (PNS)</Label>
                                                    <Col sm={7}>
                                                        <Input type="number" name="nip" value={form.nip} className="form-control-sm" onChange={this.onChange} />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Nomor Induk Kependudukan (KTP)</Label>
                                                    <Col sm={7}>
                                                        <Input type="number" name="nik" value={form.nik} className="form-control-sm" onChange={this.onChange} />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Nomor Pokok Wajib Pajak (NPWP)</Label>
                                                    <Col sm={7}>
                                                        <Input type="number" name="npwp" value={form.npwp} className="form-control-sm" onChange={this.onChange} />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Kode Dosen (SIAKAD lama)</Label>
                                                    <Col sm={7}>
                                                        <Input type="number" name="kodeLama" value={form.kodeLama} className="form-control-sm" onChange={this.onChange} />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Tempat Kelahiran</Label>
                                                    <Col sm={7}>
                                                        <Input type="text" name="tmpLahir" value={form.tempatLahir} className="form-control-sm" onChange={this.onChange} />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Tanggal Kelahiran</Label>
                                                    <Col sm={7}>
                                                        <Input type="date" name="tglLahir" placeholder="time placeholder" value={form.tanggalLahir} className="form-control-sm" onChange={this.onChange} />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row inline>
                                                    <Label sm={5}>Jenis Kelamin</Label>
                                                    <Col sm={7}>
                                                        <Label check className="ml-4">
                                                            <Input type="radio" name="jnsKelamin" value="L" checked={form.jnsKelamin === "L"} onChange={this.onChange} />{' '} Laki-laki
                                                    </Label>
                                                        <Label check className="ml-5">
                                                            <Input type="radio" name="jnsKelamin" value="P" checked={form.jnsKelamin === "P"} onChange={this.onChange} />{' '} Perempuan
                                                    </Label>
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Gelar Depan Dosen (dengan titik setelah gelar)</Label>
                                                    <Col sm={7}>
                                                        <Input type="text" name="gelarDepan" value={form.gelarDepan} className="form-control-sm" onChange={this.onChange} />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Gelar Belakang Dosen (dengan koma sebelum gelar)</Label>
                                                    <Col sm={7}>
                                                        <Input type="text" name="gelarBelakang" value={form.gelarBelakang} className="form-control-sm" onChange={this.onChange} />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Tugas Tambahan (Struktural)</Label>
                                                    <Col sm={7}>
                                                        <Input type="select" name="jabTambahan" className="form-control-sm" value={form.jabTambahan} onChange={this.onChange}>
                                                            <option value="">--Pilih Jabatan Tambahan--</option>
                                                            {
                                                                this.state.daftarJabStruktural.map((val, i) => {
                                                                    return (
                                                                        <option value={val.kodeStruktural} key={i}>{val.namaStruktural}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Input>
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Status Dosen UNJ</Label>
                                                    <Col sm={7}>
                                                        <Input type="select" name="jabStatus" className="form-control-sm" value={form.jabStatus} onChange={this.onChange}>
                                                            <option value="">--Pilih Jabatan Status--</option>
                                                            {
                                                                this.state.daftarStatusDosen.map((val, i) => {
                                                                    return (
                                                                        <option value={val.kodeStatus} key={i}>{val.namaStatus}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Input>
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Jabatan Fungsional</Label>
                                                    <Col sm={7}>
                                                        <Input type="select" name="jabFungsional" className="form-control-sm" value={form.jabFungsional} onChange={this.onChange}>
                                                            <option value="">--Pilih Jabatan Fungsional--</option>
                                                            {
                                                                this.state.daftarJabFungsional.map((val, i) => {
                                                                    return (
                                                                        <option value={val.kodeFungsional} key={i}>{val.namaFungsional}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Input>
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Golongan (PNS)</Label>
                                                    <Col sm={7}>
                                                        <Input type="select" name="jabGolongan" className="form-control-sm" value={form.jabGolongan} onChange={this.onChange}>
                                                            <option value="">--Pilih Golongan (PNS)--</option>
                                                            {
                                                                this.state.daftarJabGolongan.map((val, i) => {
                                                                    return (
                                                                        <option value={val.kodeGolongan} key={i}>{val.namaGolongan}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Input>
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Alamat Dosen</Label>
                                                    <Col sm={7}>
                                                        <Input type="text" name="alamat" value={form.alamat} className="form-control-sm" onChange={this.onChange} />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Kontak/No.HP Aktif</Label>
                                                    <Col sm={7}>
                                                        <Input type="number" name="kontak" value={form.kontak} className="form-control-sm" onChange={this.onChange} />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Email Aktif</Label>
                                                    <Col sm={7}>
                                                        <Input type="email" name="email" value={form.email} className="form-control-sm" onChange={this.onChange} />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Provinsi</Label>
                                                    <Col sm={7}>
                                                        <Input type="select" name="provinsi" className="form-control-sm" value={form.provinsi} onChange={this.onChange}>
                                                            <option value="">--Pilih Provinsi--</option>
                                                            {
                                                                this.state.daftarProvinsi.map((val, i) => {
                                                                    return (
                                                                        <option value={val.kodeProvinsi} key={i}>{val.namaProvinsi}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Input>
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Kabupaten/Kotamadya</Label>
                                                    <Col sm={7}>
                                                        <Input type="select" name="kabkot" value={form.kabkot} onChange={this.onChange} className="form-control-sm">
                                                            <option value="">--Pilih Kabupaten/kota--</option>
                                                            {
                                                                this.state.daftarKabKot.map((val, i) => {
                                                                    return (
                                                                        <option value={val.kodeKabkot} key={i}>{val.namaKabkot}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Input>
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={5}>Kecamatan</Label>
                                                    <Col sm={7}>
                                                        <Input type="select" name="kecamatan" className="form-control-sm" value={form.kecamatan} onChange={this.onChange}>
                                                            <option value="">--Pilih Kecamatan--</option>
                                                            {
                                                                this.state.daftarKecamatan.map((val, i) => {
                                                                    return (
                                                                        <option value={val.kodeKecamatan} key={i}>{val.namaKecamatan}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Input>
                                                        <Button color="info" type="button" className="mt-4 btn-sm" onClick={this.updateBiodata}><i className="fas fa-save"></i> Simpan</Button>
                                                        <Button color="danger" type="button" className="mt-4 ml-2 btn-sm" onClick={this.doReset}><i className="fas fa-undo"></i> Bersihkan</Button>
                                                    </Col>
                                                </FormGroup>
                                            </Form>
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

export default GlobalConsumer(Biodata);
