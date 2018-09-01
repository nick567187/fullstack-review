import React from 'react';

const Repos = (props) => (
  <div>
    <h4> <span id='title'>Title:</span> {props.element.name} - <a href={props.element['htmlurl']}>{props.element['htmlurl']}</a> - {props.element.login} </h4>
  </div>
);

export default Repos;