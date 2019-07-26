import React, { Component } from 'react';
import { TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import './Home.css';
import Pengumuman from './Pengumuman.js';
import Kalender from './Kalender';
import Bpa from './Bpa';
import UnduhForm from './UnduhForm';
import Panduan from './Panduan';

export default class Tabs extends Component {

    constructor(props) {
        super(props);

        // this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div>
                <Nav tabs className="text-secondary tabss">
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            <i className="far fa-newspaper"></i> Informasi Penting
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            <i className="fas fa-calendar-alt"></i> Kalender Akademik
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                        >
                            <i className="fas fa-book"></i> Buku Pedoman Akademik
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '4' })}
                            onClick={() => { this.toggle('4'); }}
                        >
                            <i className="fas fa-download"></i> Unduh Form
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '5' })}
                            onClick={() => { this.toggle('5'); }}
                        >
                            <i className="fas fa-question-circle"></i> Panduan SIAKAD
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab} className="text-secondary">
                    <Pengumuman />
                    <Kalender />
                    <Bpa />
                    <UnduhForm />
                    <Panduan />
                </TabContent>
            </div>
        )
    }
}
