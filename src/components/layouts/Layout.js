import Navigation from './Navigation';
import Footer from './Footer';

function Layout({ children }) {
    return (
        <div className="d-flex flex-column vh-100 ">
            <Navigation />
            
            <main className="container-fluid py-4 flex-grow-1 overflow-auto">
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default Layout;