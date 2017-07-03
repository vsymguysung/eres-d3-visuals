D3 Custom Visual Implementation
====================

[Demo](https://vsymguysung.github.io/vsnxt-d3-visuals/)

# Introduction

This project has been built with `es6-project-starter-kit`.
You are free to use ES6 syntax following modular JS programming pattern and 
all output through the build pipline will be following `Universal Module Definition(UMD)` 


# Background knowledge

`ECMAScript 2015/ES6` introduces a lot of new cool [features](https://babeljs.io/features.html) unfortunately not yet available in the current modern browsers. This starter kit contains all the tools you need to let you run your ES6 code on any kind of platform.


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

