# hyperborder - extension for Hyper
adds a gradient border to the `Hyper` terminal

![](https://cldup.com/pL94ODfQNP.png)

## Installation
add it to plugins in your `~/.hyper.js` configuration

````
module.exports = {
  ...
  plugins: ['hyperborder']
  ...
}
````
then just restart `Hyper` app or go to the menu 'Plugins / Update All Now'

## Configuration
### Set Border Colors And Width
It is now possible to change the gradient colors and the border width.

Just add the following to your `.hyper.js`:

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

Then every newly opened `Hyper` terminal window will have a different colored border.

### Animate Border Colors
You like some animations? Then try this:

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

### Angled Gradients
Because we use CSS3's `linear-gradient`, we're able to specify angles at which to create the radius. Set your own angle like this:

```javascript
module.exports = {
  config: {
    ...
    hyperBorder: {
      borderAngle: '180deg',
      ...
    }
    ...
  }
}
```

## Download Hyper here
https://hyper.is/
