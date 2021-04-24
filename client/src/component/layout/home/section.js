
import About from '../../layout/home/About'
import SlideImage from '../../layout/home/slideImage'
import FollowInstangram from '../../layout/home/follow'
const Section = () => {
    return (
        <>
            <section className="ftco-section-no-padding bg-light">
                <div className="hero-wrap">
                    <div className="overlay" />
                    <div className="d-flex align-items-center js-fullheight">
                        <div className="author-image text img d-flex">
                            <SlideImage />
                        </div>
                        <div className="author-info text p-3 p-md-5">
                            <About />
                        </div>
                    </div>
                </div>
            </section>
            <section className="ftco-section instagram">
                <FollowInstangram />
            </section>
        </>
    )
}
export default Section