import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { signin,authenticate, profSignin } from "../auth";
import Menu from "../core/Menu";


const Signin = () => {

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])

    const [values, setValues] = useState({
        email:"",
        password:"",
        user:"",
        error:"",
        loading:"false",
        didRedirect:false
    })

    const {email, password, error,user} = values;

    const handleChange = whatsChanging => e => {
        // console.log("Handle Change Called");
        setValues({
            ...values,
            error:false,
            [whatsChanging]: e.target.value
        })
    }
    
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        console.log("Submit called");
        e.preventDefault();
        
        setValues({
            ...values,
            error:false,
            loading:true
        })

        if(user === "Student"){
            signin({email, password})
            .then(data => {
                if(data.error){
                    setValues({
                        ...values,
                        error:data.error,
                        loading:false
                    })
                }else{
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect:true
                        });
                    });
                    navigate('/student/dashboard')
                }
            })
            .catch(err => console.log(err))
        }else if(user === "Admin"){
            profSignin({email,password})
            .then(data => {
                if(data.error){
                    setValues({
                        ...values,
                        error:data.error,
                        loading:false
                    })
                }else{
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect:true
                        });
                    });
                    navigate('/admin/dashboard')
                }
            })
            .catch(err => console.log(err))
        }
    }


    const signinForm = () => {
        return (
            
                <div className="signin-form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-grp">
                            <input type="email" name="email" placeholder="Your Email" onChange={handleChange("email")} required />
                            <p>handleEmail</p>
                        </div>
                        <div className="form-grp">
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange("password")}
                                placeholder="Password"
                                required
                            />
                            <p>all is well</p>
                        </div>
                        <div className="form-grp">
                            <input  onChange={handleChange("user")} placeholder="Admin / Student"  list="user-type" required/>
                            <datalist id="user-type">
                                <option value="Student"></option>
                                <option value="Admin"></option>
                            </datalist>
                        </div>
                        <button type="submit" className="submit-btn" >Sign in</button>
                        <p><Link to="google">Forgot password?</Link></p>
                        <p> Don't have an account? <Link to="/signup">sign up</Link> </p>
                    </form>
                </div>
        
        )
    }


    
    const failureMessage = () => {
        const failureStyles = {
            display: error? "":"none"
        }
        
        return (
            <div style={failureStyles}>
                <p>error</p>
            </div>
        )
    }


    const loadingCSS = {
        height:"100vh",
        backgroundColor:"#111",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }


    return (
        loading ? (
            <section style={loadingCSS} className='loading-section'>
                <BarLoader color={"#f3f3f3"} loading={loading} size={100} />
            </section>            
        ) :(
        <section className="signin-section">
            <Menu />
            <div className="signin-container">
                <center>
                <h1>Sign In</h1>
                </center>
                {failureMessage()}
                {signinForm()}
            </div>
        </section>
        )

    );
};

export default Signin;
