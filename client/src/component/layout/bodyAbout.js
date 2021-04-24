import Footer from '../layout/footer'
import ImageMe from '../layout/about/imageMe'
import StatisticMe from './about/statisticMe'
import FollowInstangram from './home/follow'
import About from './home/About'

const BodyAbout = () => {
    return (
        <>
            <div id="colorlib-main">

                <section className="ftco-section-no-padding bg-light">

                    <div className="hero-wrap">
                        <div className="overlay" />
                        <div className="d-flex">
                            <ImageMe />
                            <div className="author-info text p-4 p-md-5 mt-5 mb-5">
                                <About />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ftco-section ftco-counter img" id="section-counter" style={{ backgroundImage: 'url(images/bg_1.jpg)' }}>
                    <StatisticMe />
                </section>
                <section className="ftco-section instagram">
                    <FollowInstangram />
                </section>
                <Footer />
            </div>
        </>
    )
}
export default BodyAbout