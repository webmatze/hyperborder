exports.decorateConfig = (config) => {
  
  var borderWidth = config.hyperBorderWidth;
  return Object.assign({}, config, {
    css: `
      html {
        height: 100%;
        background-image: linear-gradient(${config.hyperBorderColors[0]} , ${config.hyperBorderColors[1]});
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
