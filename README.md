# Overwatch Player Stats API

An API to provide Overwatch player stats in JSON format.

## Live Demo
A live demo of the API is hosted at `https://overwatch-player-api.herokuapp.com`

## Installation
Install dependencies with `npm install`

## Usage
Run the server using `node server`

*The server will look for a PORT environment variable to run on. If one is not provided, it will default to 3000*

##Endpoint
`/platform/battletag/`  

| Platform      			| Syntax         |
| ------------- 			|:-------------: |
| PC      	   			| pc             |
| Playstation Network  | psn            |
| Xbox Live 				| xbl            |
| Nintendo Switch 		| nintendo-switch|  

The hashtag (#) symbol in Battletags should be replaced with a hyphen (-)

## Response Data
- Percentage data is returned as a decimal value between 0 and 1  
- Time data is returned in seconds

## Error Types

### INVALID_PLATFORM
Returned if the the platform provided to the endpoint is not one that is included in the table above  

### PROFILE\_NOT\_FOUND
The profile that you have provided does not exist. Ensure that you have replaced the # with a -.

## License
Overwatch Player Stats API is released under the MIT license.
