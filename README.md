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
### Set Border Colors And Width
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

### Set Border Colors To Random Colors

In addition, you can set any color value to `'random'` (string value):

```javascript
module.exports = {
  config: {
    ...
      hyperBorder: {
        borderColors: ['random','random'],
        borderWidth: '8px'
      }
    ...
  }
}
```

Then every newly opened HyperTerm window will have a different colored border.

### Animate Border Colors
You like some animations? Than try this:

```javascript
module.exports = {
  config: {
    ...
    hyperBorder: {
      animate: true,
      ...
    }
    ...
  }
}
```

## download HyperTerm here
https://hyperterm.org/
