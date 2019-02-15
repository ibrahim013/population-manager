[![Coverage Status](https://coveralls.io/repos/github/ibrahim013/population-manager/badge.svg?branch=dev)](https://coveralls.io/github/ibrahim013/population-manager?branch=dev) [![Build Status](https://travis-ci.org/ibrahim013/population-manager.svg?branch=dev)](https://travis-ci.org/ibrahim013/population-manager)

### Population Management System API

Population Management System is a censors application that stores a list of locations and the total number of residents in each location by gender.

### Getting Started

Clone the repository `git clone https://github.com/ibrahim013/population-manager.git`

cd into project directory

Install packages by runing `yarn`

Change .env.sample to .env and add the needed values

Start application with `yarn start`

### API Endpoints
|Endpoint |	HTTP Method |	Description|
|---------|-------------|------------|
|/api/v1/signup|	POST |	signup a new user |
|/api/v1/login |	POST |	login a registered|
|/api/v1/createlocation|	POST|	Create a new location with male and female population|
|/api/v1/locations|	GET	| Get a location by id or locations |
|/api/v1/locations/:id|	PUT |	Update a location |
|/api/v1/locations/:id|	DELETE |	Delete a location by id|

### Documentation
Visit [API DOC](https://documenter.getpostman.com/view/4905727/S11BxgzP) for API documentation

### Technologies
* MongoDB
* Express
* Node Js

### Product Limitation
This is an API no frontend is consuming it yet

### Want to Contribute?
* Fork the repository
* Make your contributions
* Ensure your codes follow the AirBnB Javascript Styles Guide
* Create Pull request against the dev branch.
