'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import coveralls from 'gulp-coveralls';
import debug from 'gulp-debug';
import eslint from 'gulp-eslint';
import filter from 'gulp-filter';
import del from 'del';
import mainBowerFiles from 'main-bower-files';
import templateCache from 'gulp-angular-templatecache';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import { Server as KarmaServer } from 'karma';
import istanbul from 'gulp-istanbul';
import mocha from 'gulp-mocha';

var isparta = require('isparta');

function setTest() {
  process.env.NODE_ENV = 'test';
  process.env.MEAN_CORE_MONGOOSE_DB = 'modern-mean-test';
}

function cleanClient() {
  return del([
    './dist/client'
  ]);
}
cleanClient.displayName = 'clean:client';
gulp.task(cleanClient);

function cleanServer() {
  return del([
    './dist/server'
  ]);
}
cleanServer.displayName = 'clean:server';
gulp.task(cleanServer);

function cleanCoverage() {
  return del([
    './tests/.coverage'
  ]);
}
cleanCoverage.displayName = 'clean:coverage';
gulp.task(cleanCoverage);

let clean = gulp.parallel(cleanClient, cleanServer, cleanCoverage);
clean.displayName = 'clean';
gulp.task(clean);

function lint() {
  return gulp.src(['./server/**/*.js', './client/**/*.js', './test/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
lint.displayName = 'lint';
gulp.task(lint);

function serverBabel() {
  return gulp.src(['./server/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('./dist/server'));
}
serverBabel.displayName = 'babel';
gulp.task(serverBabel);

function vendor() {
  let bowerFiles = mainBowerFiles({ filter: ['**/*.js', '!**/angular.js'] });
  return gulp.src(bowerFiles)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./dist/client'));
}
vendor.displayName = 'vendor';
gulp.task(vendor);

function templates() {
  return gulp.src(['./client/**/*.html'])
    .pipe(templateCache({
      root: 'modern-mean-users-material/',
      module: 'users'
    }))
    .pipe(gulp.dest('./dist/client'));
}
templates.displayName = 'templates';
gulp.task(templates);

function application() {
  let filterJS = filter(['**/*.js'], { restore: true }),
    filterCSS = filter(['**/*.css'], { restore: true });

  return gulp.src(['./client/**/*.module.js', './client/**/*.{js,css}'])
    .pipe(filterJS)
    .pipe(concat('application.js'))
    .pipe(gulp.dest('./dist/client'))
    .pipe(filterJS.restore)
    .pipe(filterCSS)
    .pipe(concat('application.css'))
    .pipe(gulp.dest('./dist/client'));
}
application.displayName = 'application';
gulp.task(application);

function images() {
  return gulp.src(['./client/**/*.{jpg,png,gif,ico}'])
  .pipe(imagemin({
        progressive: true,
        svgoPlugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ],
        use: [pngquant()]
      }))
    .pipe(gulp.dest('./dist/client'));
}
images.displayName = 'images';
gulp.task(images);

function testServerSingle(done) {
  setTest();
  gulp.src(['./server/**/*.js'])
  	.pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true
    }))
  	.pipe(istanbul.hookRequire()) // or you could use .pipe(injectModules())
  	.on('finish', function () {
  	  gulp.src(['./tests/server/**/*.js'])
      //.pipe(injectModules())
  		.pipe(mocha({
        reporter: 'spec',
        require: ['./tests/mocha.setup'],
      }))
  		.pipe(istanbul.writeReports(
        {
          dir: './tests/.coverage/server',
          reporters: [ 'lcov', 'html', 'text' ]
        }
      ))
      .once('error', () => {
        process.exit(1);
        return done();
      })
      .once('end', () => {
        return done();
      });
  	});
}
testServerSingle.displayName = 'test:server';
gulp.task(testServerSingle);


function testClientSingle(done) {
  process.env.NODE_ENV = 'test';
  new KarmaServer({
    configFile: process.cwd() + '/tests/karma.conf.js',
    singleRun: true
  }, done).start();
}
testClientSingle.displayName = 'test:client';
gulp.task(testClientSingle);

function sendCoveralls() {
  return gulp.src('tests/.coverage/**/lcov.info')
    .pipe(debug())
    .pipe(concat('lcov.info'))
    .pipe(coveralls());
}
sendCoveralls.displayName = 'coveralls';
gulp.task(sendCoveralls);

//Build Client
let client = gulp.series(cleanClient, gulp.parallel(images, templates, application, vendor));
client.displayName = 'client';
gulp.task(client);

//Build Server
let server = gulp.series(cleanServer, gulp.parallel(serverBabel));
server.displayName = 'server';
gulp.task(server);

//Gulp Default
let defaultTask = gulp.series(clean, gulp.parallel(client, server));
defaultTask.displayName = 'default';
gulp.task(defaultTask);

//Gulp Test
let testTask = gulp.series(clean, lint, defaultTask, testClientSingle, testServerSingle);
testTask.displayName = 'test';
gulp.task(testTask);
