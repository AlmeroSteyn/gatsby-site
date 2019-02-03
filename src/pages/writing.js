import React from 'react'
import { graphql } from 'gatsby'
import BodyClassName from 'react-body-classname'

import Layout from '../components/layout'
import SEO from '../components/seo'
import List from '../components/list'
import TalkEvents from '../components/talk-events'

const WritingPage = ({
        data: {
            allWordpressPost: { edges }
        }
}) => (
    <BodyClassName className="page">
        <Layout>
            <SEO title="Writing" keywords={['Marcy Sutton', 'posts', 'writing', 'blog', 'web developer']} />
            <div className="generic-wrap page-post-wrap">
                <section className="page-post-detail breathing-room">
                    <h1>Writing</h1>
                    <List 
                        className="list-writing no-background"
                        items={ edges }
                        listName="writing"
                        allItems="true" />
                </section>
                <aside className="page-post-aside breathing-room">
                    <TalkEvents />
                </aside>
            </div>
        </Layout>
    </BodyClassName>
)

export const pageQuery = graphql`
  query {
    allWordpressPost {
        edges {
          node {
            id
            slug
            title
            date(formatString: "MMMM DD, YYYY")
            excerpt
          }
        }
    }
  }
`

export default WritingPage