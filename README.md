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

Install active storage in your rails app (for using images with your quill js editor)

```
rails active_storage:install
rails db:migrate
```

```
require("@rails/activestorage").start()
import "./quill-editor.js"
```
it's also important to ensure that you've added a CSRF meta tag to your views
These are typically added to the <head> tag within the app/views/layouts/application.html.erb file (or in the corresponding partial file if these are being used):
```
<%= csrf_meta_tags %>
```
To use QuillJS in your app, it will need to be added as a dependency in your package.json file:
```
"dependencies": {
    "@babel/preset-react": "^7.7.4",
    "@rails/activestorage": "^6.0.2",
    "@rails/webpacker": "4.2.2",
    "@taoqf/quill-image-resize-module": "^3.0.1",
    "quill": "^1.3.7",
    "quill-image-drop-module": "^1.0.3",
    "svg-inline-loader": "0.8.2"
  },
```

