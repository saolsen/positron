import PropTypes from 'prop-types'
import React from 'react'
import { Col, Row } from 'react-styled-flexboxgrid'
import ImageUpload from 'client/apps/edit/components/admin/components/image_upload.coffee'
import Paragraph from 'client/components/rich_text2/components/paragraph.coffee'

export class SectionAdmin extends React.Component {
  render () {
    const { section, onChange } = this.props

    return (
      <div className='admin-form-container section'>
        <Row>
          <Col lg={8}>
            <div className='field-group'>
              <label>Featuring</label>
              <input
                className='bordered-input'
                placeholder='Start typing...'
                defaultValue={section.featuring || ''}
                onChange={(e) => onChange('video_url', e.target.value)}
              />
            </div>

            <div className='field-group'>
              <label>About the Film</label>
              <div className='bordered-input'>
                <Paragraph
                  linked
                  onChange={(html) => onChange('about', html)} />
              </div>
            </div>

            <div className='field-group'>
              <label>Release Date</label>
              <input
                className='bordered-input'
                type='date'
                defaultValue={section.release_date || null}
                onChange={(e) => onChange('release_date', e.target.value)}
              />
            </div>
          </Col>

          <Col lg={4}>
            <div className='field-group'>
              <label>Video Embed Url</label>
              <input
                className='bordered-input'
                placeholder='http://youtube.com/xxx'
                defaultValue={section.video_url || ''}
                onChange={(e) => onChange('video_url', e.target.value)}
              />
            </div>
            <div className='field-group'>
              <label>Video Cover Image</label>
              <ImageUpload
                name='cover_image_url'
                src={section.cover_image_url || ''}
                onChange={(key, value) => this.onChange(key, value)} />
            </div>
          </Col>

        </Row>
      </div>
    )
  }
}

SectionAdmin.propTypes = {
  section: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}
