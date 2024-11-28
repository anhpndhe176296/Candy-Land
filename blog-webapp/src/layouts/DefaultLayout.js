import FooterFE from "../components/FooterFE";
import HeaderFE from "../components/HeaderFE";
import '../styles/defaultLayout.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DefaultLayout({className,children}) {
    return (
        <>
            <HeaderFE />
            <div className= {className} style={{minHeight: "60vh"}}>
                <ToastContainer />
                {children}
            </div>
            <FooterFE />
        </>
    )
}