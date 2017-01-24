import React from 'react'
import ReactDOM from 'react-dom'

import './style.css'

const reactNode = document.createElement('div')
document.body.insertBefore(reactNode, document.body.firstChild)

class TopComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: 'Default',
      size: 20,
      className: 'classic',
      lengthError: false
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    let { name, value } = e.target

    if (name === 'message' && value.length > 16) {
      e.target.value = value.slice(0, 16)
      return this.setState({
        lengthError: true,
        message: value.slice(0, 16)
      })
    }

    value = name === 'size' ? Number(value) : value
    this.setState({ [name]: value, lengthError: false })
  }

  render() {
    const { message, size, className, lengthError } = this.state
    const marginTop = Math.floor(40 - (size / 2))
    const options = ['classic', 'modern']

    return (
      <div className="editor">
        <form onChange={this.handleChange}>
          <span style={{ display: `${lengthError ? 'inline' : 'none'}`}}>
            Max 16 Characters
          </span>
          <input className={lengthError && 'error'} type="text" name="message" autoComplete="off" />
          <input type="range" name="size" max="40" min="10" />
          <select name="className" >
            {options.map((c, i) => (<option key={i} value={c}>{c}</option>))}
          </select>
        </form>
        <h1 className={className} style={{ fontSize: size, marginTop }}>
          {message}
        </h1>
      </div>
    )
  }
}

ReactDOM.render(<TopComponent />, reactNode)
