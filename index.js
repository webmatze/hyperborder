exports.decorateConfig = (config) => {
  var borderWidth = '4px';
  return Object.assign({}, config, {
    css: `
      html {
        height: 100%;
        background-image: linear-gradient(#fc1da7, #fba506);
        border-radius: ${borderWidth};
      }
      body {
        position: absolute;
        top: ${borderWidth};
        bottom: ${borderWidth};
        left: ${borderWidth};
        right: ${borderWidth};
        border-radius: ${borderWidth}
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
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      .hyperterm_main .tabs_list {
        border-bottom-color: ${config.borderColor};
      }
      .hyperterm_main .terms_terms {
        border-radius: 0 0 4px 4px;
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
