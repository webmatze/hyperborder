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
The following settings can be configured by adding a `hyperBorder` section in your `.hyper.js` `config` section:

| Setting              | Type                 | Description                                            |
|----------------------|----------------------|--------------------------------------------------------|
| `borderWidth`        | `string`             | CSS string for how thick the borders should be         |
| `borderColors`       | `string`, `string[]` | The color(s) for the border                            |
| `adminBorderColors`  | `string`, `string[]` | The color(s) for the border for an admin/elevated window. This follows the precedence  of `adminBorderColors` > `borderColors` > defaultColors                                    |
| `blurredColors`      | `string`, `string[]` | The color(s) of the borders when the window isn't active |
| `blurredAdminColors` | `string`, `string[]` | The color(s) of the borders when the admin/elevated window isn't active. This follows the precedence of `blurredAdminColors` > `blurredColors` > `adminBorderColors` > `borderColors` > defaultColors |

### EXAMPLE: Set Border Colors And Width

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

### EXAMPLE: Set Border Colors To Random Colors

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

To change the speed of animation, specify an object with a `duration` property:

```javascript
module.exports = {
  config: {
    ...
    hyperBorder: {
      animate: {
        duration: '1s';   // default is 16s
      },
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
