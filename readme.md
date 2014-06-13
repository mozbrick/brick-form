# x-form

> A [Brick](https://github.com/mozilla/brick/) form component.

## Demo

[Check it live!](http://dotch.github.io/x-form)

## Usage

1. Import Web Components polyfill:

    ```html
    <script src="bower_components/platform/platform.js"></script>
    ```

2. Import a Brick-Storage component
    ```html
    <link rel="import" href="bower_components/x-storage-indexeddb/src/element.html">
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="src/element.html">
    ```

3. Start using it:

    ```html
    <x-store-indexeddb id="store" key="email"></x-store-indexeddb>
    <x-form store="store" name="example@example.com">... inputs ...</x-form>
    ```

## Options

Attribute     | Options     | Default      | Description
---           | ---         | ---          | ---
`name`        | *string*    | `x-form`     | The name of the form. Will be used as to identify the forms data in the datastore. Has to be set when using multiple forms.
`store`       | *string*    |              | The manadtory id of the storage component to save the form data to.

## Methods

Method            | Parameters   | Returns     | Description
---               | ---          | ---         | ---
`loadFormData()`  |              | data object.| Load the data from the storage component.
`saveFormData()`  | data object  |             | Save the data from the storage component.

## Events

Event         | Description
---           | ---
`onsomething` | Triggers when something happens.

## Development

Brick components use [Stylus](http://learnboost.github.com/stylus/) to generate their CSS.

This repository comes outfitted with a set of tools to ease the development process.

To get started:

* Install [Bower](http://bower.io/) & [Gulp](http://gulpjs.com/):

    ```sh
    $ npm install -g bower gulp
    ```

* Install local dependencies:

    ```sh
    $ npm install && bower install
    ```

While developing your component, there is a development server that will watch your files for changes and automatically re-build your styles and re-lint your code.

To run the development server:

* Run `gulp server`
* Navigate to `http:localhost:3001`

To simply build and lint your code, run `gulp build`.

You can also push your code to GitHub Pages by running `gulp deploy`.

## License

[MIT License](http://opensource.org/licenses/MIT)
