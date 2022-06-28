import React,{useEffect, useState} from 'react'
import { isAuthenticated } from '../auth'
import Breadcrumb from './BreadCrumb';
import {createArticle} from './helper/articlehelper';
import {allCompanies} from './helper/companyhelper';


function PublishCpy() {
    const {token, student} = isAuthenticated();
    const [companies, setCompanies] = useState([]);
    // console.log(token, student);
    const companyDataList = process.env.REACT_APP_COMPANY_DATALIST.split(",")
    const whereAppliedDataList = process.env.REACT_APP_APPLY_DATALIST.split(",")

    
    
    useEffect(() => {
        allCompanies()
        .then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setCompanies(data)
            }
        })
        .catch(err => console.log(err));
    }, [])
    console.log(companies);

    const formInputRenderer = (question, qtype) => {
        switch (qtype) {
            case "text":
                return (
                    <div key={question} className='form-grp'>
                        <input type="text" name={question} placeholder={question} required/>
                    </div>
                )
                
            case "textarea":
                return (
                    <div key={question} className='form-grp'>
                        <textarea placeholder={question} name={question} cols="20" rows="10" required></textarea>
                    </div>
                )
            case "email":
                return (
                    <div key={question}>
                        <input type="email" name={question} placeholder={question} required/>
                    </div>
                )
            case "number":
                if(question === 'No. of rounds'){
                    //
                }
                return (
                    <div key={question} className="form-grp">
                        <input type="number" name={question} step=".01" placeholder={question} required/>
                    </div>
                )
            case "datalist":
                if(question === "Company"){
                    return (
                        <div className="form-grp" key={question}>
                            <input list={question} name={question} placeholder={question} required/>
                            <datalist id={question} key={question} >
                                {
                                    companyDataList.map(value => {
                                        return(
                                            <option value={value} />
                                        )
                                    })
                                }
                            </datalist>
                        </div>
                    )
                }else if(question === "Where did you apply?"){
                    return (
                        <div className="form-grp" key={question}>
                            <input list={question} name={question} placeholder={question} required/>
                            <datalist id={question}>
                                {
                                    whereAppliedDataList.map(value => {
                                        return(
                                            <option value={value} />
                                        )
                                        
                                    })
                                }
                            </datalist>
                        </div>
                    )
                }
                break;
            default:
                return "Nothing specified, so going with text input"
        }
    }

    const aboutRoleInputs = () => {
        const aboutRole = process.env.REACT_APP_ABOUT_ROLE.split(",");
        const aboutRoleQTypes = process.env.REACT_APP_ABOUT_ROLE_QTYPES.split(",");
        // console.log(aboutRole);

        let x = [];
        for(let i=0;i<aboutRole.length;i++){
            x.push(formInputRenderer(aboutRole[i], aboutRoleQTypes[i]))
        }
        return x;
    }
    const applicationInputs = () => {
        const application = process.env.REACT_APP_APPLICATION.split(",");
        const applicationQTypes = process.env.REACT_APP_APPLICATION_QTYPES.split(",");

        // console.log(application);

        let x = [];
        for(let i=0;i<application.length;i++){
            x.push(formInputRenderer(application[i], applicationQTypes[i]))
        }
        return x;
    }

    const recruitmentInputs = () => {
        const recruitment = process.env.REACT_APP_RECRUITMENT.split(",");
        const recruitmentQTypes = process.env.REACT_APP_RECRUITMENT_QTYPES.split(",");
        // console.log(recruitment);
        let x = [];
        for(let i=0;i<recruitment.length;i++){
            x.push(formInputRenderer(recruitment[i], recruitmentQTypes[i]))
        }
        return x;
    }
    const finalSuggestionsInputs = () => {
        const finalsuggestions = process.env.REACT_APP_FINAL_SUGGESTIONS.split(",");
        const finalsuggestionsQtypes = process.env.REACT_APP_FINAL_SUGGESTIONS_QTYPES.split(",");
        // console.log(finalsuggestions);

        let x = [];
        for(let i=0;i<finalsuggestions.length;i++){
            x.push(formInputRenderer(finalsuggestions[i], finalsuggestionsQtypes[i]))
        }
        return x;
    }

    
    
    const handleSubmit =(e) => {
        e.preventDefault();
        const x = e.target.elements

        let loopCount = 1;
        let final="";
        let company="";
        let role = "";
        let studentId = student._id

        for(const property in x){

            if(x[property].name === "Company"){
                // console.log(x[property].value);
                company = x[property].value;

            }
            if(x[property].name === "Role Applied for"){
                // console.log(x[property].value);
                role= x[property].value;
            }
            if(loopCount === x.length){
                break;
            }
            // console.log(property);
            let tmp = "";
            
            if(x[property].value !== ""){
                tmp = "<h6>" + x[property].name + "</h6>" + "<p>"+x[property].value+"</p>" 
                final = final.concat(tmp);
                
            }
            loopCount++;
        }



        console.log(company);
        console.log(role);
        console.log(final);
        
        const values = {
            company: company,
            role: role,
            content: final,
            publisher: studentId
        }
        createArticle(studentId, token, values)
        .then(() => {
            console.log("Successfully submitted");
        })
    }


    const publishForm = () => {
        return (
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    {aboutRoleInputs()}
                    {applicationInputs()}
                    {recruitmentInputs()}
                    {finalSuggestionsInputs()}
                    <button type='submit' className='submit-btn'>Sumbit</button>
                </form>
            </div>
        )
    }

    return (
        <section className='publish-article-section'>
            <Breadcrumb props={window.location.pathname} />
            <center><h2>Share your experience with us</h2></center>
            {publishForm()}
        </section>
    )
}

export default PublishCpy
