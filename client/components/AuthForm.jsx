import React from 'react';

import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

const AuthForm = React.createClass({
  getInitialState() {
     return {
	   login: '',
	   password: ''
	 };
  },
  
  handleChangeLogin(e) {
     this.setState({login: e.target.value});
  },
  
  handleChangePassword(e) {
     this.setState({password: e.target.value});
  },
  
  handleSubmit(e) {
    e.preventDefault();
	this.props.onAuthSubmit({login: this.state.login, password: this.state.password	});
    this.setState({login: '', password: ''});
  },
  
  handleLogout(e) {
    e.preventDefault();
	this.props.onLogout();
  },	
  
  render() {    
    if (this.props.isAuth) 
		return (
		<Grid>
		  <Row className="show-grid">
            <Col mdOffset={2} md={8} className="text-right">
		      <Form inline onSubmit={this.handleLogout}>		
		      <ControlLabel>Добро пожаловать <b>{this.props.user[0]['login']}</b></ControlLabel>
		      {'          '}
		      <FormGroup>
		      	<Button type="submit">Выйти</Button>
		      </FormGroup>
		      </Form>
		     </Col>
          </Row>
		</Grid>
		);
	 else
		return (
		<Grid>
		  <Row className="show-grid">
            <Col mdOffset={2} md={8} className="text-right">
		      <Form inline onSubmit={this.handleSubmit}>
		        <FormGroup controlId="formInlineName">
		        	<ControlLabel>Логин</ControlLabel>
		        	{' '}
		        	<FormControl type="text" value={this.state.login} onChange={this.handleChangeLogin} placeholder="логин" />
		        </FormGroup>
		        {' '}
		        <FormGroup controlId="formInlinPass">
		        	<ControlLabel>Пароль</ControlLabel>
		        	{' '}
		        	<FormControl type="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="пароль" />
		        </FormGroup>
		        {'          '}
		        <FormGroup>
		        	<Button type="submit" disabled={!this.state.password}>Войти</Button>
		        </FormGroup>
		        </Form>	
		     </Col>
          </Row>
		</Grid>
		);
  }
});

export default AuthForm;