// This file sets up a pseudo browser environment.
// babel-register is kind of like an environmental transpiler.
// By requiring and calling it here Babel will transpile any es6 and JSX it
// sees after this point. We pass in an object that has our presets on it
// because Babel doesn't ship with these transpilations by default.

require('babel-register')({
  presets: ['es2015', 'react']
})

// jsdom is a pure JavaScript representation of the DOM. It can be rendered to
// just like the DOM in the browser but what you render never appears anywhere.
const jsdom = require('jsdom').jsdom

const exposedProperties = ['window', 'navigator', 'document']

// Global is kind of like Node's version of window. It looks there for any variables
// in the global scope. By setting a property to it of 'document' we can replicate
// what a component might expect to see in the browser.
global.document = jsdom('')
global.window = document.defaultView
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}

documentRef = document
