
const PostBlogs = () => {
    return (<>
        <div className="col-md-12">
            <div className="blog-entry ftco-animate d-md-flex">
                <a href="single.html" className="img img-2" style={{ backgroundImage: 'url(images/image_1.jpg)' }} />
                <div className="text text-2 p-4">
                    <h3 className="mb-2"><a href="single.html">The Photography Technique</a></h3>
                    <div className="meta-wrap">
                        <p className="meta">
                            <span>Dec 14, 2018</span>
                            <span><a href="single.html">Photography</a></span>
                            <span>5 Comment</span>
                        </p>
                    </div>
                    <p className="mb-4">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                    <p><a href="#" className="btn-custom">Read More <span className="ion-ios-arrow-forward" /></a></p>
                </div>
            </div>
        </div>
    </>)
}
export default PostBlogs