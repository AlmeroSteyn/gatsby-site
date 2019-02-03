import PropTypes from 'prop-types'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'gatsby'

import MoreLink from './more-link';

const MediaGrid = ({ className, subtitle, items, itemLabel, directory, minItems = 8 }) => (
    <div className={`media-grid breathing-room ${className}`}>
      <h2 className="subhead">
        {subtitle}
      </h2>
      <ul>{ items.map((items) => {
        return <li key={ items.node.id }>
          { ReactHtmlParser(items.node.excerpt) }
          <Link to={`${ directory }/${ items.node.slug }`}>{
              ReactHtmlParser(items.node.title)
            }</Link>
        </li>
      }) 
    }</ul>
    { items.length >= minItems ?
      <MoreLink itemLabel={itemLabel} />
    : null }
    </div>
)

MediaGrid.propTypes = {
  items: PropTypes.array,
}

MediaGrid.defaultProps = {
  items: [],
}

export default MediaGrid
