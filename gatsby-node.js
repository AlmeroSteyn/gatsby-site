/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

// Will create pages for talks (route : /talk/{slug})
// Will create pages for posts (route : /{slug})
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(
      `
        { 
          talks: allMarkdownRemark (
            filter: {fileAbsolutePath: {regex: "/talk-videos/"}}
          ){
            edges {
              node {
                id
                frontmatter {
                  title
                  path
                }
                html
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const talkTemplate = path.resolve("./src/templates/talk.js")

        _.each(result.data.talks.edges, edge => {
          createPage({
            path: `${edge.node.frontmatter.path}`,
            component: slash(talkTemplate),
            context: {
              pathname: 'talk',
              id: edge.node.id,
            },
          })
        })
      })
      .then(() => {
        graphql(
          `
            {
              posts: allMarkdownRemark (
                filter: {fileAbsolutePath: {regex: "/posts/"}}
              ){
                edges {
                  node {
                    id
                    frontmatter {
                      title
                      path
                    }
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }
          const postTemplate = path.resolve("./src/templates/post.js")
          _.each(result.data.posts.edges, edge => {
            createPage({
              path: `${edge.node.frontmatter.path}`,
              component: slash(postTemplate),
              context: {
                pathname: 'post',
                id: edge.node.id,
              },
            })
          })
          resolve()
        })
      })
  })
}
