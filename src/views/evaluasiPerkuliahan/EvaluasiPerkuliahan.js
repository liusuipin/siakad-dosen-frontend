import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Breadcrumb, BreadcrumbItem, Form, Label, FormGroup, Input, Table } from 'reactstrap';
import { GlobalConsumer } from '../../context/context';
import Navigation from '../../components/navigation/Navigation';
import Sidebar from '../../components/sidebar/Sidebar';
import Loading from '../../components/loading/Loading';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
// import Footer from '../../components/footer/Footer';

class EvaluasiPerkuliahan extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            loggedIn: true,
            daftarSemester: [],
            dataEval: {
                rerataKelas: [],
                rerataFakultas: [],
                rerataUniversitas: []
            },
            form: {
                kodeSemester: 110,
                kodeKelas: 1517800003
            },
            daftarKodeSeksi: []
        }
    }


    onChange = (e) => {
        let newForm = { ...this.state.form }
        newForm[e.target.name] = e.target.value;
        this.setState({
            form: newForm
        })
    }

    componentDidMount() {
        const token = sessionStorage.getItem("token")
        if (token === null) {
            this.setState({
                loggedIn: false
            })
        }
        this.getSemester()
        this.getSeksi()
        this.getData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.form !== prevState.form) {
            this.getSeksi()
            this.getData()
            // console.log(this.state.rerata.rerataKelas)
        }
    }

    logout = () => {
        sessionStorage.removeItem('token')
        this.setState({
            loggedIn: false
        })
    }

    getSemester = () => {
        axios.get('http://localhost:3004/ref/semester', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                this.setState({
                    daftarSemester: result.data.result,
                    isLoading: false
                });
            })
    }

    getSeksi = () => {
        axios.get(`http://localhost:3004/evaluasiDosen/${this.state.form.kodeSemester}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                    this.setState({
                        daftarKodeSeksi: result.data.result
                    });
            })
    }

    getData = () => {
        axios.get(`http://localhost:3004/evaluasiDosen/${this.state.form.kodeSemester}/${this.state.form.kodeKelas}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                // console.log(result)
                    this.setState({
                        dataEval: {
                            rerataKelas: result.data.result.kelas,
                            rerataFakultas: result.data.result.fakultas,
                            rerataUniversitas: result.data.result.universitas
                        }
                    });
            })
    }

    render() {
        let { form } = this.state
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />
        }

        let chartData = {
            labels: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12', 'P13', 'P14', 'P15', 'P16', 'P17', 'P18', 'P19', 'P20'],
            datasets: [
                {
                    label: 'Kelas',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#dc3545',
                    borderColor: '#dc3545',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#dc3545',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [
                        this.state.dataEval.rerataKelas.map((val) => val.rk1),
                        this.state.dataEval.rerataKelas.map((val) => val.rk2),
                        this.state.dataEval.rerataKelas.map((val) => val.rk3),
                        this.state.dataEval.rerataKelas.map((val) => val.rk4),
                        this.state.dataEval.rerataKelas.map((val) => val.rk5),
                        this.state.dataEval.rerataKelas.map((val) => val.rk6),
                        this.state.dataEval.rerataKelas.map((val) => val.rk7),
                        this.state.dataEval.rerataKelas.map((val) => val.rk8),
                        this.state.dataEval.rerataKelas.map((val) => val.rk9),
                        this.state.dataEval.rerataKelas.map((val) => val.rk10),
                        this.state.dataEval.rerataKelas.map((val) => val.rk11),
                        this.state.dataEval.rerataKelas.map((val) => val.rk12),
                        this.state.dataEval.rerataKelas.map((val) => val.rk13),
                        this.state.dataEval.rerataKelas.map((val) => val.rk14),
                        this.state.dataEval.rerataKelas.map((val) => val.rk15),
                        this.state.dataEval.rerataKelas.map((val) => val.rk16),
                        this.state.dataEval.rerataKelas.map((val) => val.rk17),
                        this.state.dataEval.rerataKelas.map((val) => val.rk18),
                        this.state.dataEval.rerataKelas.map((val) => val.rk19),
                        this.state.dataEval.rerataKelas.map((val) => val.rk20)
                    ]
                },
                {
                    label: 'Fakultas',
                    type: 'line',
                    data: [
                        this.state.dataEval.rerataFakultas.map((val) => val.frk1),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk2),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk3),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk4),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk5),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk6),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk7),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk8),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk9),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk10),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk11),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk12),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk13),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk14),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk15),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk16),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk17),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk18),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk19),
                        this.state.dataEval.rerataFakultas.map((val) => val.frk20)
                    ],
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#17a2b8',
                    borderColor: '#17a2b8',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#17a2b8',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10
                },
                {
                    label: 'UNJ',
                    type: 'line',
                    data: [
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk1),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk2),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk3),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk4),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk5),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk6),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk7),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk8),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk9),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk10),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk11),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk12),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk13),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk14),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk15),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk16),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk17),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk18),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk19),
                        this.state.dataEval.rerataUniversitas.map((val) => val.urk20)
                    ],
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#28a745',
                    borderColor: '#28a745',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#28a745',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10
                }
            ]
        }
        return (
            this.state.isLoading ?
                <Loading title={'Evaluasi Perkuliahan'} /> :
            <Fragment>
                <Navigation logout={this.logout} />
                <div className="wrapper">
                    <Sidebar />
                    <div className={this.props.state.sidebar ? "wrapper-content-close wrapper-content-blur" : "wrapper-content-open"}>
                        <div className={this.props.state.sidebar ? "container" : "container-fluid"}>
                            <Row className="mt-2 mb-4">
                                <Col>
                                    <div>
                                        <Breadcrumb className="breadcrumb-me">
                                            <BreadcrumbItem><Link to="/beranda"><i className="fas fa-home mr-1"></i> Beranda</Link></BreadcrumbItem>
                                            <BreadcrumbItem active>Evaluasi Perkuliahan</BreadcrumbItem>
                                        </Breadcrumb>
                                    </div>
                                    <div className="col-md-12 mx-auto mt-2">
                                        <h4 className="text-center mb-2">Evaluasi Perkuliahan</h4>
                                        <Row className="mt-4">
                                            <Col>
                                                <Form>
                                                    <FormGroup row>
                                                        <Col lg="12" sm="6" md="12" className="">
                                                            <Label for="exampleSelect">Semester :</Label>
                                                            <Input type="select" name="kodeSemester" value={form.kodeSemester} className="form-control-sm" onChange={this.onChange}>
                                                                {
                                                                    this.state.daftarSemester.map((val, i) => {
                                                                        return (
                                                                            <option value={val.kodeSemester} key={i}>{val.kodeSemester} - {val.tahunSemester}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </Input>
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Col lg="12" sm="8" md="12" className="pt-1">
                                                            <Label>Kode Seksi :</Label>
                                                            <Input type="select" name="kodeKelas" value={form.kodeKelas} className="form-control-sm" onChange={this.onChange}>
                                                                {
                                                                    this.state.daftarKodeSeksi.map((val, i) => {
                                                                        return (
                                                                            <option value={val.kodeKelas} key={i}>{val.kodeKelas} - {val.namaMK}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </Input>
                                                        </Col>
                                                        {/* <Col sm="3" className="pt-3 mt-auto">
                                                            <Button color="info" className="btn-sm"><i className="fas fa-search"></i> Filter</Button>
                                                        </Col> */}
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                            <Col sm="7" className="mx-auto mt-2">
                                                <h6 className="text-center">Grafik Rata-Rata Evaluasi Perkuliahan</h6>
                                                <Line
                                                    data={chartData}
                                                    options={{
                                                        legend: {
                                                            display: true,
                                                            position: 'bottom'
                                                        }
                                                    }}
                                                />
                                            </Col>
                                        </Row>

                                        <Row className="mt-3">
                                            <Col sm="12">
                                                <div className="table-responsive">
                                                    <Table bordered hover>
                                                        <thead className="thead-light">
                                                            <tr>
                                                                <th rowSpan={2} className="text-center">No</th>
                                                                <th rowSpan={2} className="text-center">Aspek</th>
                                                                <th colSpan={3} className="text-center">Rata-Rata</th>
                                                            </tr>
                                                            <tr>
                                                                <th className="text-center">Kelas</th>
                                                                <th className="text-center">Fakultas</th>
                                                                <th className="text-center">UNJ</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row" className="text-center">1</th>
                                                                <td>Menyampaikan silabus perkuliahan kepada mahasiswa pada pertemuan pertama.</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk1}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk1}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk1}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">2</th>
                                                                <td>Menyampaikan kompetensi dan tujuan pembelajaran di setiap pertemuan perkuliahan.</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk2}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk2}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk2}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">3</th>
                                                                <td>Melakukan perkuliahan sesuai prosedur (pendahuluan inti, dan penutup) dan relevan dengan tujuan pembelajaran.</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk3}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk3}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk3}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">4</th>
                                                                <td>Melibatkan mahasiswa secara aktif dalam perkuliahan.</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk4}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk4}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk4}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">5</th>
                                                                <td>Menggunakan metode pembelajaran yang tepat (diskusi, demonstrasi, simulasi, dll).</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk5}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk5}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk5}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">6</th>
                                                                <td>Menguasai materi perkuliahan dengan baik.</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk6}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk6}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk6}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">7</th>
                                                                <td>Memperkaya materi perkuliahan dengan hasil penelitian mutakhir.</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk7}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk7}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk7}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">8</th>
                                                                <td>Menjadi dosen yang dapat dicontoh/ditiru dalam proses pembelajaran.</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk8}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk8}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk8}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">9</th>
                                                                <td>Merespon dengan benar pertanyaan/pernyataan mahasiswa.</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk9}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk9}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk9}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">10</th>
                                                                <td>Menggunakan media pembelajaran yang tepat.</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk10}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk10}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk10}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">11</th>
                                                                <td>Memanfaatkan sumber belajar secara maksimal (buku, modul, jurnal. lingkungan sekitar).</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk11}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk11}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk11}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">12</th>
                                                                <td>Memanfaatkan teknologi informasi dan komunikasi (TIK) secara tepat dalam perkuliahan.</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk12}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk12}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk12}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">13</th>
                                                                <td>Melaksanakan perkuliahan sesuai dengan jadwal dan materi yang ditetapkan dalam silabus (RPKPS).</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk13}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk13}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk13}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">14</th>
                                                                <td>Menginformasikan kepada mahasiswa apabila perkuliahan ditunda/tidak berjalan sesuai jadwal.</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk14}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk14}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk14}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">15</th>
                                                                <td>Memenuhi jam tatap muka perkuliahan sesuai dengan bobot SKS setiap minggunya.</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk15}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk15}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk15}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">16</th>
                                                                <td>Memenuhi jumlah tatap muka minimal 14 minggu dalam satu semester.</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk16}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk16}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk16}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">17</th>
                                                                <td>Membangun disiplin, kejujuran, tanggung jawab ilmiah, dan menghargai pendapat orang lain.</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk17}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk17}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk17}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">18</th>
                                                                <td>Memberikan koreksi, umpan balik dan nilai pada latihan/tugas yang dikerjakan oleh mahasiswa.</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk18}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk18}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk18}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">19</th>
                                                                <td>Melakukan penilaian dengan menggunakan perangkat tes (tulis, lisan, praktek, dll) yang diujikan sesuai dengan kompetensi.</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk19}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk19}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk19}</span>))}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="row" className="text-center">20</th>
                                                                <td>Menginformasikan hasil ujian (UTS atau kuis) dan tugas secara transparan dan tepat waktu.</td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataKelas.map((val, i) => (<span className="text-center" key={i}>{val.rk20}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataFakultas.map((val, i) => (<span className="text-center" key={i}>{val.frk20}</span>))}
                                                                </td>
                                                                <td className="text-center">
                                                                    {this.state.dataEval.rerataUniversitas.map((val, i) => (<span className="text-center" key={i}>{val.urk20}</span>))}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        {/* <Footer /> */}
                    </div>
                </div>
            </Fragment >
        )
    }
}

export default GlobalConsumer(EvaluasiPerkuliahan);
