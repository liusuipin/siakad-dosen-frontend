import React, { Component, Fragment } from 'react';
import {
    Button,
    Navbar,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import './Navigation.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/unj.png';
import { GlobalConsumer } from '../../context/context';
import axios from 'axios';

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            namaDosen: ''
        };
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        axios.get('http://localhost:3004/user/biodata', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(result => {
                this.setState({
                    namaDosen: result.data.result.nama
                })
            })
    }


    render() {
        return (
            <Fragment>
                <Navbar className="bg-unj fixed-top" light expand="md" sm="12">
                    <div className="nav">
                        <Button color="success" className="mr-3 float-left" onClick={() => this.props.dispatch({ type: 'HANDLER_SIDEBAR' })}><i className="fas fa-list"></i></Button>
                        <div className="text-white float-left mt-1 brand">
                            <Link to="/">
                                <img src={logo} width="33" alt="logo unj" className="float-left" />
                                <h5 className="float-left ml-2 mt-1"><b>SIAKAD UNJ</b></h5>
                            </Link>
                        </div>
                    </div>
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav>
                            <DropdownToggle nav className="text-white akun">
                                <i className="fas fa-user"></i><span className="d-none d-sm-inline ml-2"><b>{this.state.namaDosen}</b></span> <i className="fas fa-caret-down"></i>
                            </DropdownToggle>
                            <DropdownMenu right className="biodata">
                                <Link to="/biodata">
                                    <DropdownItem className="text-secondary dropdownitem btn-sm">
                                    <i className="fas fa-user-edit mr-2"></i>Biodata Dosen
                                    </DropdownItem>
                                </Link>
                                <Link to="/ubah-kata-sandi">
                                    <DropdownItem className="text-secondary dropdownitem btn-sm">
                                        <i className="fas fa-cogs fa-sm fa-fw mr-2"></i> Ubah Kata Sandi
                                    </DropdownItem>
                                </Link>
                                <DropdownItem divider className="text-secondary" />
                                <DropdownItem className="text-secondary dropdownitem btn-sm" onClick={this.props.logout}><i className="fas fa-sign-out-alt fa-sm fa-fw mr-2"></i> Keluar</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Navbar>
            </Fragment >
        )
    }
}

export default GlobalConsumer(Navigation);
