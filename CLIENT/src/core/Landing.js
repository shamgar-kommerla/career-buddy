import React, {Fragment, useEffect, useState} from "react";
import Menu from './Menu';
import Footer from './Footer';
import { Outlet, useNavigate } from "react-router-dom";
import img1 from '../assets/img/002.jpg'
import img2 from '../assets/img/003.jpg'
import akl from '../assets/img/creators/akl.jpg'
import ankita from '../assets/img/creators/ankita.jpg'
import adarsh from '../assets/img/creators/adarsh.jpeg'
import sai from '../assets/img/creators/sai.jpeg'
import rahul from '../assets/img/creators/rahul.jpg'
import shamgar from '../assets/img/creators/shamgar.jpeg'
import BarLoader from "react-spinners/BarLoader";


const Landing = () => {
    
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])

    const navigate =useNavigate();
    const loadingCSS = {
        height:"100vh",
        backgroundColor:"#111",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }

    return (
        <>
        {
            loading ? (
                <section style={loadingCSS} className='loading-section'>
                    <BarLoader color={"#f3f3f3"} loading={loading} size={100} />
                </section>            
            ) :
            (
                <Fragment>
                    <section className="landing-page-content">
                        <header className="homepage-header-section">
                            <Menu />

                            <div className="hero-section">
                                <div className="welcome-section">
                                    <center>
                                    <p className="welcome-to">welcome to </p>
                                    </center>
                                    <h1>CAREER BUDDY</h1>
                                </div>
                                <div className="buttons-section">
                                    <button onClick={() => {navigate("/signin")}}>Login</button>
                                    <button onClick={()=> {navigate('/signup')}}>Sign up</button>
                                </div>
                            </div>
                        </header>
                        <section id="about" className="about-section">
                            <div className="about-container">
                                <div className="image-section">
                                    <img src={img1} alt="" />
                                </div>
                                <div className="desctiption-section">
                                    <p className="description-heading">What will you find here ?</p>
                                    <p className="description-content">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
                                    magni quisquam dolores doloremque, expedita voluptate, accusamus quo
                                    voluptatem voluptatibus libero exercitationem fugit eos! Perspiciatis
                                    reprehenderit eveniet labore nemo porro! Omnis?
                                    </p>
                                    {/* <div className="buttons">
                                    <a href="#">Read Articles</a>
                                    </div> */}
                                </div>
                            </div> 
                        </section>
                        <section id="about" className="vision-section">
                            <div className="vision-container">
                                <div className="desctiption-section">
                                    <p className="description-heading">OUR VISION</p>
                                    <p className="description-content">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
                                    magni quisquam dolores doloremque, expedita voluptate, accusamus quo
                                    voluptatem voluptatibus libero exercitationem fugit eos! Perspiciatis
                                    reprehenderit eveniet labore nemo porro! Omnis?
                                    </p>
                                </div>
                                <div class="image-section">
                                    <img src={img2} alt="" />
                                </div>
                            </div> 
                        </section>
                            
                        <section id="creators" className="creators-section">
                            <div className="creators-container">
                                <center>
                                <h2>MEET OUR CREATORS</h2>
                                </center>
                                <div className="creators-images-container">
                                    <div className="creator-card">
                                        <img src={akl} alt="" />
                                        <div className="creator-details">
                                            <p className="creator-name">Prof. Aashish Kumar Layek</p>
                                            <p className="creator-designation">MENTOR</p>    
                                        </div>
                                        
                                    </div>
                                    <div className="creator-card">
                                        <img src={ankita} alt="" />
                                        <div className="creator-details">
                                            <p className="creator-name">Ankita Marandi</p>
                                            <p className="creator-designation">Database Design</p>    
                                        </div>
                                        
                                    </div>
                                    <div className="creator-card">
                                        <img src={adarsh} alt="" />
                                        <div className="creator-details">
                                            <p className="creator-name">Adarsh Singh</p>
                                            <p className="creator-designation">Android Development</p>    
                                        </div>
                                        
                                    </div>
                                    <div className="creator-card">
                                        <img src={sai} alt="" />
                                        <div className="creator-details">
                                            <p className="creator-name">M Sai Teja Goud</p>
                                            <p className="creator-designation">Full Stack Developer</p>    
                                        </div>
                                        
                                    </div>
                                    <div className="creator-card">
                                        <img src={shamgar} alt="" />
                                        <div className="creator-details">
                                            <p className="creator-name">Shamgar Kommerla</p>
                                            <p className="creator-designation">Full Stack Developer</p>    
                                        </div>
                                        
                                    </div>
                                    <div className="creator-card">
                                        <img src={rahul} alt="" />
                                        <div className="creator-details">
                                            <p className="creator-name">Rahul Sehrawat</p>
                                            <p className="creator-designation">Android Development</p>    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>    
                    <Footer />
                </Fragment>
        )
        }
        </>
    );
};

export default Landing;
