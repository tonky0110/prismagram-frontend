import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
	width: 100%;
	border: 0;
	border-radius: ${(props) => props.theme.borderRadius};
	background-color: ${(props) => props.theme.blueColor};
	color: white;
	text-align: center;
	padding: 7px 0px;
	font-weight: 600;
	font-size: 14px;
`;

const Button = ({ text }) => <Container>{text}</Container>;

Button.propTypes = {
	text: PropTypes.string.isRequired
};

export default Button;
