const {remote} = require('electron');
const isElevated = require('is-elevated');
const {createAnimator} = require('./lib/animator');
const {getBorderColors} = require('./lib/colorhelpers');

let unloadAnimator = null;

module.exports.onRendererWindow = async window => {
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
    unloadAnimator = createAnimator(window, browserWindow);
  }
};

module.exports.onUnload = async () => {
  if (unloadAnimator) {
    unloadAnimator();
  }
};

module.exports.decorateConfig = config => {
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
      ${config.css || ''}
      {
        --border-width: ${configObj.borderWidth};
        --border-angle: ${configObj.animate ? '269deg' : configObj.borderAngle};
        --background-color: ${config.backgroundColor || '#000'};
        --border-color: ${config.borderColor};
        --border-colors: ${getBorderColors(configObj.borderColors).join(',')};
        --admin-colors: ${getBorderColors(configObj.adminBorderColors).join(',')};
        --blurred-colors: ${getBorderColors(configObj.blurredColors).join(',')};
        --blurred-admin-colors: ${getBorderColors(configObj.blurredAdminColors).join(',')};
        background: linear-gradient(var(--border-angle), var(--border-colors));
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: fixed;
        border-radius: var(--border-width);
      }
      .hyper_main {
        background-color: var(--background-color);
        top: var(--border-width);
        bottom: var(--border-width);
        left: var(--border-width);
        right: var(--border-width);
        border-radius: var(--border-width);
      }
      .hyper_main .header_header {
        top: var(--border-width);
        left: var(--border-width);
        right: var(--border-width);
      }
      .hyper_main .header_windowHeader {
        top: var(--border-width);
        left: var(--border-width);
        right: var(--border-width);
        width: calc(100% - var(--border-width) - var(--border-width)); 
      }
      .hyper_main .header_hamburgerMenuLeft {
        top: var(--border-width);
        left: var(--border-width);        
      }
      // blurred is not working for now
      /*
      .elevated {
        background: linear-gradient(var(--border-angle), var(--admin-colors));
      }
      .blurred {
        background: linear-gradient(var(--border-angle), var(--blurred-colors));
      }
      .blurred.elevated {
        background: linear-gradient(var(--border-angle), var(--blurred-admin-colors));
      }
      */
    `
  });
};
