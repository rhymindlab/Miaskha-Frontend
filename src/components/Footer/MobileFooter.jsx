import React from 'react'

export default function MobileFooter() {
  return (
    <div className='lg:hidden sm:hidden'>
      <div className='px-4 flex flex-col gap-2'>
        <div className='mt-2 flex-1 flex flex-col gap-2'>
          <h2 className='text-2xl font-bold'>
            About
          </h2>
          <span><a href="/Blogs" className='pl-3 hover:underline'>Blogs</a></span>

        </div>
        <div className='flex-1 flex flex-col gap-2'>
          <h2 className='text-2xl font-bold'>
            Policies
          </h2>
          <span>Email:<a href="mailto:shakultech@gmail.com" className='pl-3 hover:underline'>shakultech@gmail.com</a></span>
          <span>Phone:<a  href="tel:+917503592928" className='pl-3 hover:underline'>7503592928</a></span>
          <span>Whatsapp:<a href="https://wa.me/917503592928 " target="_blank" className='pl-3 hover:underline'>7503592928</a></span>
          <p className='w-[300px]'>For any queries, please reach out to us between 10:30 AM to 5:30 PM, Monday to Saturday.</p>
        </div>
        <div className='flex-1 text-2xl font-bold'>Get in Touch</div>
      </div>
      
      <div className="mx-auto max-w-6xl px-4 py-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Zivaara. All rights reserved.</p>
      </div>
    </div>
  )
}
