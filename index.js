const randomColor = ()  => '#'+Math.floor(Math.random()*16777215).toString(16);
const getColor = (input) => input.toLowerCase() === 'random' ? randomColor() : input;

const getBorderColors = (colors = 'random') => {
  colors = [].concat(colors) // ensure colors is an array
             .map(getColor);  // before mapping

  // hack to repeat color for a single color border and still use 'linear-gradient'
  return colors.length < 2 ? colors.concat(colors[0]) : colors;
}

module.exports.decorateConfig = (config) => {
  var configObj = Object.assign({
    animate: false,
    borderWidth: '4px',
    borderColors: ['#fc1da7', '#fba506'],
    borderAngle: '180deg'
  }, config.hyperBorder);

  var colors = getBorderColors(configObj.borderColors).join(',');
  var borderWidth = configObj.borderWidth;
  var animateStyles = `
    background-size: 800% 800%;
    animation: AnimationName 16s ease infinite;
  `
  return Object.assign({}, config, {
    css: `
      html {
        height: 100%;
        background: linear-gradient(${ configObj.animate ? '269deg' : configObj.borderAngle }, ${colors});
        ${ configObj.animate ? animateStyles : '' }
        border-radius: ${borderWidth};
        overflow: hidden;
      }
      @keyframes AnimationName {
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
}
