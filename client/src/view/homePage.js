import NavbarMenu from '../../src/component/layout/navbarMenu'
import BodyHome from '../component/layout/bodyHome'
import Loaded from '../component/layout/load'
const homePage = () => {
    return (
        <>
            <div id='colorlib-page'>
                <NavbarMenu />
                <BodyHome />
            </div>
            {/* <Loaded /> */}

        </>
    );
}
export default homePage