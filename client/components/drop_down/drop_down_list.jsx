import PropTypes from 'prop-types'
import React from 'react'
import { without } from 'lodash'
import { DropDownItem } from './drop_down_item'

export class DropDownList extends React.Component {
  static propTypes = {
    activeSection: PropTypes.number, // open 1 by default
    activeSections: PropTypes.array, // open many by default
    children: PropTypes.any.isRequired,
    openMany: PropTypes.bool, // open more than one panel simultaneously
    sections: PropTypes.array.isRequired // array of objects with title or name
  }

  constructor (props) {
    super(props)
    const { activeSection, activeSections, openMany } = props

    this.state = {
      activeSections: openMany && activeSections ? activeSections : [],
      activeSection: activeSection || null
    }
  }

  setActiveSections = (index) => {
    let activeSections
    const sections = this.state.activeSections

    if (sections.includes(index)) {
      activeSections = without(sections, index)
    } else {
      activeSections.push(index)
    }
    this.setState({ activeSections })
  }

  setActiveSection = (index) => {
    const activeSection = index === this.state.activeSection ? null : index
    this.setState({ activeSection })
  }

  isActive = (index) => {
    const { openMany } = this.props
    const { activeSection, activeSections } = this.state

    if (openMany) {
      return activeSections.includes(index)
    } else {
      return index === activeSection
    }
  }

  render () {
    const { children, openMany, sections } = this.props
    const onOpen = openMany ? this.setActiveSections : this.setActiveSection

    return (
      <div className='DropDownList'>
        {children.map((child, i) =>
          <DropDownItem
            key={i}
            title={sections[i].title || sections[i].name}
            active={this.isActive(i)}
            index={i}
            onClick={() => onOpen(i)}
          >
            {child}
          </DropDownItem>
        )}
      </div>
    )
  }
}
