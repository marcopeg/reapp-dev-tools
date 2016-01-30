
import React from 'react';
import ReactDOM from 'react-dom';

import { Styleguide } from '../components/Styleguide';
import { StyleguideTitle } from '../components/StyleguideTitle';
import { StyleguidePage } from '../components/StyleguidePage';

export function renderSingleComponent(targetEl, root, component, sources, appName) {
    try {
        var GuideComponent = component.def;
        ReactDOM.render((
            <Styleguide root={root} sources={sources}>
                <StyleguideTitle title={appName} />
                <StyleguidePage
                    name={component.name}
                    component={GuideComponent} />
            </Styleguide>
        ), targetEl);
    } catch (e) {
        return e;
    }
    return true;
}
