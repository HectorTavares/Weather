// src/components/Modal.tsx
import { FC, ReactNode } from 'react'
import './style.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div>
      <div className='modal-overlay' onClick={onClose}></div>
      <div className='modal'>
        <button className='modal-close-button' onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  )
}
