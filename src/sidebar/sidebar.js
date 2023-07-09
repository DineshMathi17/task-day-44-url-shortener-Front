import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { toast } from "react-toastify";


function Sidebar({ children }) {

       return (
        <div className="sid-container">
            <main>
                <NavScrollExample />
                {children}
            </main>

        </div>
    );
};

export default Sidebar;

export function NavScrollExample({ title }) {
    const history = useHistory()
    const logout = () => {
        sessionStorage.clear();
        toast("User Logout")
        history.push('/login');
    };

    return (
        <div>

            <Navbar className="nav-clr" expand="lg">
                <Container fluid>
                    <Navbar.Toggle style={{backgroundColor:"white",border:"2px solid red",borderRight:"10px"}} aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <button className="nav-btn-clr" class="btn me-2" type="button" onClick={() => history.push("/url/short")}>Home</button>
                            <button className="nav-btn-clr" class="btn me-2" type="button" onClick={() => history.push("/url/list")}>URL List</button>
                        </Nav>
                        <button className="nav-btn-clr" class="btn me-2" type="button" onClick={() => logout()}>logout</button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    );
}


