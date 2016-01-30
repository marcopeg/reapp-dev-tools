
import React from 'react';
import ReactDOM from 'react-dom';

import { Styleguide } from '../components/Styleguide';
import { StyleguideTitle } from '../components/StyleguideTitle';
import { StyleguideToc } from '../components/StyleguideToc';
import { StyleguidePage } from '../components/StyleguidePage';

export function renderMultiComponents(targetEl, root, components, sources, appName) {
    try {
        var GuideComponent;
        var pages = components.map(component => {
            GuideComponent = component.def;
            return (
                <StyleguidePage
                    name={component.name}
                    key={component.name}
                    component={GuideComponent} />
            );
        });

        ReactDOM.render((
            <Styleguide root={root} sources={sources}>
                <StyleguideTitle title={appName} />
                <StyleguideToc components={components} />
                {pages}
            </Styleguide>
        ), targetEl);

        return true;

    } catch (e) {
        return e;
    }
}
