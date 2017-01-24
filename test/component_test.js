// React has to be in scope wherever we use JSX for our components
import React from 'react'
// shallow is a function that takes JSX and renders it returning a wrapper
// with utility methods that allow you to interact with the component.
import { shallow } from 'enzyme'
import TopComponent from '../src/components/top_component'
