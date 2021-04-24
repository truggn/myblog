import NavbarMenu from '../component/layout/navbarMenu'
import BodyAbout from '../component/layout/bodyAbout'
import Loaded from '../component/layout/load'

const About = () => {
    return (
        <>
            <div id='colorlib-page'>
                <NavbarMenu />
                <BodyAbout />
            </div>
            {/* <Loaded /> */}
        </>
    )
}

export default About