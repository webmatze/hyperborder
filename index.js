const {remote} = require('electron');
const isElevated = require('is-elevated');
const {createAnimator} = require('./lib/animator');

let animator = null;

const randomColor = ()  => '#'+Math.floor(Math.random()*16777215).toString(16);
const getColor = (input) => input.toLowerCase() === 'random' ? randomColor() : input;
const getBorderColors = (colors = 'random') => {
  colors = [].concat(colors) // ensure colors is an array
             .map(getColor);  // before mapping

  // hack to repeat color for a single color border and still use 'linear-gradient'
  return colors.length < 2 ? colors.concat(colors[0]) : colors;
};

module.exports.getBorderColors = getBorderColors;

module.exports.onRendererWindow = async (window) => {
  const browserWindow = remote.getCurrentWindow();

  browserWindow.on('blur', () => window.document.documentElement.classList.add('blurred'));
  browserWindow.on('focus', () => window.document.documentElement.classList.remove('blurred'));

  if (!browserWindow.isFocused()) {
    window.document.documentElement.classList.add('blurred');
  }

  if (await isElevated()) {
    window.document.documentElement.classList.add('elevated');
  }

  const config = window.config.getConfig();  
  
  if (config.hyperBorder && config.hyperBorder.animate) {
    animator = createAnimator(window, browserWindow);
  }

};

module.exports.onUnload = async () => {
  if (animator) animator.unload();
};

module.exports.decorateConfig = (config) => {
  const defaultColors = ['#fc1da7', '#fba506'];

  const configObj = Object.assign({
    animate: false,
    borderWidth: '4px',
    borderColors: defaultColors,
    adminBorderColors: (config.hyperBorder && config.hyperBorder.borderColors) || defaultColors,
    blurredAdminColors: (config.hyperBorder && (config.hyperBorder.blurredColors || config.hyperBorder.adminBorderColors)) || defaultColors,
    blurredColors: defaultColors,
    borderAngle: '180deg'
  }, config.hyperBorder);

  return Object.assign({}, config, {
    css: `
      html {
        --border-width: ${configObj.borderWidth};
        --border-angle: ${configObj.animate ? '269deg' : configObj.borderAngle};
        --background-color: ${config.backgroundColor || '#000'};
        --border-color: ${config.borderColor};
        --border-colors: ${getBorderColors(configObj.borderColors).join(',')};
        --admin-colors: ${getBorderColors(configObj.adminBorderColors).join(',')};
        --blurred-colors: ${getBorderColors(configObj.blurredColors).join(',')};
        --blurred-admin-colors: ${getBorderColors(configObj.blurredAdminColors).join(',')};
      }
      html {
        height: 100%;
        background: linear-gradient(var(--border-angle), var(--border-colors));
        border-radius: var(--border-width);
        overflow: hidden;
      }
      html.elevated {
        background: linear-gradient(var(--border-angle), var(--admin-colors));
      }
      html.blurred {
        background: linear-gradient(var(--border-angle), var(--blurred-colors));
      }
      html.blurred.elevated {
        background: linear-gradient(var(--border-angle), var(--blurred-admin-colors));
      }
      body {
        position: absolute;
        top: var(--border-width);
        bottom: var(--border-width);
        left: var(--border-width);
        right: var(--border-width);
        border-radius: var(--border-width);
      }
      ${config.css || ''}
      #mount {
      }
      .hyper_main {
        background-color: var(--background-color);
        top: var(--border-width);
        bottom: var(--border-width);
        left: var(--border-width);
        right: var(--border-width);
        border-width: 0px;
      }
      .hyper_main .header_header {
        top: var(--border-width);
        left: var(--border-width);
        right: var(--border-width);
      }
      .hyper_main .tabs_list {
        border-bottom-color: var(--border-color);
        border-top-left-radius: var(--border-width);
        border-top-right-radius: var(--border-width);
      }
      .hyper_main .tab_tab:last-child {
        border-top-right-radius: var(--border-width);
      }
      .hyper_main .terms_terms {
        border-radius: 0 0 var(--border-width) var(--border-width);
        bottom: var(--border-width);
        left: var(--border-width);
        right: var(--border-width);
      }
      .hyper_main .terms_term {
        margin-top: var(--border-width);
      }
      .header_windowHeaderWithBorder {
        left: var(--border-width);
        width: calc(100% - var(--border-width) - var(--border-width));
      }
    `
  });
};
