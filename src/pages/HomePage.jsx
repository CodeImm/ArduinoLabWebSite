import React from 'react';
import * as db from "../firestore";
import Navbar from "../components/shared/Navbar";

// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://material-ui.com/">
//                 PhysLab
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }


export default function HomePage() {

    return (
        <div>
            <p>HomePage</p>
            <button onClick={db.logOut}>
                Logout
            </button>
            <Navbar/>
        </div>
    );
}