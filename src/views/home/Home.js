import React, { Component, Fragment } from 'react';
import { Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Sidebar from '../../components/sidebar/Sidebar';
import Navigation from '../../components/navigation/Navigation.js';
// import Footer from '../../components/footer/Footer.js';
import Tabs from './Tabs';
import Welcome from './Welcome';
import { GlobalConsumer } from '../../context/context';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedIn: true
        }

    }

    componentDidMount() {
        const token = sessionStorage.getItem("token")
        if (token === null) {
            this.setState({
                loggedIn: false
            })
        }
        this.getUser()
    }

    logout = () => {
        sessionStorage.removeItem('token')
        this.setState({
            loggedIn: false
        })
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
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />
        }
        return (
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
                                            <BreadcrumbItem active><i className="fas fa-home mr-1"></i> Beranda</BreadcrumbItem>
                                        </Breadcrumb>
                                    </div>
                                    <Welcome />
                                    <Tabs />
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

export default GlobalConsumer(Home);
