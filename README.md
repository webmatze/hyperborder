# hyperborder - extension for HyperTerm
adds a gradient border to the hyperterm editor

![](https://cldup.com/pL94ODfQNP.png)

## Installation
add it to plugins in your `~/.hyperterm.js` configuration

````
module.exports = {
  ...
  plugins: ['hyperborder']
  ...
}
````
then just restart your HyperTerm app or go to the menu 'Plugins / Update All Now'

## Configuration
It is now possible to change the gradient colors and the border width.

Just add the following to your `.hyperterm.js`:

```javascript
module.exports = {
  config: {
    ...
      hyperBorder: {
        borderColors: ['#fc1da7', '#fba506'],
        borderWidth: '8px'
      }
    ...
  }
}
```

## download HyperTerm here
https://hyperterm.org/
