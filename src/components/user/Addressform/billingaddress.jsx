import { useState, useEffect } from "react";
import { updateUserDetails } from "../../../lib/User";

export default function BillingAddressForm({user, setUser}){
    const [billingAddress, setBillingAddress] = useState({
        firstName: "",
        lastName: "",
        company: "",
        country: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        mobile: "",
        email: "",
    });

    useEffect(() => {
    if (!user) return;
    else{

    const billing =
        user.billingAddress?.length > 0
            ? user.billingAddress[0]
            : {};

    setBillingAddress({
        firstName: billing.firstName || user.firstName || "",
        lastName: billing.lastName || user.lastName || "",
        company: billing.company || user.company || "",
        country: billing.country || user.country || "",
        address: billing.address || user.address || "",
        city: billing.city || user.city || "",
        state: billing.state || user.state || "",
        pinCode: billing.pinCode || user.pinCode || "",
        mobile: billing.mobile || user.mobile || "",
        email: user.email || "",
    })};
}, [user]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingAddress(prev => ({ ...prev, [name]: value }));
    };
    const formData = {billingAddress};

    async function handleSubmit() {
        try {
            const data = await updateUserDetails({
                billingAddress,
            },setUser);

            setUser(data.user);
            console.log("Updated user:", data.user);

            alert(data.message);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }
    
    return(
        <div className="p-4 flex flex-col gap-4 text-sm justify-center ">
            <div className="flex gap-2">
                <div className="flex-1 flex gap-2">
                    <label className="p-2 font-bold">First Name</label>
                    <input name="firstName" value={billingAddress.firstName} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
                <div className="flex-1 flex gap-2">
                <label className="p-2 font-bold">Last Name</label>
                <input name="lastName" value={billingAddress.lastName} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
            </div>
            <div className="flex gap-2">
                <label className="p-2 font-bold">Company name (optional)</label>
                <input name="company" value={billingAddress.company} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
            </div>
            <div className="flex gap-2">
                <label className="p-2 font-bold">Country / Region</label>
                <input name="country" value={billingAddress.country} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
            </div>
            <div className="flex gap-2">
                <label className="p-2 font-bold">Address</label>
                <input name="address" value={billingAddress.address} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
            </div>

            <div className="flex gap-2">
                <div className="flex-1 flex gap-2">
                    <label className="p-2 font-bold">Town / City</label>
                    <input name="city" value={billingAddress.city} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
                <div className="flex-1 flex gap-2">
                    <label className="p-2 font-bold">State</label>
                    <input name="state" value={billingAddress.state} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
                <div className="flex-1 flex gap-2">
                    <label className="p-2 font-bold">Pin Code</label>
                    <input name="pinCode" value={billingAddress.pinCode} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
            </div>

            <div className="flex gap-2">
                <div className="flex-1 flex gap-2">
                    <label className="p-2 font-bold">Phone</label>
                    <input name="mobile" value={billingAddress.mobile} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
                <div className="flex-1 flex gap-2">
                    <label className="p-2 font-bold">Email</label>
                    <input name="email" value={billingAddress.email} onChange={handleChange} className="border-1 flex-1 rounded-md px-3 py-2"/>
                </div>
            </div>
            <button
                onClick={handleSubmit}
                className="bg-black text-white px-5 py-2 rounded"
            >
                Save Changes
            </button>
        </div>
    )
}