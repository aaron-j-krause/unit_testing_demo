/* eslint-disable no-undef */

// React has to be in scope wherever we use JSX for our components
import React from 'react' // eslint-disable-line
// shallow is a function that takes JSX and renders it returning a wrapper
// with utility methods that allow you to interact with the component.
import { shallow, mount } from 'enzyme'
import TopComponent from '../src/components/top_component'
import { expect } from 'chai'


describe('<TopComponent />', () => {
  describe('intitial render', () => {
    let topComponentWrapper

    beforeEach(() => {
      topComponentWrapper = shallow(<TopComponent />)
    })
    it('initial state should have correct values', () => {
      const expectedState = {
        message: 'Default',
        size: 20,
        className: 'classic',
        lengthError: false
      }

      expect(topComponentWrapper.state()).to.deep.equal(expectedState)
    })

    it('should have a form', () => {
      const form = topComponentWrapper.find('form')

      expect(form).to.have.length(1)
    })

    it('span should be invisible by default', () => {
      const span = topComponentWrapper.find('span')
      const spanDisplay = span.props().style.display

      expect(spanDisplay).to.equal('none')
    })

    it('should have two options in the select', () => {
      const options = topComponentWrapper.find('select option')

      expect(options.length).to.equal(2)
    })
  })

  describe('state change', () => {
    let topComponentWrapper

    beforeEach(() => {
      topComponentWrapper = shallow(<TopComponent />)
    })

    it('should change the display of the span on lengthError', () => {
      let errorSpanDisplay

      topComponentWrapper.setState({ lengthError: true })

      errorSpanDisplay = topComponentWrapper.find('span').props().style.display
      expect(errorSpanDisplay).to.equal('inline')
    })

    it('should change the class of the text input on lengthError', () => {
      let inputClass

      topComponentWrapper.setState({ lengthError: true })

      inputClass = topComponentWrapper.find('[name="message"]').props().className
      expect(inputClass).to.equal('error')
    })
  })

  describe('form onChange', () => {
    let topComponentWrapper

    beforeEach(() => {
      topComponentWrapper = shallow(<TopComponent />)
    })

    it('should update the message on change', () => {
      const value = Array(15).fill('x').join('')
      const mockEvent = {
        target: {
          name: 'message',
          value
        }
      }

      topComponentWrapper.find('form').simulate('change', mockEvent)
      expect(topComponentWrapper.find('h1').text()).to.equal(value)
    })

    it('should error on message longer than 16 characters', () => {
      const value = Array(17).fill('x').join('')
      const mockEvent = {
        target: {
          name: 'message',
          value
        }
      }

      topComponentWrapper.find('form').simulate('change', mockEvent)
      expect(topComponentWrapper.state().lengthError).to.equal(true)
    })

    it('should set message to only first 16 characters', () => {
      const value = Array(50).fill('x').join('')
      const mockEvent = {
        target: {
          name: 'message',
          value
        }
      }
      let messageText

      topComponentWrapper.find('form').simulate('change', mockEvent)
      messageText = topComponentWrapper.find('h1').text()
      expect(messageText).to.have.length(16)
    })

    it('slider should change font size', () => {
      const value = 30
      const mockEvent = {
        target: {
          name: 'size',
          value
        }
      }
      let fontSize

      topComponentWrapper.find('form').simulate('change', mockEvent)
      fontSize = topComponentWrapper.find('h1').props().style.fontSize

      expect(fontSize).to.equal(value)
    })

    it('h1 margin should change relative to font size', () => {
      const value = 30
      const mockEvent = {
        target: {
          name: 'size',
          value
        }
      }
      const computedValue = Math.floor(40 - (value / 2))
      let marginTop

      topComponentWrapper.find('form').simulate('change', mockEvent)
      marginTop = topComponentWrapper.find('h1').props().style.marginTop

      expect(marginTop).to.equal(computedValue)
    })

    it('h1 class should change based on select', () => {
      const value = 'modern'
      const mockEvent = {
        target: {
          name: 'className',
          value
        }
      }
      let className

      topComponentWrapper.find('form').simulate('change', mockEvent)
      className = topComponentWrapper.find('h1').props().className

      expect(className).to.equal(value)
    })
  })
})
