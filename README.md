# quill-js-rails-adnan

This gem adds a Quill rich editor to an existing text field or text area. Quill - Your powerful, rich text editor.
Quill is a free, open source WYSIWYG editor built for the modern web. With its modular architecture and expressive API, it is completely customizable to fit any need.

# Installation

Add the following lines to your applications Gemfile:

```
gem 'quill-js-rails-adnan', '~> 0.0.1'
```
Then run bundle install to update your application's bundle.
```
bundle install
```
Add active storage and  Quill to your manifest in app/assets/javascripts/application.js:

Install active storage in your rails app

```
rails active_storage:install
rails db:migrate
```

```
require("@rails/activestorage").start()
```
```
import "./quill-editor.js"
```


