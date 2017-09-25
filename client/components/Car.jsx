import React from 'react';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

const Car = React.createClass({
  render() {
	return (
         <Row className="show-grid">
            <Col mdOffset={2} md={5}>{this.props.model}</Col>
			<Col md={3} className="text-right">{this.props.permission.toString(2)}</Col>
         </Row>
    );
 }
});

export default Car;