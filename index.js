module.exports.decorateConfig = (config) => {
  var configObj = config.hyperBorder;
  var colors = (configObj.borderColors) ? `${configObj.borderColors[0]} , ${configObj.borderColors[1]}`
 : "#fba506, #fc1da7";
  var borderWidth = configObj.borderWidth;
  return Object.assign({}, config, {
    css: `
      html {
        height: 100%;
        background-image: linear-gradient(${colors});
        border-radius: ${borderWidth};
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
      .hyperterm_main {
        top: ${borderWidth};
        bottom: ${borderWidth};
        left: ${borderWidth};
        right: ${borderWidth};
        border-width: 0px;
      }
      .hyperterm_main .header_header {
        top: ${borderWidth};
        left: ${borderWidth};
        right: ${borderWidth};
      }
      .hyperterm_main .tabs_list {
        border-bottom-color: ${config.borderColor};
        border-top-left-radius: ${borderWidth};
        border-top-right-radius: ${borderWidth};
      }
      .hyperterm_main .tab_tab:last-child {
        border-top-right-radius: ${borderWidth}
      }
      .hyperterm_main .terms_terms {
        border-radius: 0 0 ${borderWidth} ${borderWidth};
        bottom: ${borderWidth};
        left: ${borderWidth};
        right: ${borderWidth};
      }
      .hyperterm_main .terms_term {
        margin-top: ${borderWidth};
      }
    `
  });
}
