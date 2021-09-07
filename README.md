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

## Usage

Add the following code in your form to use quill js text editor:
```
<div>
  <%= f.hidden_field :body, class: "article-content" %>
  <div id="editor-container" style="height: 30rem; width: 100%;">
    <%= raw(@article.body) %>
  </div>
</div>

```
here, @article is the model name and body is column name which can be either text field or string.

Install active storage in your rails app (for using images with your quill js editor)

```
rails active_storage:install
rails db:migrate
```

Add active storage and  Quill to your manifest in app/assets/javascripts/application.js:
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
Along with the file-loader package (which is already included as a Webpacker dependency), should then be referred to in the config/webpack/environment.js file like so add:
```
const { environment } = require('@rails/webpacker')

const fileLoader = environment.loaders.get('file')
fileLoader.exclude = /node_modules[\\/]quill/

const svgLoader = {
    test: /\.svg$/,
    loader: 'svg-inline-loader'
}

environment.loaders.prepend('svg', svgLoader)

module.exports = environment
```
Now you'll want to make sure that the Quill core and Snow styles are added either to the stylesheets in Sprockets or in Webpacker. Personally, I chose to add this to sprockets because I ran into issues with Heroku when these were added to Webpacker. I did this by adding the following to the app/assets/stylesheets/application.css file

```
*= require_self
*= require 'quill/dist/quill.core.css'
*= require 'quill/dist/quill.snow.css'
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/adnanmirza1/quill-js-rails-adnan

## LICENSE
The gem is available as open source under the terms of the MIT License.
