import { use, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth"
import OrderHistory from "../../components/user/orderhistory";
import Dashboard from "../../components/user/dashboard";
import Addresses from "../../components/user/address";
import AccountInfo from "../../components/user/accountinfo";
import { handlefetchCart } from "../../lib/cart";

export default function Account(){
    const accountInfo = ['Dashboard','Orders','Addresses','Account Details']
    const {user} = useAuth();
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        company: user?.company || '',
        country: user?.country || '',
        address: user?.address || '',
        city: user?.city || '',
        state: user?.state || '',
        pinCode: user?.pinCode || '',
        mobile: user?.mobile || '',
        email: user?.email || '',
    });


    const [tab, setTab] = useState(accountInfo[0]);
    
    return(
        <div className="flex px-30 py-10">
          <div className="flex flex-col font-bold gap-2 w-1/5">
            {
                accountInfo.map((item,index)=>(
                    <button key={index} onClick={()=>{setTab(item)}} className={`p-4 transition-all text-xl duration-300 ${tab === item ? "bg-black text-white" : "bg-gray-200 text-black hover:bg-gray-500 "} `}>{item}</button>
                ))
            }
          </div>
          <div className="w-4/5 px-5">
            {tab === accountInfo[0] && (
                <Dashboard user={user} setTab={setTab} accountInfo={accountInfo} />
            )}
            {tab === accountInfo[1] && (
                <OrderHistory />
            )}
            {tab === accountInfo[2] && (
                <Addresses user={user} setFormData={setFormData}/>
            )}
            {tab === accountInfo[3] && (
                <AccountInfo user={user}/>
            )}
          </div>
        </div>
    )
}