import * as React from 'react';
import {Breadcrumbs, Typography,Link} from '@mui/material';


const Breadcrumb = ({props}) => {
    const locArray = props.split("/").filter(x => x);
    
    let pathNames = ["/"];
    for(let i = 0; i< locArray.length; i++){
        pathNames[i] = (i===0 ? pathNames[i] : (pathNames[i-1] + "/")) + locArray[i];
        // console.log(pathNames[i]);
    }

    // console.log(pathNames);
    // console.log(locArray);

    return (
        <div role="presentation" className="breadcrumb-section">
            <Breadcrumbs aria-label="breadcrumb">
                {
                    pathNames.map((path,index) => {
                        // console.log(window.location.pathname === path);
                        return window.location.pathname === path ? 
                        (
                            <Typography key={index} >{locArray[index]}</Typography>
                            
                        ):(
                            <div>
                            { 
                                path === "/student"? (<Link href="/student/dashboard" key={index}>{locArray[index]}</Link>) : (<Link href={path} key={index}>{locArray[index]}</Link>)
                            }
                            </div>
                        )
                        
                    })
                }
            </Breadcrumbs>
        </div>
    );
}

export default Breadcrumb;

// (
//     <Link href={path} key={index}>{locArray[index]}</Link>
// )