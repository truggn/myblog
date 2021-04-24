import Navbars from "../component/layout/navbarMenu"
import BodyPhotos from '../component/layout/bodyPhotos'
import Loaded from '../component/layout/load'

const PhotosPage = () => {
    return (
        <>
            <div id='colorlib-page'>
                <Navbars />
                <BodyPhotos />
            </div>
            {/* <Loaded /> */}
        </>

    )
}
export default PhotosPage