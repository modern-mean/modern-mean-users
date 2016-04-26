[![Build Status](https://travis-ci.org/modern-mean/modern-mean-users-material.svg?branch=master)](https://travis-ci.org/modern-mean/modern-mean-users-material)
[![Coverage Status](https://coveralls.io/repos/github/modern-mean/modern-mean-users-material/badge.svg?branch=master)](https://coveralls.io/github/modern-mean/modern-mean-users-material?branch=master)

# modern-mean-users
Users Module for material design.  This package is designed to be installed into the <a href="https://github.com/modern-mean/modern-mean">main modern-mean application</a>

#Installation into modern-mean
To install this module into the modern-mean application:
```sh
npm install --save modern-mean/users-material
```

#Development
If you are developing for the core module it is easier to put this repository in the modern-mean/modules folder.  That way you can use live reload, watchers and the rest of the development tools in the main package.
```sh
git clone https://github.com/modern-mean/modern-mean.git
git clone https://github.com/modern-mean/users-material.git modern-mean/modules/modern-mean-users-material
```
Or symlink
```sh
git clone https://github.com/modern-mean/modern-mean.git
git clone https://github.com/modern-mean/users-material.git modern-mean-users-material
cd modern-mean/modules
ln -s ../../modern-mean-users-material .
```
Then npm and bower install the packages.

