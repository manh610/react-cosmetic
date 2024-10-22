import {Routes, Route} from 'react-router-dom';

import Admin from './admin/admin';

export default function AllRoutes(){
    return(
        <Routes>
            <Route path="/admin/*" element={<Admin/>}></Route>
        </Routes>
    )
}