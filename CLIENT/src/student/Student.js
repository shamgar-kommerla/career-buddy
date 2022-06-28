import React,{useState, useEffect, Fragment} from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Footer from '../core/Footer'
import Menu from '../core/Menu'
import { BarLoader } from 'react-spinners';
import { isAuthenticated } from '../auth';


const Student = () => {

    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1500);
    }, [])

    const loadingCSS = {
        height:"100vh",
        backgroundColor:"#f3f3f3",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
    
    const navigate = useNavigate();
    
    const preload= () =>{
        !isAuthenticated() && navigate("/");

        (isAuthenticated() && isAuthenticated().student.role === -1) && navigate("/student/blocked")
        
    }
    
    useEffect(() => {
        preload();
    }, [])

    return(
        <div>
            {/* { */}
                {/* isAuthenticated() && isAuthenticated().student.role === -1 */}
            {/* } */}
            {
                    loading ?
                    (
                        <section style={loadingCSS} className='loading-section'>
                            <BarLoader color={"#3f0071"} loading={loading} size={100} />
                        </section>     
                    ):
                    (
                        <Fragment>
                            <div className="student-content-wrapper">
                                <Menu />
                                <Outlet />
                            </div>
                            <Footer />
                        </Fragment>
                    )
            }
        </div>
    )
}

export default Student;
