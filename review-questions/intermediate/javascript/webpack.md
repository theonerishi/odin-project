# What is a bundler?
A bundler bundles files from an entry point that leads to a dependency graph.
# What is Webpack?
One of the most popular Javascript bundlers.
# How do you bundle Javascript?
Make a Webpack configuration file with the relevant information and then run npx webpack.
# How do you load CSS using Webpack?
Install css-loader and style-loader and update the webpack configuration file.
# How do you automatically build HTML files in dist using Webpack?
Using html-loader
# How would you handle assets like local image files?
Put a test and a type key in the module.rules array within the webpack configuration file. Put a regular expression with image file extensions in the test key and asset/resource for the type key.
# What Webpack tool could you use during development to view changes to your website live?
Use a webpack dev server
# How does using a source map help with development?
Links errors with source code.