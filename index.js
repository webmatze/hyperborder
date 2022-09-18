const isElevated = require('is-elevated');
const {getBorderColors} = require('./lib/colorhelpers');

module.exports.onRendererWindow = async window => {
  const htmlElement = window.document.documentElement;

  window.addEventListener('blur', () => htmlElement.classList.add('blurred'));
  window.addEventListener('focus', () => htmlElement.classList.remove('blurred'));

  if (!window.document.hasFocus()) {
    htmlElement.classList.add('blurred');
  }

  if (await isElevated()) {
    htmlElement.classList.add('elevated');
  }
};

module.exports.reduceUI = (state, {type, config}) => {
  const defaultColors = ['#fc1da7', '#fba506'];
  switch (type) {
    case 'CONFIG_LOAD':
    case 'CONFIG_RELOAD':
      config.hyperBorder = {animate: true, ...config.hyperBorder};
      return state.set('hyperBorder', {animate: false,
        animateDuration: config.hyperBorder.animate.duration || '10s',
        backgroundColor: config.backgroundColor,
        borderWidth: '8px',
        borderRadiusInner: '8px',
        borderRadiusOuter: '16px',
        borderColors: defaultColors,
        adminBorderColors: config.hyperBorder.borderColors || defaultColors,
        blurredAdminColors: (config.hyperBorder.blurredColors || config.hyperBorder.adminBorderColors) || defaultColors,
        blurredColors: config.hyperBorder.borderColors || defaultColors, ...config.hyperBorder});
    default:
      return state;
  }
};

module.exports.mapHyperState = ({ui: {hyperBorder}}, map) => ({...map, hyperBorder: {...hyperBorder}});

module.exports.decorateHyper = (Hyper, {React}) => class extends React.Component {
  render() {
    return React.createElement('div', {
      id: 'hyperborder'
    }, [
      React.createElement(Hyper, this.props),
      React.createElement('svg', {
        id: 'hyperborder-template',
        width: 0,
        height: 0,
      }, [
        React.createElement('linearGradient', {
          id: 'hyperborder-gradient',
          gradientTransform: 'rotate(90)',
        }, [
          React.createElement('stop', {offset: '0%'}),
          React.createElement('stop', {offset: '100%'}),
          this.props.hyperBorder.animate ? React.createElement('animateTransform', {
            attributeName: 'gradientTransform',
            type: 'rotate',
            from: '0 .5 .5',
            to: '360 .5 .5',
            dur: this.props.hyperBorder.animateDuration,
            repeatCount: 'indefinite',
          }) : null,
        ]),
        React.createElement('symbol', {
          id: 'hyperborder-border',
          overflow: 'visible',
        }, [
          React.createElement('rect', {
            width: '100%',
            height: '100%',
            rx: this.props.hyperBorder.borderRadiusOuter,
            ry: this.props.hyperBorder.borderRadiusOuter,
          }),
        ]),
      ]),
      React.createElement('svg', {id: 'hyperborder-svg'}, [
        React.createElement('use', {href: '#hyperborder-border'}),
      ]),
      React.createElement('style', {}, `
        #hyperborder {
          --border-width: ${this.props.hyperBorder.borderWidth};
          --border-radius-inner: ${this.props.hyperBorder.borderRadiusInner};
          --border-radius-outer: ${this.props.hyperBorder.borderRadiusOuter};
          --background-color: ${this.props.hyperBorder.backgroundColor || '#000'};
          --border-colors-one: ${getBorderColors(this.props.hyperBorder.borderColors)[0]};
          --border-colors-two: ${getBorderColors(this.props.hyperBorder.borderColors)[1]};
          --admin-colors-one: ${getBorderColors(this.props.hyperBorder.adminBorderColors)[0]};
          --admin-colors-two: ${getBorderColors(this.props.hyperBorder.adminBorderColors)[1]};
          --blurred-colors-one: ${getBorderColors(this.props.hyperBorder.blurredColors)[0]};
          --blurred-colors-two: ${getBorderColors(this.props.hyperBorder.blurredColors)[1]};
          --blurred-admin-colors-one: ${getBorderColors(this.props.hyperBorder.blurredAdminColors)[0]};
          --blurred-admin-colors-two: ${getBorderColors(this.props.hyperBorder.blurredAdminColors)[1]};
          --stop-one-color: var(--border-colors-one, #fc1da7);
          --stop-two-color: var(--border-colors-two, #fba506);
          
          border-radius: var(--border-radius-outer);
          top: 0; 
          bottom: 0;
          left: 0;
          right: 0;
          position: fixed;
        }
        #hyperborder-svg {
          z-index: 99;
          width: 100%;
          height: 100%;
        }
        #hyperborder-template {
          position: absolute;
          width: 0;
          height: 0;
        }
        #hyperborder-border {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          fill: none;
          stroke: url(#hyperborder-gradient);
          stroke-width: var(--border-width);
        }
        #hyperborder-gradient stop:nth-child(1) {
          stop-color: var(--stop-one-color);
        }
        #hyperborder-gradient stop:nth-child(2) {
          stop-color: var(--stop-two-color);
        }
        #hyperborder .hyper_main {
          background-color: var(--background-color);
          top: calc(var(--border-width) / 2);
          bottom: calc(var(--border-width) / 2);
          left: calc(var(--border-width) / 2);
          right: calc(var(--border-width) / 2);
          border-radius: var(--border-radius-inner);
        }
        #hyperborder .hyper_main .header_header {
          top: var(--border-width);
          left: var(--border-width);
          right: var(--border-width);
        }
        #hyperborder .hyper_main .header_windowHeader {
          top: var(--border-width);
          left: var(--border-width);
          right: var(--border-width);
          width: calc(100% - var(--border-width) - var(--border-width));
        }
        #hyperborder .hyper_main .header_hamburgerMenuLeft {
          top: var(--border-width);
          left: var(--border-width);
        }
        html.blurred #hyperborder {
          --stop-one-color: var(--blurred-colors-one);
          --stop-two-color: var(--blurred-colors-two);
        }
        html.elevated #hyperborder {
          --stop-one-color: var(--admin-colors-one);
          --stop-two-color: var(--admin-colors-two);
        }
        html.blurred.elevated #hyperborder {
          --stop-one-color: var(--blurred-admin-colors-one);
          --stop-two-color: var(--blurred-admin-colors-two);
        }
        `)
    ]);
  }
};
