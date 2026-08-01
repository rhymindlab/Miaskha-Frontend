import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import AddressForm from "./AddressForm";
import { updateUserDetails } from "../../lib/User";

export default function Addresses({ user, setUser }) {

    const emptyAddress = {
        firstName: "",
        lastName: "",
        company: "",
        country: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        mobile: "",
    };

    const [billingAddress, setBillingAddress] = useState(emptyAddress);
    const [shippingAddress, setShippingAddress] = useState(emptyAddress);
    const [shippingBackup, setShippingBackup] = useState(emptyAddress);
    const [sameAsBilling, setSameAsBilling] = useState(true);

    useEffect(() => {

        if (!user) return;

        const billing = user.billingAddress || emptyAddress;
        const shipping = user.shippingAddress || emptyAddress;

        setBillingAddress({
            ...emptyAddress,
            ...billing,
        });

        setShippingAddress({
            ...emptyAddress,
            ...shipping,
        });

        // IMPORTANT
        setShippingBackup({
            ...emptyAddress,
            ...shipping,
        });

        setSameAsBilling(user.sameAsBilling ?? true);

    }, [user]);

    async function handleSave() {

        try {

            const finalShippingAddress = sameAsBilling
                ? billingAddress
                : shippingAddress;

            const data = await updateUserDetails({
                billingAddress,
                shippingAddress: finalShippingAddress,
                sameAsBilling,
            });

            setUser(data.user);

            // update backup after successful save
            setShippingBackup(finalShippingAddress);

            alert("Address updated successfully.");

        } catch (err) {
            console.error(err);
            alert(err.message || "Something went wrong.");
        }
    }

    function handleCheckboxChange(e) {

        const checked = e.target.checked;

        if (checked) {

            // Save current shipping before replacing it
            setShippingBackup(shippingAddress);

            // Copy billing
            setShippingAddress({
                ...billingAddress,
            });

        } else {

            // Restore original shipping
            setShippingAddress({
                ...shippingBackup,
            });

        }

        setSameAsBilling(checked);
    }

    function handleBillingChange(updater) {

        setBillingAddress(prev => {

            const next =
                typeof updater === "function"
                    ? updater(prev)
                    : updater;

            if (sameAsBilling) {
                setShippingAddress(next);
            }

            return next;

        });

    }return (

    <div className="space-y-10">

        {/* Header */}

        <div className="rounded-3xl border border-[#ECE6DE] bg-[#F8F5F2] p-8">

            <p className="text-xs font-semibold uppercase tracking-[4px] text-[#B88A44]">
                MIASHKA
            </p>

            <h1 className="mt-3 font-serif text-3xl text-[#181818]">
                Saved Addresses
            </h1>

            <p className="mt-3 text-gray-600">
                Manage your billing and shipping addresses.
            </p>

        </div>

        {/* Billing */}

        <div className="rounded-3xl border border-[#ECE6DE] bg-white p-8">

            <AddressForm
                title="Billing Address"
                address={billingAddress}
                setAddress={handleBillingChange}
            />

        </div>

        {/* Checkbox */}

        <div className="rounded-2xl border border-[#ECE6DE] bg-[#F8F5F2] p-6">

            <label className="flex items-center gap-3 cursor-pointer">

                <input
                    type="checkbox"
                    checked={sameAsBilling}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 accent-black"
                />

                <span className="font-medium text-[#181818]">
                    Shipping address is same as Billing Address
                </span>

            </label>

        </div>

        {/* Shipping */}

        <div
            className={`rounded-3xl border border-[#ECE6DE] bg-white p-8 transition-all duration-300 ${
                sameAsBilling
                    ? "opacity-60"
                    : ""
            }`}
        >

            <AddressForm
                title="Shipping Address"
                address={shippingAddress}
                setAddress={setShippingAddress}
                disabled={sameAsBilling}
            />

        </div>

        {/* Save */}

        <div className="flex justify-end">

            <button
                onClick={handleSave}
                className="flex items-center gap-3 rounded-full bg-[#181818] px-8 py-4 text-white transition-all duration-300 hover:bg-[#B88A44]"
            >

                <Save size={18} />

                Save Address

            </button>

        </div>

    </div>

);

}