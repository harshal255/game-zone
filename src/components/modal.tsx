import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";

interface ModalProps {
    isVisible: boolean;
    title: string;
    message: string;
    onClose: () => void;
    onConfirm?: () => void; 
}

const ModalComponent: React.FC<ModalProps> = ({ isVisible, title, message, onClose, onConfirm }) => {
    const [isAnimating, setIsAnimating] = useState(false); // Tracks if the modal is animating
    const [isDisplayed, setIsDisplayed] = useState(false); // Tracks if the modal should be displayed in the DOM

    // Handle modal visibility changes with animations
    useEffect(() => {
        if (isVisible) {
            setIsDisplayed(true);
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            setTimeout(() => setIsDisplayed(false), 300); 
        }
    }, [isVisible]);

    // Handle click on the modal background to close the modal
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose(); 
        }
    };

    if (!isDisplayed) return null; 

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
                isAnimating ? 'opacity-100' : 'opacity-0'
            }`} onClick={handleBackgroundClick}
        >
            <div
                className={`bg-white relative w-[90%] max-w-md p-5 rounded-lg shadow-lg transform transition-all duration-300 ${
                    isAnimating ? 'scale-100' : 'scale-90'
                }`}
            >
                <span className='absolute right-2 top-2 cursor-pointer'  onClick={onClose}><IoMdClose /></span>

                <h2 className="text-xl font-bold mb-3">{title}</h2>
                <p className="text-gray-700 mb-4">{message}</p>
                <div className="flex justify-center gap-3">
                    {onConfirm && (
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Confirm
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalComponent;
