import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import PeopleIcon from '@mui/icons-material/People';
import BadgeIcon from '@mui/icons-material/Badge';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import PaidIcon from '@mui/icons-material/Paid';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import  Home  from '@mui/icons-material/Home';
import { Hotel, Room, RoomOutlined } from '@mui/icons-material';
const sidebar_routes = [
    {
        display_name: "Dashboard",
        route: "/",
        icon: <Home />
    },
    {
        display_name: "Customer",
        route: "/Customer",
        route2: "/Customer/CustomerForm",
        icon: <PeopleIcon />
    },
    {
        display_name: "Employee",
        route: "/Employee",
        route2: "/Employee/EmployeeForm",
        icon: <BadgeIcon />
    },
    {
        display_name: "Reservation",
        route: "/Reservation",
        route2: "/Reservation/ReservationForm",
        icon: <EventSeatIcon />
    },
    {
        display_name: "Room",
        route: "/Room",
        route2:"/Room/RoomForm",
        icon: <Hotel />
    },
    {
        display_name: "Transaction",
        route: "/Transaction",
        icon: <PaidIcon />
    },
    {
        display_name: "Reports",
        route: "/Reports",
        icon: <ReportGmailerrorredIcon />
    }
]
export { sidebar_routes }