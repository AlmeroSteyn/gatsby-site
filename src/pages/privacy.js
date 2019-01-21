import React from 'react'
import { Link, graphql } from 'gatsby'
import BodyClassName from 'react-body-classname'

import Layout from '../components/layout'
import SEO from '../components/seo'

const PrivacyPage = ({ data }) => (
    <BodyClassName className="generic">
        <Layout>
            <SEO title="Privacy Policy" keywords={['Marcy Sutton', 'privacy policy', 'web developer']} />
            <section className="generic-wrap">
                <h1>Privacy Policy</h1>
                {
                    data.allWordpressPage.edges.map((pages) => {
                        if ( pages.node.slug === 'privacy-policy' ) {
                            return <div
                                key={pages.node.id}
                                dangerouslySetInnerHTML={{ __html: pages.node.content }}
                            ></div>
                        }
                        return ''
                    })
                }
                <Link to="/">Go home</Link>
            </section>
        </Layout>
    </BodyClassName>
)

export const query = graphql`
  query {
    allWordpressPage {
        edges {
          node {
            id
            slug
            content
          }
        }
      }
  }
`

export default PrivacyPage