exports.decorateConfig = (config) => {
  var hyperborderConfig = Object.assign({
    borderWidth: '4px',
    tabsBorderColor: 'rgba(255,255,255, .5)'
  }, config.hyperborder);
  return Object.assign({}, config, {
    borderColor: '',
    css: `
      ${config.css || ''}
      html, body {
        height: 100%;
      }
      #mount {
        background-image: linear-gradient(#fc1da7, #fba506);
        height: 100%;
        border-radius: ${hyperborderConfig.borderWidth};
      }
      .hyperterm_main {
        border-width: 0px;
      }
      .header_header {
        top: ${hyperborderConfig.borderWidth};
        left: ${hyperborderConfig.borderWidth};
        right: ${hyperborderConfig.borderWidth};
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      .tabs_list {
        border-bottom-color: ${hyperborderConfig.tabsBorderColor};
      }
      .tab_active .tab_text {
        border-left-color: ${hyperborderConfig.tabsBorderColor};
        border-right-color: ${hyperborderConfig.tabsBorderColor};
      }
      .terms_terms {
        border-radius: 0 0 4px 4px;
        background-color: black;
        bottom: ${hyperborderConfig.borderWidth};
        left: ${hyperborderConfig.borderWidth};
        right: ${hyperborderConfig.borderWidth};
      }
      .terms_term {
        margin-top: ${hyperborderConfig.borderWidth};
      }
    `
  });
}
