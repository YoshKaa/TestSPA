import React from 'react';

import Car from './Car.jsx';

import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

const CarsGrid = React.createClass({
  render() {
	if(this.props.isAuth) 
		return (
		<Grid>
			<Row className="show-grid">              
			   <Col mdOffset={2} md={5}>Список Автомобилей</Col>
			   <Col md={3} className="text-right">Уровень доступа</Col>
			</Row>
			{
			this.props.cars.map( car => 
				<Car key={car.id} user_id={car.user_id} model={car.model} permission={car.permission} />
			)
			}
		</Grid>
		);
	else 
		return (
		<Grid>
		</Grid>
		);
  }
});

export default CarsGrid;