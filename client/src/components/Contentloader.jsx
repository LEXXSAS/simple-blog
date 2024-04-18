// @ts-nocheck
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={320}
    height={521}
    viewBox="0 0 320 521"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="320" height="480" /> 
    <rect x="5" y="494" rx="0" ry="0" width="174" height="28" />
  </ContentLoader>
)

export default MyLoader
