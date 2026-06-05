import React from 'react'
import DesktopFooter from './DesktopFooter'
import MobileFooter from './MobileFooter'

export default function Footer() {
  return (
    <>
      <footer className=" bg-white border-t h-75">
        <DesktopFooter />
        <MobileFooter />
        
      </footer>
    
    </>
  )
}
