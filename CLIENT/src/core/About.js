import React from 'react'
import img1 from '../assets/img/002.jpg'
import img2 from '../assets/img/003.jpg'
import akl from '../assets/img/creators/akl.jpg'
import ankita from '../assets/img/creators/ankita.jpg'
import adarsh from '../assets/img/creators/adarsh.jpeg'
import sai from '../assets/img/creators/sai.jpeg'
import rahul from '../assets/img/creators/rahul.jpg'
import shamgar from '../assets/img/creators/shamgar.jpeg'


const About = () => {
    return (
        <div className='landing-page-content'>
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
        </div>
    )
}

export default About
