import Footer from '../layout/footer'
import HeaderBlogs from './blog/headerBlogs'
import SectionBlog from './blog/sectionBlogs'

const bodyBlogs = () => {
    return (<>
        <div id="colorlib-main">
            <HeaderBlogs />
            <SectionBlog />
            <Footer />
        </div>
    </>)
}
export default bodyBlogs