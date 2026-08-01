import React from "react";

export default function AddressForm({
    title,
    address,
    setAddress,
    disabled = false,
}) {

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="space-y-8">

            <div>
                <h2 className="font-serif text-3xl text-[#181818]">
                    {title}
                </h2>

                <p className="mt-2 text-gray-500">
                    Please fill in your address details.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                <InputField
                    label="First Name"
                    name="firstName"
                    value={address.firstName}
                    onChange={handleChange}
                    disabled={disabled}
                />

                <InputField
                    label="Last Name"
                    name="lastName"
                    value={address.lastName}
                    onChange={handleChange}
                    disabled={disabled}
                />

                <div className="md:col-span-2">
                    <InputField
                        label="Company (Optional)"
                        name="company"
                        value={address.company}
                        onChange={handleChange}
                        disabled={disabled}
                    />
                </div>

                <div className="md:col-span-2">
                    <InputField
                        label="Country / Region"
                        name="country"
                        value={address.country}
                        onChange={handleChange}
                        disabled={disabled}
                    />
                </div>

                <div className="md:col-span-2">
                    <InputField
                        label="Street Address"
                        name="address"
                        value={address.address}
                        onChange={handleChange}
                        disabled={disabled}
                    />
                </div>

                <InputField
                    label="Town / City"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    disabled={disabled}
                />

                <InputField
                    label="State"
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    disabled={disabled}
                />

                <InputField
                    label="PIN Code"
                    name="pinCode"
                    value={address.pinCode}
                    onChange={handleChange}
                    disabled={disabled}
                />

                <InputField
                    label="Phone Number"
                    name="mobile"
                    value={address.mobile}
                    onChange={handleChange}
                    disabled={disabled}
                />

            </div>

        </div>
    );
}

function InputField({
    label,
    name,
    value,
    onChange,
    disabled,
    type = "text",
}) {

    return (
        <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`
                    w-full
                    rounded-2xl
                    border
                    border-[#ECE6DE]
                    px-5
                    py-3
                    outline-none
                    transition-all

                    ${
                        disabled
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-[#F8F5F2] focus:border-[#B88A44] focus:bg-white"
                    }
                `}
            />

        </div>
    );
}