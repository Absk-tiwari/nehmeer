import { memo, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSearch } from '../../contexts/SearchContext';
import profile from "../../assets/images/users/avatar.jpg";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


function Navbar() {

    const { myInfo } = useSelector( state => state.auth );

    const location = useLocation();
    const params = useParams();

    const { setSearchQuery, searchQuery } = useSearch();

    const [ orderModal, toggleOrderModal ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const nav = url => navigate(url);

    useEffect(()=> {
        setSearchQuery(searchQuery)
        return ()=> setSearchQuery('')
    },[searchQuery, setSearchQuery]);
    

    const logOut = async () => {
        dispatch({ type:"RESET_KART" });
        dispatch({ type:"LOGOUT" })
    }
    
    
    return (
    <>
        <header className="topbar">
            <div className="container-fluid">
                <div className="navbar-header" style={{justifyContent:'space-between'}}>
                   
                    <img src='/images/asmara.jpeg' alt={''} height={70} style={{borderRadius:16}} />

                    <div className="d-flex align-items-center gap-1">

                        <div className="dropdown topbar-item">
                            <button type="button" className="topbar-button position-relative" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                <Icon icon="solar:bell-bing-bold-duotone" className="fs-28 align-middle" />                              
                            </button>
                            <div className={`dropdown-menu py-0 dropdown-lg dropdown-menu-end `}
                                aria-labelledby="page-header-notifications-dropdown">
                                <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h6 className="m-0 fs-16 fw-semibold"> Notifications</h6>
                                        </div>
                                        <div className="col-auto">
                                        </div>
                                    </div>
                                </div>
                                <div data-simplebar style={{maxHeight:280}} className="notifications">
                                </div>
                            </div>

                        </div>

                        <li className="nav-item dropdown d-none d-lg-block user-dropdown">
                            <Link className="nav-link" id="UserDropdown" to={"#"} data-bs-toggle="dropdown" aria-expanded="false">
                                <img className={"rounded-circle "} height={40} src={profile} alt="" /> 
                            </Link>
                            <div className="dropdown-menu dropdown-menu-left navbar-dropdown" aria-labelledby="UserDropdown" style={{ borderRadius:8 }}>
                                <div className="dropdown-header text-center">
                                    <img className={" rounded-circle"} src={profile} height={50} alt={''} />
                                    <p>{myInfo.name}</p>
                                    <p className="fw-light text-muted d-none mb-0"> Admin </p>
                                </div>

                                <Link className="dropdown-item" to={"#"} onClick={logOut}>
                                    <i className="dropdown-item-icon mdi mdi-power text-primary me-2"/> 
                                    Sign Out
                                </Link>
                            </div>
                        </li>

                    </div>

                </div>
            </div>
        </header>
        <Modal isOpen={orderModal}>
            <ModalHeader>
                <p style={{ fontSize:'1.5rem' }}> Details </p>
            </ModalHeader>
            <ModalBody >
                angu
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-light btn-rounded' onClick={()=> toggleOrderModal(!orderModal)}> Close </button>
                <button className='btn btn-primary btn-rounded' onClick={()=>{}}>Print</button>
            </ModalFooter>
        </Modal>
    </>
    )
}

export default memo(Navbar)