const {remote} = require('electron');
const isElevated = require('is-elevated');

const randomColor = ()  => '#'+Math.floor(Math.random()*16777215).toString(16);
const getColor = (input) => input.toLowerCase() === 'random' ? randomColor() : input;

const getBorderColors = (colors = 'random') => {
  colors = [].concat(colors) // ensure colors is an array
             .map(getColor);  // before mapping

  // hack to repeat color for a single color border and still use 'linear-gradient'
  return colors.length < 2 ? colors.concat(colors[0]) : colors;
};
module.exports.getBorderColors = getBorderColors;

module.exports.onRendererWindow = (window) => {
  const browserWindow = remote.getCurrentWindow();
  browserWindow.on('blur', () => window.document.documentElement.classList.add('blurred'));
  browserWindow.on('focus', () => window.document.documentElement.classList.remove('blurred'));

  if (!browserWindow.isFocused()) {
    window.document.documentElement.classList.add('blurred');
  }

  isElevated().then(elevated => {
    if (elevated) {
      window.document.documentElement.classList.add('elevated');
    }
  });
};

module.exports.decorateConfig = (config) => {
  const defaultColors = ['#fc1da7', '#fba506'];

  let configObj = Object.assign({
    animate: false,
    borderWidth: '4px',
    borderColors: defaultColors,
    adminBorderColors: (config.hyperBorder && config.hyperBorder.borderColors) || defaultColors,
    blurredAdminColors: (config.hyperBorder && (config.hyperBorder.blurredColors || config.hyperBorder.adminBorderColors)) || defaultColors,
    blurredColors: defaultColors,
    borderAngle: '180deg'
  }, config.hyperBorder);

  let colors = getBorderColors(configObj.borderColors).join(',');
  let adminColors = getBorderColors(configObj.adminBorderColors).join(',');
  let blurredColors = getBorderColors(configObj.blurredColors).join(',');
  let blurredAdminColors = getBorderColors(configObj.blurredAdminColors).join(',');
  let borderWidth = configObj.borderWidth;
  let animateStyles = `
    background-size: 800% 800%;
    animation: hyperBorderAnimation ${configObj.animate.duration || '16s'} ease infinite;
  `;

  return Object.assign({}, config, {
    css: `
      html {
        height: 100%;
        background: linear-gradient(${ configObj.animate ? '269deg' : configObj.borderAngle }, ${colors});
        ${ configObj.animate ? animateStyles : '' }
        border-radius: ${borderWidth};
        overflow: hidden;
      }
      html.elevated {
        background: linear-gradient(${ configObj.animate ? '269deg' : configObj.borderAngle }, ${adminColors});
      }
      html.blurred {
        background: linear-gradient(${ configObj.animate ? '269deg' : configObj.borderAngle }, ${blurredColors});
      }
      html.blurred.elevated {
        background: linear-gradient(${ configObj.animate ? '269deg' : configObj.borderAngle }, ${blurredAdminColors});
      }
      @keyframes hyperBorderAnimation {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
      }
      body {
        position: absolute;
        top: ${borderWidth};
        bottom: ${borderWidth};
        left: ${borderWidth};
        right: ${borderWidth};
        border-radius: ${borderWidth};
      }
      ${config.css || ''}
      #mount {
      }
      .hyper_main {
        background-color: ${config.backgroundColor || '#000'};
        top: ${borderWidth};
        bottom: ${borderWidth};
        left: ${borderWidth};
        right: ${borderWidth};
        border-width: 0px;
      }
      .hyper_main .header_header {
        top: ${borderWidth};
        left: ${borderWidth};
        right: ${borderWidth};
      }
      .hyper_main .tabs_list {
        border-bottom-color: ${config.borderColor};
        border-top-left-radius: ${borderWidth};
        border-top-right-radius: ${borderWidth};
      }
      .hyper_main .tab_tab:last-child {
        border-top-right-radius: ${borderWidth}
      }
      .hyper_main .terms_terms {
        border-radius: 0 0 ${borderWidth} ${borderWidth};
        bottom: ${borderWidth};
        left: ${borderWidth};
        right: ${borderWidth};
      }
      .hyper_main .terms_term {
        margin-top: ${borderWidth};
      }
    `
  });
};
