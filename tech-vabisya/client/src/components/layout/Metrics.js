
import React from 'react';

const Metrics = () => {
return (
<div className="col-md-9">
<div className="panel panel-default">
  <div className="panel-heading main-color-bg">
    <h3 className="panel-title">Website Overview</h3>
  </div>
  <div className="panel-body">
    <div className="col-md-3">
      <div className="well dash-box">
        <h2><span className="glyphicon glyphicon-user" aria-hidden="true"></span> 203</h2>
        <h4>Users</h4>
      </div>
    </div>
    <div className="col-md-3">
      <div className="well dash-box">
        <h2><span className="glyphicon glyphicon-list-alt" aria-hidden="true"></span> 12</h2>
        <h4>Pages</h4>
      </div>
    </div>
    <div className="col-md-3">
      <div className="well dash-box">
        <h2><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> 33</h2>
        <h4>Posts</h4>
      </div>
    </div>
    <div className="col-md-3">
      <div className="well dash-box">
        <h2><span className="glyphicon glyphicon-stats" aria-hidden="true"></span> 12,334</h2>
        <h4>Visitors</h4>
      </div>
    </div>
  </div>
  </div>


</div>
)
}
export default Metrics;