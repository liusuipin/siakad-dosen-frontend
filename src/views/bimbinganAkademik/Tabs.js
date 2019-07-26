import React, { Component } from 'react';
import { TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios'
import Biodata from './Biodata'
import Keluarga from './Keluarga'
import Sekolah from './Sekolah'
import Khs from './Khs'
import Krs from './Krs'
// import './Home.css';

export default class Tabs extends Component {

    constructor(props) {
        super(props);

        // this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '4',
            biodata: {
                agama: '', alamat: '', dusun: '', email: '', hp: '', jenisKelamin: '', jenisTinggal: '', kabkot: '',
                kecamatan: '', kelurahan: '', kewarganegaraan: '', kodePos: '', kps: '', nama: '', nik: '', noKPS: '', npwp: '', provinsi: '', rt: '', rw: '', tanggalLahir: '', telp: '', tempatLahir: '', transportasi: ''
            },
            keluarga: {
                alamat: '',
                ayah: {
                    lahir: '',
                    nama: '',
                    nik: '',
                    pekerjaan: '',
                    pendidikan: '',
                    penghasilan: ''
                },
                ibu: {
                    lahir: '',
                    nama: '',
                    nik: '',
                    pekerjaan: '',
                    pendidikan: '',
                    penghasilan: ''
                },
                wali: {
                    lahir: '',
                    nama: '',
                    nik: '',
                    pekerjaan: '',
                    pendidikan: '',
                    penghasilan: ''
                },
                kabkot: '',
                kecamatan: '',
                kelurahan: '',
                kode_pos: '',
                kontak: '',
                provinsi: '',
                rt: '',
                rw: ''
            },
            sekolah: {
                akreditasi: '',
                jenisSekolah: '',
                jurusan: '',
                kabkot: '',
                kecamatan: '',
                mpIjazah: '',
                mpUN: '',
                namaSekolah: '',
                nisn: '',
                noIjazah: '',
                noUN: '',
                npsn: '',
                provinsi: '',
                rerataIjazah: '',
                rerataUN: '',
                tahunLulus: '',
                tahunMasuk: ''
            }
        };
    }

    componentDidMount() {
        this.getBiodata()
        this.getKeluarga()
        this.getSekolah()
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    getBiodata = () => {
        axios.get(`http://localhost:3004/bimbinganAkademik/${this.props.nim}/biodata`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    biodata: {
                        agama: result.data.result.agama,
                        alamat: result.data.result.alamat,
                        dusun: result.data.result.dusun,
                        email: result.data.result.email,
                        hp: result.data.result.hp,
                        jenisKelamin: result.data.result.jenisKelamin,
                        jenisTinggal: result.data.result.jenisTinggal,
                        kabkot: result.data.result.kabkot,
                        kecamatan: result.data.result.kecamatan,
                        kelurahan: result.data.result.kelurahan,
                        kewarganegaraan: result.data.result.kewarganegaraan,
                        kodePos: result.data.result.kodePos,
                        kps: result.data.result.kps,
                        nama: result.data.result.nama,
                        nik: result.data.result.nik,
                        noKPS: result.data.result.noKPS,
                        npwp: result.data.result.npwp,
                        provinsi: result.data.result.provinsi,
                        rt: result.data.result.rt,
                        rw: result.data.result.rw,
                        tanggalLahir: result.data.result.tanggalLahir,
                        telp: result.data.result.telp,
                        tempatLahir: result.data.result.tempatLahir,
                        transportasi: result.data.result.transportasi
                    }
                })
            })
    }

    getKeluarga = () => {
        axios.get(`http://localhost:3004/bimbinganAkademik/${this.props.nim}/keluarga`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    keluarga: {
                        alamat: result.data.result.alamat,
                        ayah: {
                            lahir: result.data.result.ayah.lahir,
                            nama: result.data.result.ayah.nama,
                            nik: result.data.result.ayah.nik,
                            pekerjaan: result.data.result.ayah.pekerjaan,
                            pendidikan: result.data.result.ayah.pendidikan,
                            penghasilan: result.data.result.ayah.penghasilan
                        },
                        ibu: {
                            lahir: result.data.result.ibu.lahir,
                            nama: result.data.result.ibu.nama,
                            nik: result.data.result.ibu.nik,
                            pekerjaan: result.data.result.ibu.pekerjaan,
                            pendidikan: result.data.result.ibu.pendidikan,
                            penghasilan: result.data.result.ibu.penghasilan
                        },
                        wali: {
                            lahir: result.data.result.wali.lahir,
                            nama: result.data.result.wali.nama,
                            nik: result.data.result.wali.nik,
                            pekerjaan: result.data.result.wali.pekerjaan,
                            pendidikan: result.data.result.wali.pendidikan,
                            penghasilan: result.data.result.wali.penghasilan
                        },
                        kabkot: result.data.result.kabkot,
                        kecamatan: result.data.result.kecamatan,
                        kelurahan: result.data.result.kelurahan,
                        kode_pos: result.data.result.kode_pos,
                        kontak: result.data.result.kontak,
                        provinsi: result.data.result.provinsi,
                        rt: result.data.result.rt,
                        rw: result.data.result.rw
                    }
                })
            })
    }

    getSekolah = () => {
        axios.get(`http://localhost:3004/bimbinganAkademik/${this.props.nim}/sekolah`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    sekolah: {
                        akreditasi: result.data.result.akreditasi,
                        jenisSekolah: result.data.result.jenisSekolah,
                        jurusan: result.data.result.jurusan,
                        kabkot: result.data.result.kabkot,
                        kecamatan: result.data.result.kecamatan,
                        mpIjazah: result.data.result.mpIjazah,
                        mpUN: result.data.result.mpUN,
                        namaSekolah: result.data.result.namaSekolah,
                        nisn: result.data.result.nisn,
                        noIjazah: result.data.result.noIjazah,
                        noUN: result.data.result.noUN,
                        npsn: result.data.result.npsn,
                        provinsi: result.data.result.provinsi,
                        rerataIjazah: result.data.result.rerataIjazah,
                        rerataUN: result.data.result.rerataUN,
                        tahunLulus: result.data.result.tahunLulus,
                        tahunMasuk: result.data.result.tahunMasuk
                    }
                })
            })
    }

    render() {
        // console.log(this.state.nim)
        return (
            <div className="col-sm-12 mx-auto">
                <Nav tabs className="text-secondary tabss">
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            <i className="fas fa-user"></i> Biodata
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            <i className="fas fa-heart"></i> Keluarga
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                        >
                            <i className="fas fa-school"></i> Sekolah
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '4' })}
                            onClick={() => { this.toggle('4'); }}
                        >
                            <i className="fas fa-paper-plane"></i> KRS
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '5' })}
                            onClick={() => { this.toggle('5'); }}
                        >
                            <i className="fas fa-file-alt"></i> KHS
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab} className="text-secondary">
                    <Khs nim={this.props.nim} />
                    <Krs nim={this.props.nim} />
                    <Biodata dataBiodata={this.state.biodata} />
                    <Keluarga dataKeluarga={this.state.keluarga} />
                    <Sekolah dataSekolah={this.state.sekolah} />
                </TabContent>
            </div>
        )
    }
}
