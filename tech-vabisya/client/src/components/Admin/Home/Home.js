import React, { Fragment, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../../components/Common/TopCard";

const Home = () => {

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Dashboard</h1>
      <p className="mb-4">Summary and overview of our admin stuff here</p>

      <div className="row">
        <TopCard title="PRODUCT COUNT" icon="box" class="primary" />
        <TopCard title="PRODUCT AMOUNT" icon="warehouse" class="danger" />
        <TopCard title="SUMMARY PRICE"  icon="dollar-sign" class="success" />
      </div>

      <div className="row">
        <TopCard title="SALES"  icon="donate" class="primary" />
        <TopCard title="ORDER AMOUNT"  icon="calculator" class="danger" />
      </div>

      <div className="row">

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Product list</h6>
            </div>
            <div className="card-body">
            </div>
          </div>

        </div>

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Order list</h6>
            </div>
            <div className="card-body">
            </div>
          </div>
        </div>

      </div>

    </Fragment>
  );
};

export default Home;
