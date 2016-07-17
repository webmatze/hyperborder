exports.decorateConfig = (config) => {
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
              border-radius: 4px;
            }
            .hyperterm_main {
              border-width: 0px;
            }
            .hyperterm_main .header_header {
              top: 4px;
              left: 4px;
              right: 4px;
              border-top-left-radius: 4px;
              border-top-right-radius: 4px;
            }
            .hyperterm_main .terms_terms {
              border-radius: 0 0 4px 4px;
              background-color: black;
              bottom: 4px;
              left: 4px;
              right: 4px;
            }
            .hyperterm_main .terms_term {
              margin-top: 4px;
            }
            /*
            .hyperterm_main {
              border-width: 4px;
              border-top-color: #fc1da7;
              border-bottom-color: #fba506;
              border-radius: 10px;
            }
            .hyperterm_main:before, .hyperterm_main:after {
              content: "";
              position: absolute;
              background-image: linear-gradient(#fc1da7, #fba506);
              top: -14px;
              bottom: -14px;
              width: 4px;
            }
            .hyperterm_main:before {
                left: -4px;
            }
            .hyperterm_main:after {
                right: -4px;
            }
            */
          `
        });
}
