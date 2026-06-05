import { useState, useEffect } from 'react';

export default function PriceBreakup({ cart = [] }){
    const [subtotal, setSubtotal] = useState(0)
    const [gstTotal, setGstTotal] = useState(0)
    const [total, setTotal] = useState(0)

    

    useEffect(() => {
        const st = (cart || []).reduce((acc, item) => {
            const qty = item?.quantity ?? 1
            const price = Number(item?.salePrice) || 0
            return acc + price * qty
        }, 0)

        const gst = (cart || []).reduce((acc, item) => {
            const qty = item?.quantity ?? 1
            const g = Number(item?.gst) || 0
            const pct = Number(item?.gstPercent ?? 18) / 100
            return acc + g * qty
        }, 0)

        setSubtotal(st)
        setGstTotal(gst)
        setTotal(st + gst)
    }, [cart])
    
    return(
        <>
        <div className='flex flex-col gap-2'>
            <div className="text-lg font-semibold mb-2">Order Summary</div>
            <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
                <span>GST</span>
                <span>₹{gstTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
            </div>
            <button className="m-2 p-4 bg-gray-400 hover:bg-gray-200 active:scale-80 duration-200 transition-all">
            Place Order
            </button>

        </div>
        
        </>
    )
}