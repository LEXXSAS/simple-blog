import React from "react"
import ContentLoader from "react-content-loader"

const SinglePageLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={650}
    height={1080}
    viewBox="0 0 610 1080"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="2" ry="2" width="100%" height="341" />
    <circle cx="25" cy="400" r="25" /> 
    <rect x="60" y="375" rx="0" ry="0" width="190" height="50" /> 
    <rect x="0" y="440" rx="0" ry="0" width="279" height="40" /> 
  </ContentLoader>
)

export default SinglePageLoader
