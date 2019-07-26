import React, { Component, Fragment } from 'react'
import { GlobalConsumer } from '../../context/context';
import { Row, Col, Breadcrumb, BreadcrumbItem, Spinner } from 'reactstrap';
import Navigation from '../navigation/Navigation';
import Sidebar from '../sidebar/Sidebar';
import { Link } from 'react-router-dom';


class Loading extends Component {
    _isMounted = false;
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (
            <div>
                <Fragment>
                    <Navigation />
                    <div className="wrapper">
                        <Sidebar />
                        <div className={this.props.state.sidebar ? "wrapper-content-close wrapper-content-blur" : "wrapper-content-open"}>
                            <div className={this.props.state.sidebar ? "container" : "container-fluid"}>
                                <Row className="mt-2 mb-5">
                                    <Col md="12">
                                        <Breadcrumb className="breadcrumb-me">
                                            {/* <BreadcrumbItem active>Beranda</BreadcrumbItem> */}
                                            <BreadcrumbItem><Link to="/beranda"><i className="fas fa-home mr-1"></i> Beranda</Link></BreadcrumbItem>
                                            <BreadcrumbItem active>{this.props.title}</BreadcrumbItem>
                                        </Breadcrumb>
                                        <div className="col-md-12 mx-auto mt-2 text-center">
                                            <h4 className="text-center">{this.props.title}</h4>
                                            <div className="mt-5">
                                                <Spinner type="grow" color="success" />
                                                <Spinner type="grow" color="success" />
                                                <Spinner type="grow" color="success" />
                                                <Spinner type="grow" color="success" />
                                                <Spinner type="grow" color="success" />
                                                <Spinner type="grow" color="success" />
                                                <Spinner type="grow" color="success" />
                                                <Spinner type="grow" color="success" />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            {/* <Footer /> */}
                        </div>
                    </div>
                </Fragment>
            </div>
        )
    }
}

export default GlobalConsumer(Loading);
