import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SEO from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SEO />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
