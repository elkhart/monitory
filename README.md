Monitory
=============
[![CircleCI][circleci]][circleci-url]
[![npm][npm]][npm-url]

This project is intended to be a small helper framework for creating dashboards to be used in teamareas.
You as a user just need to define two things: 
* jobs: node processes, that fetches your data and emits events to the frontend 
* dashboards: react components, that subscribes to emitted jobs and show the data.

Disclaimer
------------
This is an early version and far away from being usable. 

User Manual
===========
Folder Structure
----------------

The default folder structure looks like this:
```
index.js
package.json
dashboards/
├── dashboard1.js
├── dashboard2.js
└── ....
jobs/
├── job1.js
├── job2.js
└── ....
```

To start monitory, create an index.js file with the following content
```javascript 1.8
const monitory = require('monitory');

monitory.start();
``` 
and let it run with `node index.js`. It can be configured as well, the properties and default values are:
```javascript 1.8
monitory.start({
  port: 1337,
  assetsPort: 1338,
  dashboards: `${__dirname}/dashboards/*`,
  jobs: `${__dirname}/jobs/*`,
});
``` 


Jobs
------
Jobs are the main processing unit for your data crawling. A job file just exports a map with following values:

**id (string)**
The id of the job to which frontend components can subscribe to. 

**interval (number)**
Define the interval, at which the job will be executed.

**job (func)**
A function that defines the job. Do your crawling logic inside here. You can return a value, a promise or even use an async function.


**Example:** 
```javascript 1.8
 module.exports = {
  id: 'myJobId2',// 
  interval: 5000, // ms 
  job: function(){
    return Math.round(Math.random() * 1000)
  }
}

```

It is also possible to return and array of jobs in one file, e.g.:

```javascript 1.8
module.exports = [{
  id: 'myJobId2',// 
  interval: 5000, // ms 
  job: function () {
    return Math.round(Math.random() * 1000)
  }
}, {
  id: 'myJobId2',// 
  interval: 5000, // ms 
  job: function () {
    return Math.round(Math.random() * 1000)
  },
}];

```

Dashboards
------------ 
For now, there are some components defined which makes your life easier. You can import them like
```javascript 1.8
import React from 'react';
import { Dashboard, Card } from 'monitory/frontend';
```
Do not forget to import React! This is needed for jsx transpiling. 

### Dashboard

The basic unit, used as a Wrapper for Cards.

### Card

A Card shows just a number from data processed by a job.

**job (string)**
Job name, to which this component should subscribe. 

**title (string)**
Title to show on the card

**value (function({current, last}))**
Function to map the view value from the job data. When the job emits the data, you should here reduce it to a single value.  

**showWhen (function({current, last}))**
When you only want to show the component when some conditions are met, you can use this hook.
It is called with the current and the last value emitted by the job.   

**color (function({current, last}) || string)**
Define the background color of the card. You can either define it as a String or as a function to return a fitting color.
The font is calculated accordingly (either black or white). 

**alert (function({current, last}) || boolean)**
Boolean that adds a pulse animation to the card, indicating that the team should focus attention.   



Todos:
---------

Backend:
* [ ] Add proper logging plugin
* [ ] Job Error handling (send error to frontend and show what happened)
* [ ] Cron Expression
* [ ] Provide client for ELK, graphite, teamcity



Frontend:
* [ ] Add iframe support (for dyb) 
* [ ] Implement start page with links to dashboard
* [ ] Additional adding of assets (icons, ...)
* [ ] New Card type: graph in background
* [ ] Toast if error occurs


This project is highly inspired by http://dashing.io/ which is unfortunately no longer maintained. 


[npm]: https://img.shields.io/npm/v/monitory.svg
[npm-url]: https://npmjs.com/package/monitory

[circleci]: https://img.shields.io/circleci/project/github/partysalat/monitory.svg
[circleci-url]: https://circleci.com/gh/partysalat/monitory/tree/master
