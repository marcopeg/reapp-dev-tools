
import React from 'react';
import ReactDOM from 'react-dom';

import { StyleguideError } from '../components/StyleguideError';

export function renderStyleguideInfo(targetEl, root, error, appName) {
    ReactDOM.render((
        <StyleguideError root={root} error={error} title={appName} />
    ), targetEl);
}
