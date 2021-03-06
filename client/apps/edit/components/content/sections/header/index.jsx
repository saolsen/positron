import HeaderControls from './controls/index.jsx'
import FileInput from '/client/components/file_input/index.jsx'
import Paragraph from '/client/components/rich_text/components/paragraph.coffee'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Header, IconRemove } from '@artsy/reaction-force/dist/Components/Publishing'
import { PlainText } from '/client/components/rich_text/components/plain_text.jsx'

export default class SectionHeader extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    channel: PropTypes.object.isRequired
  }

  state = {
    progress: null
  }

  onChange = (key, value) => {
    this.props.article.set(key, value)
  }

  onChangeHero = (key, value) => {
    const heroSection = this.props.article.heroSection
    heroSection.set(key, value)
    this.onChange('hero_section', heroSection.attributes)
  }

  onProgress = (progress) => {
    this.setState({ progress })
  }

  renderTitle (article) {
    return (
      <PlainText
        content={article.attributes.title}
        onChange={this.onChange}
        name='title'
        placeholder='Title' />
    )
  }

  renderFeatureDeck (article) {
    return (
      <PlainText
        content={article.heroSection.get('deck')}
        onChange={this.onChangeHero}
        name='deck'
        placeholder='Deck (optional)' />
    )
  }

  renderFileUpload (prompt) {
    return (
      <FileInput
        type='simple'
        onUpload={(image) => this.onChangeHero('url', image)}
        prompt={prompt}
        video
        onProgress={this.onProgress} />
    )
  }

  renderImage (article) {
    const isFullscreen = article.heroSection.get('type') === 'fullscreen'
    const hasUrl = article.heroSection.get('url') && article.heroSection.get('url').length
    const prompt = isFullscreen ? 'Add Background' : 'Add Image or Video'

    if (isFullscreen && hasUrl) {
      return (
        <div className='edit-header__image-container has-image'>
          {this.renderFileUpload('Change Background')}
        </div>
      )
    } else if (hasUrl) {
      return (
        <div
          className='edit-header__remove'
          onClick={() => this.onChangeHero('url', '')}>
          <IconRemove />
        </div>
      )
    } else {
      return (
        <div className='edit-header__image-container' data-has-image={false}>
          {this.renderFileUpload(prompt)}
          {this.state.progress && this.renderProgress()}
        </div>
      )
    }
  }

  renderProgress () {
    return (
      <div className='upload-progress-container'>
        <div
          className='upload-progress'
          style={{width: (this.state.progress * 100) + '%'}} />
      </div>
    )
  }

  renderLeadParagraph (article) {
    return (
      <Paragraph
        html={article.get('lead_paragraph')}
        onChange={(input) => this.onChange('lead_paragraph', input)}
        placeholder='Lead Paragraph (optional)'
        type='lead_paragraph'
        linked={false}
        stripLinebreaks
        layout={article.get('layout')}
      />
    )
  }

  render () {
    const { article, channel } = this.props
    const isFeature = article.get('layout') === 'feature'
    const isClassic = article.get('layout') === 'classic'
    let headerClass = ''

    if (isFeature) {
      headerClass = ' ' + article.heroSection.get('type') || 'text'
    }

    if (isClassic) {
      return (
        <div className='edit-header'>
          <Header article={article.attributes}>
            {this.renderTitle(article)}
            {this.renderLeadParagraph(article)}
          </Header>
        </div>
      )
    } else {
      return (
        <div className={'edit-header' + headerClass}>
          {isFeature &&
            <HeaderControls
              onChange={this.onChangeHero}
              article={article}
              channel={channel}
              hero={article.heroSection.attributes}
            />
          }

          <Header article={article.attributes}>
            <span>Missing Vertical</span>
            {this.renderTitle(article)}
            {isFeature && this.renderFeatureDeck(article)}
            {isFeature && this.renderImage(article)}
          </Header>
        </div>
      )
    }
  }
}
