# hyperborder - extension for HyperTerm
adds a gradient border to the hyperterm editor

![](https://cldup.com/pL94ODfQNP.png)

## Installation
add it as the last item to plugins in your ~/.hyperterm.js configuration

````
module.exports = {
  ...
  plugins: ['hyperterm-atom-dark', 'hyperborder']
  ...
}
````
then just restart your HyperTerm app or go to the menu 'Plugins / Update All Now'

## Configuration
It is possible to configure the width of the outer border. (more soon...)

add the following section to your ~/.hyperterm.js

````
module.exports = {
  config: {
    ...
    hyperborder: {
      borderWidth: '4px'
    }
    ...
  }
}
````

## download HyperTerm here
https://hyperterm.org/
