import React, {useState, useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { signup} from '../auth'
import { BarLoader } from "react-spinners";

const Signup = () => {

    const q= process.env.REACT_APP_SIGNUP_DEPARTMENTS.split(',');
    const [values, setValues] = useState({
        enrl:"",
        name:"",
        email:"",
        dept:"",
        gradYear:"",
        password:"",
        error:"",
        success:false
    })
    const handleChange = whatsWritten => e => {
        setValues({
            ...values,
            error:false,
            [whatsWritten]: e.target.value
        })
    }

    const {enrl,name,email, dept,gradYear,password} = values;

    const confirmPassword = (e) => {
        if(e.target.value !== password){
                console.log("Sth wrong");
        }else{
            console.log("All good")
        }
    }


    let navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        setValues({
            ...values,
            error:false
        })
        signup({enrl, name, email, dept, gradYear, password})
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error, success:false})
            }else{
                console.log(values);
                setValues({
                    ...values,
                    enrl:"",
                    name:"",
                    email:"",
                    dept:"",
                    gradYear:"",
                    password:"",
                    success: true
                })
                console.log(values);
            }
        })
        .catch(() => {
            console.log("Sign up failed");
        })
    }

    const signupForm = () => {
        return (
            <section className='signup-form-section'>
                <div className="signup-section">
                <center><h1>Sign Up</h1></center>
                <div className="form-container">
                <form>
                    <div className="form-grp">
                        <input type="text" name='enrollment' onChange={handleChange("enrl")} placeholder='Enrollment number' />
                        <p>Shit</p>
                    </div>
                    <div className="form-grp">
                        <input type="text" name='name' onChange={handleChange("name")} placeholder='Full Name' />
                        <p>Shit</p>
                    </div>
                    <div className="form-grp">
                        <input type="email" onChange={handleChange("email")} name="email" placeholder='Email' />
                        <p>Shit</p>
                    </div>
                    <div className="form-grp">
                        <input list='dept' onChange={handleChange('dept')} placeholder='department' />
                        <datalist id="dept">
                            {q.map((option,index) => (
                                <option key={index} value={option} />
                            ))}
                        </datalist>
                    </div>
                    <div className="form-grp">
                        <input type="number" name="gradYear" onChange={handleChange("gradYear")} placeholder='graduation Year' />
                        <p>Shit</p>
                    </div>
                    <div className="form-grp">
                        <input type="password" name="password" onChange={handleChange("password")} placeholder='password' />
                        <p>Shit</p>
                    </div>
                    <div className="form-grp">
                        <input type="password" name="confirmPassword" onChange={confirmPassword} placeholder='confirm password' />
                        <p>Shit</p>
                    </div>
                    <button className="submit-btn" onClick={handleSubmit} type="submit">Sign up</button>
                    <p> Want to Sign up with GOOGLE? <Link to="www.google.com">sign up</Link> </p>
                    <p> Already have an account? <Link to="/signin">Login</Link> </p>
                </form>
                </div>
                </div>
            </section>
        )
    }

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1500);
    }, []);
    const loadingCSS = {
        height:"100vh",
        backgroundColor:"#f3f3f3",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
    
    return (
        <section>
            {
                loading ?
                (
                    <section style={loadingCSS} className='loading-section'>
                        <BarLoader color={"#3f0071"} loading={loading} size={100} />
                    </section>
                ):  signupForm()

            }
        </section>
    )
}

export default Signup;