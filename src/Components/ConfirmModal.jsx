import '../Components/Css/Home.css'
function ConfirmModal({ isOpen, onClose, onConfirm }) {
    return (
        <>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal ">
                        <h2 className='text-xl'>Are you sure you want to cancel this appointment?</h2>
                        <div className="button-container">
                            <button onClick={onClose} className='bg-green-700'>Cancel</button>
                            <button onClick={onConfirm} className='bg-red-700'>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ConfirmModal
