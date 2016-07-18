# hyperborder - extension for HyperTerm
adds a gradient border to the hyperterm editor

![](https://cldup.com/pL94ODfQNP.png)

## Installation
add it to your ~/.hyperterm.js

````
module.exports = {
  ...
  plugins: ['hyperborder']
  ...
}
````
then just restart your HyperTerm app or go to the menu 'Plugins / Update All Now'

## Configuration
It is possible to configure some parts of hyperborder.
You can change the width of the outer border as well as the color of the tabs border. (more soon...)

add the following section to your ~/.hyperterm.js

````
module.exports = {
  config: {
    ...
    hyperborder: {
      borderWidth: '4px',
      tabsBorderColor: 'darkgrey'
    }
    ...
  }
}
````

## download HyperTerm here
https://hyperterm.org/
