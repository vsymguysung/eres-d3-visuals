D3 Custom Visual Implementation
====================

[Demo](https://vsymguysung.github.io/vsnxt-d3-visuals)

# Introduction

This project has been built with `es6-project-starter-kit`.
You are free to use ES6 syntax following modular JS programming pattern and 
all output through the build pipline will be following `Universal Module Definition(UMD)` 


# Background knowledge

`ECMAScript 2015/ES6` introduces a lot of new cool [features](https://babeljs.io/features.html) unfortunately not yet available in the current modern browsers. This environment includes all the tools you need to let you run your ES6 code on any kind of platform.


# Usage

Once you've downloaded the files in this repo please run the following command in your terminal from the project folder (it may require `sudo`):

```shell
$ npm install
```

Browsing the [make.js](https://github.com/vsymguysung/vsnxt-d3-visuals/blob/master/make.js) file you will find all the available terminal commands to compile/test your project. __This file contains also the script name used for the output__
All the build tasks available are based on the __native javascript promises__ so you will be able to chain and combine them as you prefer

If you have installed correctly all the nodejs modules you can start writing your javascript modules into the `src` folder of course using the awesome javascript es6 syntax.

## Available tasks

### Build and test
```shell
$ node make # or also `$ npm run default`
```

### Convert the ES6 code into valid ES5 combining all the modules into one single file
```shell
$ node make build # or also `$ npm run build`
```

### Run all the tests
```shell
$ node make test # or also `$ npm run test`
```

### Start a nodejs static server
```shell
$ node make serve # or also `$ npm run serve`
```

### To compile and/or test the project anytime a file gets changed
```shell
$ node make watch # or also `$ npm run watch`
```

### APIs (JSON structure returned)

// legislators.

```
GET /legislators    HTTP/1.1
Accept:application/json, text/javascript, */*; q=0.01n
```

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

```
[
  { id: 4, name: 'Garry Glen'},
  { id: 2, name: 'Debbie Stabenow'},
  { id: 3, name: 'Rebekah Warren'},
  { id: 1, name: 'Gary Peters'},
  { id: 5, name: 'Mark Warner'},
  { id: 6, name: 'Tim Kaine'}
]
```

---

// legislator detail.

```
GET /legislator/?lid=4    HTTP/1.1
Accept:application/json, text/javascript, */*; q=0.01n
```

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

```
{
  name: 'Gary Glenn',
  title: 'Michigan House of Representatives',
  avatarUrl: 'https://usavotes.org/states/Michigan/images/pictures/2015-2016b/House/Glenn,Gary.jpg',
  email: 'gary@gmail.com',
  h_stackbarchart_dataset: [
                             {index: 121, billid: 'HB 4643', agree: 67, disagree: 54},
                             {index: 131, billid: 'HB 6066', agree: 87, disagree: 44},
                             {index: 198, billid: 'HB 5851', agree: 164, disagree: 34},
                             {index: 76, billid: 'HB 5400', agree: 58, disagree: 18},
                             {index: 106, billid: 'HB 5700', agree: 88, disagree: 18},
                             {index: 196, billid: 'HB 8200', agree: 75, disagree: 108},
                             {index: 86, billid: 'HB 9200', agree: 63, disagree: 23},
                             {index: 216, billid: 'HB 3400', agree: 128, disagree: 88}
                           ]

}
```

```
