Cashify
=======

Overview
-------
An educational game for finance, making learning finance a much more fun experience!

Setup
------
Install Rails. Make sure you have Ruby 1.9.2 or newer before installing Rails. If you are developing on a Mac, it will be easier to manage your versions of Ruby and Rails using RVM. After cloning this repo, go into the directory and run

    bundle install
    rake db:migrate
    rake db:seed
    rails s

Then your server should be up. Your server should be up on your host port 3000 by default.

To run the console to manually add entries to database, try

    rails c

Working on New Features
-------
It is recommended that you make a new branch when you work on a new feature. Only merge it to master when it is stable. For example, if you are working on building a forum, make a new branch called Forum, and develop in that branch.

Components
-------

    -Marketplace-user can buy and shop items with their earned points
    -Interactive map-a place where user can walk through and enter games
    -Forum-a forum for cashify
    -News feeds- blogs and feeds from the Cashify team

Controllers
------

    -Home: serves all pages that does not need authentication
    -Dashboard: serves general pages that requires user's authentication
    -API: Still in development. the api_controller should handle the ajax requests from the javascript games.

Models
-----
Self explanatory. User is in user table etc...

Most of the models follows CRUD conventions and mapped as resources. Run rake routes to see the possible routing.

Authentication
------
The Devise gem is used for the authentication system. Therefore, look into devise documentation to change login/logout templates.

It has session variables such as current_user that will makes authentication easy (i.e. current_used.signed_in?)

Front-End Framework
------
I have used the Twitter Bootstrap framework for this project. Try to use those css as much as possible so the css across the site is uniform. The bootstrap.css and bootstrap.js are imported in the application layout.

Front-End (Game JavaScripts)
------
In order not to mix the website's JS with the game JS files, I made it so that all the game related js files should be in the /public folder, while the website related js and css files follows the rails convention and be put in the assets folder. Since the game can be executed independent of the website beside making ajax calls, we can just render games inside iframes.

**Note**: It is good practice to write js code with variables scoped in a namespace, because the browser js engine just run them together, and it will be messy with variables with the same names all in the global scopes. 

Bug tracking/Backlog
------
Use the issues tab in github

Testing
------
Not setup yet. Should use rspec tests if we want to be strict with TDD.

Deploying
-------
We use Heroku as the production environment. Make sure you are login to heroku by running 
    
    heroku login

Also, add the heroku repo path in your git repo as well. 

Then, everytime if you pushed to the master branch on github, you could also sync it to production

    git push heroku master


