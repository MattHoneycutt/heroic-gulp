# heroic-gulp-poc
A starting point/proof of concept of a streamlined, reusable gulp v4 setup.  The goal is for this to be usable across web, Cordova, etc. 

#Getting Started
Make sure you have a recent version of gulp-cli installed.
Run 'npm i' to install everything.
Run 'gulp buildAndServe watch' to spin up the sample web page, hosted by Browsersync with a watch on the app folder. 

# What?
A gulp setup that follows my typical project conventions, and that can perform just about everything I care about, sans a few nice-to-haves that I may add:
* SASS with autoprefix
* Babel/ES6 transpilation 
* Concat-and-minify
* Browsersync
* Watch
* Cache busting

# Why?
Because I feel like this should be a solved problem.  And because I'm already using gulp on like a zillion projects.  And because I haven't taken the time to learn Webpack yet. :D

# How?
I envision the final version of this to go something like this:
1. Create a new project (duh)
2. npm i heroic-gulp --save-dev
3. Customize gulp.config.js if needed (hopefully this would involve just adding additional script and scss refs)
4. Do good things: gulp buildAndServe

I'm putting this out there to get feedback, and to see if there are ways I could do this better. 

#Things I Like
* Tasks are lean and self-contained.  The SASS and JS tasks don't have to worry about whether or not Browsersync is running.  Neither does watch. 
* It should work well for the way I build both web and mobile (Cordova) apps.  There are a few tasks that don't apply for mobile, but oh well.
* The config is mostly the same: you have a config object for each task, and things are consistent between them whenever possible. 

# Things I don't like
This is still a POC, and I'd like to make some further improvements: 
* I don't like that it's 3 files.  Maybe I shouldn't have made "gulpHero" as a utility.  It does keep the tasks nice and clean though.
* I don't like that I have to actually ship a gulpfile.js.  I'd like to somehow have a library of tasks that you could then import/export in your own gulpfile.  I played around with this, but didn't like how it looked.
