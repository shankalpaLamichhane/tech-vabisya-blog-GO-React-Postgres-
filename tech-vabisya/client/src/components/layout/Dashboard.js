import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Metrics from './Metrics';
import '../layout/style.css';
import SideNav from './SideNav';
import Navbar from '../layout/Navbar'
import Header from '../layout/Header'

const Dashboard = () => {
  return (
    <Fragment>
    <Navbar />
            <Header />
      <section id="main">
        <div className="container">
          <div className="row">
            <SideNav />
            <Metrics />
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Dashboard;
