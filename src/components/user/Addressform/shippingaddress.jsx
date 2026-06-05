export default function ShippingAddressForm({user}){
    return(
        <div className="p-4 flex flex-col gap-4 text-sm justify-center ">
            <div className="flex gap-2">
                <div className="flex-1 flex gap-2">
                    <label className="p-2 font-bold">First Name</label>
                    <input value={user?.firstName} className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
                <div className="flex-1 flex gap-2">
                <label className="p-2 font-bold">Last Name</label>
                <input value={user?.lastName}className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
            </div>
            <div className="flex gap-2">
                <label className="p-2 font-bold">Company name (optional)</label>
                <input value={user?.company}className="border-1 flex-1 rounded-md px-3 py-2"/>
            </div>
            <div className="flex gap-2">
                <label className="p-2 font-bold">Country / Region</label>
                <input value={user?.country}className="border-1 flex-1 rounded-md px-3 py-2"/>
            </div>
            <div className="flex gap-2">
                <label className="p-2 font-bold">Address</label>
                <input value={user?.address}className="border-1 flex-1 rounded-md px-3 py-2"/>
            </div>

            <div className="flex gap-2">
                <div className="flex-1 flex gap-2">
                    <label className="p-2 font-bold">Town / City</label>
                    <input value={user?.city}className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
                <div className="flex-1 flex gap-2">
                    <label className="p-2 font-bold">State</label>
                    <input value={user?.state}className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
                <div className="flex-1 flex gap-2">
                    <label className="p-2 font-bold">Pin Code</label>
                    <input value={user?.pinCode}className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
            </div>

            
        </div>
    )
}