[![Join the chat at https://gitter.im/modern-mean](https://badges.gitter.im/modern-mean/modern-mean.svg)](https://gitter.im/modern-mean/modern-mean?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/modern-mean/users-material.svg?branch=master)](https://travis-ci.org/modern-mean/users-material)
[![Coverage Status](https://coveralls.io/repos/github/modern-mean/users-material/badge.svg?branch=master)](https://coveralls.io/github/modern-mean/users-material?branch=master)

#users-material
Users Module for material design.  This package is designed to be installed into the <a href="https://github.com/modern-mean/modern-mean">main modern-mean application</a>

#Installation into modern-mean
To install this module into the modern-mean application:
```sh
npm install --save modern-mean/users-material
```

#Features
* User Authentication
* User profile picture
* User addresses
* User emails
* User information
* Admin console

#Development
If you are developing for the core module it is easier to put this repository in the modern-mean/modules folder.  That way you can use live reload, watchers and the rest of the development tools in the main package.
```sh
git clone https://github.com/modern-mean/modern-mean.git
git clone https://github.com/modern-mean/users-material.git modern-mean/modules/modern-mean-users-material
```
Or symlink (Watching will not work until this issue is fixed https://github.com/paulmillr/chokidar/issues/419)
```sh
git clone https://github.com/modern-mean/modern-mean.git
git clone https://github.com/modern-mean/users-material.git modern-mean-users-material
cd modern-mean/modules
ln -s ../../modern-mean-users-material .
```
Then npm and bower install the packages.
