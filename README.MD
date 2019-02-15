### Population Management System API

Population Management System is a censors application that stores a list of locations and the total number of residents in each location by gender.

### Getting Started

Clone the repository `git clone https://github.com/ibrahim013/population-manager.git`

cd into project folder

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
Visit API DOC for API documentation

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
