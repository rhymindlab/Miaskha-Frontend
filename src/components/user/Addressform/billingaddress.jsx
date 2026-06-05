import { useState } from "react";

export default function BillingAddressForm({user}){
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return(
        <div className="p-4 flex flex-col gap-4 text-sm justify-center ">
            <div className="flex gap-2">
                <div className="flex-1 flex gap-2">
                    <label className="p-2 font-bold">First Name</label>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
                <div className="flex-1 flex gap-2">
                <label className="p-2 font-bold">Last Name</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
            </div>
            <div className="flex gap-2">
                <label className="p-2 font-bold">Company name (optional)</label>
                <input name="company" value={formData.company} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
            </div>
            <div className="flex gap-2">
                <label className="p-2 font-bold">Country / Region</label>
                <input name="country" value={formData.country} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
            </div>
            <div className="flex gap-2">
                <label className="p-2 font-bold">Address</label>
                <input name="address" value={formData.address} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
            </div>

            <div className="flex gap-2">
                <div className="flex-1 flex gap-2">
                    <label className="p-2 font-bold">Town / City</label>
                    <input name="city" value={formData.city} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
                <div className="flex-1 flex gap-2">
                    <label className="p-2 font-bold">State</label>
                    <input name="state" value={formData.state} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
                <div className="flex-1 flex gap-2">
                    <label className="p-2 font-bold">Pin Code</label>
                    <input name="pinCode" value={formData.pinCode} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
            </div>

            <div className="flex gap-2">
                <div className="flex-1 flex gap-2">
                    <label className="p-2 font-bold">Phone</label>
                    <input name="mobile" value={formData.mobile} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
                <div className="flex-1 flex gap-2">
                <label className="p-2 font-bold">Email</label>
                <input name="email" value={formData.email} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
            </div>
        </div>
    )
}