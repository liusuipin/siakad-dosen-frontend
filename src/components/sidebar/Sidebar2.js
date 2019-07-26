import React, { Component, Fragment } from 'react';
import { Row, Col, ListGroup, ListGroupItem, Button, Tooltip } from 'reactstrap';
import { NavLink } from 'react-router-dom'

import './Sidebar.css';
import { GlobalConsumer } from '../../context/context';


class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.toggleKalender = this.toggleKalender.bind(this);
        this.toggleBpa = this.toggleBpa.bind(this);
        this.toggleUnduhForm = this.toggleUnduhForm.bind(this);
        this.state = {
            tooltipKalender: false,
            tooltipBpa: false,
            tooltipUnduhForm: false
        };
    }

    toggleKalender() {
        this.setState({
            tooltipKalender: !this.state.tooltipKalender
        });
    }
    toggleBpa() {
        this.setState({
            tooltipBpa: !this.state.tooltipBpa
        });
    }
    toggleUnduhForm() {
        this.setState({
            tooltipUnduhForm: !this.state.tooltipUnduhForm
        });
    }
    render() {
        return (
            <Fragment>

                {/* SIDEBAR MODE PC */}
                <div className={this.props.state.sidebar ? "sidebar-close sidebar  bg-white d-none d-lg-block" : "sidebar-open sidebar bg-white d-none d-lg-block"}>
                    <div md="2" className="text-dark">
                        {/* <Container> */}
                        <Row>
                            <Col>
                                <ListGroup flush>
                                    {/* <ListGroupItem disabled tag="a" href="#" className="text-success bg-light text-center"><b>DOSEN</b></ListGroupItem> */}
                                    {/* <ListGroupItem disabled tag="a" href="#" className="text-success bg-light text-center"> */}
                                    {/* <Row> */}
                                    <Tooltip placement="top" isOpen={this.state.tooltipKalender} target="kalender" toggle={this.toggleKalender}>
                                        Kalender Akademik
                                    </Tooltip>
                                    <Tooltip placement="top" isOpen={this.state.tooltipBpa} target="bpa" toggle={this.toggleBpa}>
                                        Buku Pedoman Akademik
                                    </Tooltip>
                                    <Tooltip placement="top" isOpen={this.state.tooltipUnduhForm} target="unduhform" toggle={this.toggleUnduhForm}>
                                        Unduh Form
                                    </Tooltip>
                                    <Col sm="12 p-2 text-center">
                                        <NavLink to="/kalender">

                                        </NavLink>
                                        <Button color="danger" className="btn-sm mr-2" id="kalender"><i className="fas fa-calendar-alt"></i></Button>
                                        <Button color="warning" className="btn-sm text-white" id="bpa"><i className="fas fa-book"></i></Button>
                                        <Button color="info" className="btn-sm ml-2" id="unduhform"><i className="fas fa-download"></i></Button>
                                    </Col>
                                    {/* </Row> */}
                                    {/* </ListGroupItem> */}

                                    <NavLink exact to="/" activeClassName="sidebar-item-active" className="text-decoration-none" onClick={() => this.props.dispatch({ type: 'SMALL_SIDEBAR' })}>
                                        <ListGroupItem className="sidebar-item"><i className="fas fa-home mr-2"></i>Beranda</ListGroupItem>
                                    </NavLink>

                                    <NavLink exact to="/daftar-mengajar" activeClassName="sidebar-item-active" className="text-decoration-none">
                                        <ListGroupItem className="sidebar-item"><i className="fas fa-chalkboard-teacher mr-2"></i>Daftar Mengajar</ListGroupItem>
                                    </NavLink>

                                    <NavLink exact to="/pengisian-nilai" activeClassName="sidebar-item-active" className="text-decoration-none">
                                        <ListGroupItem className="sidebar-item"><i className="fas fa-edit mr-2"></i>Pengisian Nilai</ListGroupItem>
                                    </NavLink>

                                    <NavLink exact to="/evaluasi-perkuliahan" activeClassName="sidebar-item-active" className="text-decoration-none">
                                        <ListGroupItem className="sidebar-item"><i className="fas fa-chart-line mr-2"></i> Evaluasi Perkuliahan</ListGroupItem>
                                    </NavLink>

                                    <NavLink exact to="/bimbingan-akademik" activeClassName="sidebar-item-active" className="text-decoration-none">
                                        <ListGroupItem className="sidebar-item text-sm"><i className="fas fa-users mr-2"></i>Bimbingan Akademik</ListGroupItem>
                                    </NavLink>

                                </ListGroup>

                                {/* <div className="sidebar-menu">
                                    <ul>
                                        <NavLink to="/" className="text-decoration-none"><li className="p-2"><i className="fas fa-home mr-2" ></i>Beranda</li></NavLink>
                                        <NavLink to="/jadwal-mengajar" className="text-decoration-none"><li className="p-2"><i className="far fa-calendar-alt mr-2"></i> Jadwal Mengajar</li></NavLink>
                                        <NavLink to="/pengisian-nilai" className="text-decoration-none"><li className="p-2"><i className="fas fa-edit mr-2"></i>Pengisian Nilai</li></NavLink>
                                        <NavLink to="/daftar-mengajar" className="text-decoration-none"><li className="p-2"><i className="fas fa-chalkboard-teacher mr-2"></i>Daftar Mengajar</li></NavLink>
                                        <NavLink to="/evaluasi-perkuliahan" className="text-decoration-none"><li className="p-2"><i className="fas fa-chart-line mr-2"></i> Evaluasi Perkuliahan</li></NavLink>
                                        <NavLink to="/bimbingan-akademik" className="text-decoration-none"><li className="p-2"><i className="fas fa-users mr-2"></i>Bimbingan akademik</li></NavLink>
                                    </ul>
                                </div> */}
                            </Col>
                        </Row>
                        {/* </Container> */}
                    </div>
                </div >


                {/* SIDEBAR MODE HP */}
                <div className={this.props.state.sidebar ? "sidebar-close sidebar  bg-white d-lg-none d-xl-none" : "sidebar-open sidebar bg-white d-lg-none d-xl-none"}>
                    <div md="2" className="text-dark">
                        <Row>
                            <Col>
                                <ListGroup flush>
                                    {/* <ListGroupItem disabled tag="a" href="#" className="text-success bg-light text-center"><b>DOSEN</b></ListGroupItem> */}
                                    {/* <Row className="bg-light"> */}
                                    <Col sm="12 p-2 text-center">
                                    <Tooltip placement="top" isOpen={this.state.tooltipKalender} target="kalender" toggle={this.toggleKalender}>
                                        Kalender Akademik
                                    </Tooltip>
                                    <Tooltip placement="top" isOpen={this.state.tooltipBpa} target="bpa" toggle={this.toggleBpa}>
                                        Buku Pedoman Akademik
                                    </Tooltip>
                                    <Tooltip placement="top" isOpen={this.state.tooltipUnduhForm} target="unduhform" toggle={this.toggleUnduhForm}>
                                        Unduh Form
                                    </Tooltip>
                                        <Button color="danger" className="btn-sm mr-2" id="kalender"><i className="fas fa-calendar-alt"></i></Button>
                                        <Button color="warning" className="btn-sm text-white" id="bpa"><i className="fas fa-book"></i></Button>
                                        <Button color="info" className="btn-sm ml-2" id="unduhform"><i className="fas fa-download"></i></Button>
                                    </Col>
                                    {/* </Row> */}

                                    <NavLink exact to="/" activeClassName="sidebar-item-active" className="text-decoration-none" onClick={() => this.props.dispatch({ type: 'HANDLER_SIDEBAR' })}>
                                        <ListGroupItem className="sidebar-item"><i className="fas fa-home mr-2"></i>Beranda</ListGroupItem>
                                    </NavLink>

                                    <NavLink exact to="/daftar-mengajar" activeClassName="sidebar-item-active" className="text-decoration-none" onClick={() => this.props.dispatch({ type: 'HANDLER_SIDEBAR' })}>
                                        <ListGroupItem className="sidebar-item"><i className="fas fa-chalkboard-teacher mr-2"></i>Daftar Mengajar</ListGroupItem>
                                    </NavLink>

                                    <NavLink exact to="/pengisian-nilai" activeClassName="sidebar-item-active" className="text-decoration-none" onClick={() => this.props.dispatch({ type: 'HANDLER_SIDEBAR' })}>
                                        <ListGroupItem className="sidebar-item"><i className="fas fa-edit mr-2"></i>Pengisian Nilai</ListGroupItem>
                                    </NavLink>

                                    <NavLink exact to="/evaluasi-perkuliahan" activeClassName="sidebar-item-active" className="text-decoration-none" onClick={() => this.props.dispatch({ type: 'HANDLER_SIDEBAR' })}>
                                        <ListGroupItem className="sidebar-item"><i className="fas fa-chart-line mr-2"></i> Evaluasi Perkuliahan</ListGroupItem>
                                    </NavLink>

                                    <NavLink exact to="/bimbingan-akademik" activeClassName="sidebar-item-active" className="text-decoration-none" onClick={() => this.props.dispatch({ type: 'HANDLER_SIDEBAR' })}>
                                        <ListGroupItem className="sidebar-item text-sm"><i className="fas fa-users mr-2"></i>Bimbingan Akademik</ListGroupItem>
                                    </NavLink>
                                </ListGroup>
                            </Col>
                        </Row>
                    </div>
                </div >

            </Fragment>
        )
    }
}

export default GlobalConsumer(Sidebar);
