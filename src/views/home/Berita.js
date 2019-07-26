import React, { Component, Fragment } from 'react';
import { TabPane, Row, Col, Card, CardBody, CardTitle, CardText, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link } from 'react-router-dom'

export default class Berita extends Component {
    render() {
        return (
            <Fragment>
                <TabPane tabId="1">
                    <Row className="mt-4">
                        <Col sm="12">
                            <Card>
                                <CardBody className="bl-unj">
                                    <CardTitle className="text-muted">
                                        <Link to="/informasi-terbaru" className="text-decoration-none info-title text-unj"><b>Mahasiswa Program Studi PTIK Juara Web E-Commerce Tingkat Nasional</b>
                                        </Link>
                                    </CardTitle>
                                    <CardText>Rabu, 10 Juli 2019 menjadi hari yang sangat membahagiakan bagi mahasiswa program studi pendidikan teknik informatika & komputer yang bernama Devin. Devin berhasil menjadi...</CardText>
                                    <CardText>
                                        <small className="text-muted">Diposting 3 menit yang lalu</small>
                                    </CardText>
                                </CardBody>
                            </Card>

                            <Card className="mt-3">
                                <CardBody className="bl-unj">
                                    <CardTitle className="text-muted info-title">
                                        <Link to="/informasi-terbaru" className="text-decoration-none info-title text-unj"><b>UNJ Jadi Tuan Rumah Lomba Liga Mahasiswa</b>
                                        </Link>
                                    </CardTitle>

                                    <CardText>Liga mahasiswa merupakan ajang bergengsi untuk para mahasiswa yang ada di Indonesia, karena perlombaan ini akan memperebutkan total hadiah ratusan juta rupiah. Maka hal ini membuat...</CardText>
                                    <CardText>
                                        <small className="text-muted">Diposting 9 menit yang lalu</small>
                                    </CardText>
                                </CardBody>
                            </Card>
                            <Pagination aria-label="Page navigation example" className="mt-4 text-unjj">
                                <PaginationItem disabled>
                                    <PaginationLink first href="#" className="text-unjj" />
                                </PaginationItem>
                                <PaginationItem disabled>
                                    <PaginationLink previous href="#" className="text-unjj" />
                                </PaginationItem>
                                <PaginationItem className="text-unjj">
                                    <PaginationLink href="#" className="text-unjj-active text-unjj">
                                        <b>1</b>
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" className="text-unjj">
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" className="text-unjj">
                                        3
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink next href="#" className="text-unjj" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink last href="#" className="text-unjj" />
                                </PaginationItem>
                            </Pagination>
                        </Col>
                        {/* <Col>

                        </Col> */}
                    </Row>
                </TabPane>
            </Fragment>
        )
    }
}
