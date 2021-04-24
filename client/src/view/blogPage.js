import NavBarMenu from '../component/layout/navbarMenu'
import BodyBlogPage from '../component/layout/bodyBlogs'
import Loaded from '../component/layout/load'

const BlogPages = () => {
    return (<>
        <div id='colorlib-page'>
            <NavBarMenu />
            <BodyBlogPage />
        </div>
        {/* <Loaded /> */}
    </>)
}
export default BlogPages