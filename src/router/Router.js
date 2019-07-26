import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../views/home/Home.js';
import Biodata from '../views/biodata/Biodata.js';
import UbahPass from '../views/biodata/UbahPass.js';
import JadwalMengajar from '../views/jadwalMengajar/JadwalMengajar.js';
import PengisianNilai from '../views/pengisianNilai/PengisianNilai.js';
import DaftarMengajar from '../views/daftarMengajar/DaftarMengajar.js';
import EvaluasiPerkuliahan from '../views/evaluasiPerkuliahan/EvaluasiPerkuliahan.js';
import BimbinganAkademik from '../views/bimbinganAkademik/BimbinganAkademik.js';
import NotFound from '../views/notFound/NotFound.js';

import GlobalProvider from '../context/context';
import Login from '../views/login/Login.js';
import IsiNilai from '../views/pengisianNilai/IsiNilai.js';
import DataMahasiswa from '../views/bimbinganAkademik/DataMahasiswa';
import InformasiTerbaru from '../views/home/InformasiTerbaru';
import Report from '../views/daftarMengajar/Report.js';


class Router extends Component {
    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <Switch>
                        <Route path='/login' component={Login} exact />
                        <Route path='/' component={Login} exact />
                        <Route path='/beranda' component={Home} exact />
                        <Route path='/informasi-terbaru' component={InformasiTerbaru} exact />
                        <Route path='/biodata' component={Biodata} exact />
                        <Route path='/ubah-kata-sandi' component={UbahPass} exact />
                        <Route path='/jadwal-mengajar' component={JadwalMengajar} exact />
                        <Route path='/jadwal-mengajar/report' component={Report} exact />
                        <Route path='/pengisian-nilai' component={PengisianNilai} exact />
                        <Route path='/pengisian-nilai/:kodeKelas' component={IsiNilai} exact />
                        <Route path='/daftar-mengajar' component={DaftarMengajar} exact />
                        <Route path='/evaluasi-perkuliahan' component={EvaluasiPerkuliahan} exact />
                        <Route path='/bimbingan-akademik' component={BimbinganAkademik} exact />
                        <Route path='/bimbingan-akademik/:nim' component={DataMahasiswa} exact />
                        <Route path='*' component={NotFound} exact />
                    </Switch>
                </BrowserRouter>
            </Fragment>
        )
    }
}

export default GlobalProvider(Router);

