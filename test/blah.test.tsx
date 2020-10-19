import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Seo } from '../src';

describe('it', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Seo />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
