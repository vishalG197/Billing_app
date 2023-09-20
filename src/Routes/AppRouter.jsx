import Checkout from "../components/Billing/Checkout"
import NewBill from "../components/Billing/NewBill"
import AddItem from "../components/ItemManagement/AddItem"
import EditItem from "../components/ItemManagement/EditItem"
import ItemList from "../components/ItemManagement/ItemList"
import BillDetails from "../components/MyBills/BillDetails"
import MyBillsList from "../components/MyBills/MyBillsList"
import SalesStatistics from "../components/Sales/SalesStatistics"
import {Routes ,Route} from "react-router-dom";
const AppRouter = () => {
  return (
    <Routes>
     <Route path="/checkout" element={<Checkout/>} />

{/* Route for Billing */}
<Route path="/newbill" element={<NewBill/>} />

{/* Route for My Bills */}
<Route path="/" element={<AddItem/>} />

{/* Route for Sales */}
<Route path="/edititem/:itemId" element={<EditItem/>} />

{/* Add a default route (e.g., a landing page or dashboard) */}
<Route path="/itemlist" element={<ItemList/>} />

<Route path="/billdetails/:billId" element={<BillDetails/>} />

<Route path="/mybills" element={<MyBillsList/>} />

<Route path="/saleslist" element={<SalesStatistics/>} />
<Route path="/checkout" element={<Checkout/>} />

{/* Add a 404 Not Found page */}
<Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  )
}

export default AppRouter
