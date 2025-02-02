import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function onClickOutside(listening, setListening, menuRef, setIsOpen) {
    return () => {
        if (listening) return
        if (!menuRef.current || menuRef === null) return
        setListening(true)
        ;[`click`, `touchstart`].forEach((type) => {
            document.addEventListener(`click`, (evt) => {
                if (menuRef.current.contains(evt.target)) return
                setIsOpen(false)
            })
        })
    }
}
