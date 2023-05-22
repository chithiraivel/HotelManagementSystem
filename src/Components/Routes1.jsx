import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboardpage from '../Pages/Dashboard'

import Employees from '../Pages/Form/Employees'
import Customer from '../Pages/Form/Customer'
// import RoomForm from '../Pages/Form/RoomForm'
import EmployeeTable from '../Pages/EmployeeTable'
import CustomerTable from '../Pages/CustomerTable'
import RoomForm from '../Pages/Form/RoomForm'
import RoomTable from '../Pages/RoomTable'
import Reservation from '../Pages/Form/Reservation'
import ReservationForm from '../Pages/ReservationForm'
import TransactionForm from '../Pages/Form/TransactionForm'
import TransactionTable from '../Pages/TransactionTable'
import Reports from '../Pages/Form/Reports'
import ReportsTable from '../Pages/ReportsTable'
// import RoomTable from '../Pages/RoomTable'

const Routes1 = () => {

    return (
        <Routes>
            <Route path='/' element={<Dashboardpage />} />
            <Route path='/Employee' element={<EmployeeTable />} />
            <Route path='/Employee/EmployeeForm' element={<Employees />} />
            <Route path='/Employee/EmployeeForm/:action/:id' element={<Employees />} />

            <Route path='/Customer' element={<CustomerTable />} />
            <Route path='/Customer/CustomerForm' element={<Customer />} />
            <Route path='/Customer/CustomerForm/:action/:id' element={<Customer />} />

            <Route path='/Room' element={<RoomTable />}/>
            <Route path='/Room/RoomForm' element={<RoomForm />}/>
            <Route path='/Room/RoomForm/:action/:id' element={<RoomForm />}/>


            <Route path='/Reservation' element={<Reservation />}/>
            <Route path='/Reservation/ReservationForm' element={<ReservationForm />}/>
            <Route path='/Reservation/ReservationForm/:action/:id' element={<ReservationForm />}/>


            <Route path='/Transaction' element={<TransactionTable />}/>
            <Route path='/Transaction/TransactionForm' element={<TransactionForm />}/>
            <Route path='/Transaction/TransactionForm/:action/:id' element={<TransactionForm />}/>


            
            <Route path='/Reports' element={<ReportsTable />}/>
            <Route path='/Reports/ReportsForm' element={<Reports />}/>
            <Route path='/Reports/ReportsForm/:action/:id' element={<Reports />}/>
          

        </Routes>
    )
}

export default Routes1;
