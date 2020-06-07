import React from 'react';
import { mount } from 'enzyme';

import App from './App';
import lang from '../../libs/lang';

describe('App', () => {
    it('should render the component', () => {
        const wrapper = mount(<App />);

        expect(wrapper.find(App).exists()).toBeTruthy();
    });

    it('should render the correct title', () => {
        const wrapper = mount(<App />);

        expect(wrapper.find('div').text()).toBe(lang.title);
    });
});
