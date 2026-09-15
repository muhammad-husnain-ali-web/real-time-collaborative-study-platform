import React from 'react'

const Toast = ({toastMessage, setShowToast, toastType}: any) => {
  return (
  <div
    className={`fixed right-4 top-20 z-[9999] w-80 rounded-lg border bg-white shadow-lg ${
      toastType === 'success'
        ? 'border-green-200'
        : 'border-red-200'
    }`}
  >
    <div className="flex items-center justify-between border-b px-4 py-3">
      <strong
        className={
          toastType === 'success'
            ? 'text-green-600'
            : 'text-red-600'
        }
      >
        {toastType === 'success' ? 'Success' : 'Error'}
      </strong>

      <button
        type="button"
        onClick={() => setShowToast(false)}
        className="text-xl text-gray-400 hover:text-gray-700"
      >
        ×
      </button>
    </div>

    <div className="px-4 py-3 text-sm text-gray-700">
      {toastMessage}
    </div>
  </div>
  )
}

export default Toast
