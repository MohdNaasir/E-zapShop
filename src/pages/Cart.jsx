import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { FaRegTrashAlt } from 'react-icons/fa'
import { LuNotebookText } from 'react-icons/lu'
import { MdDeliveryDining } from 'react-icons/md'
import { GiShoppingBag } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import emptyCart from "../assets/empty-cart.png"

const Cart = ({ location }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart()
  const navigate = useNavigate()

  const totalPrice = cartItem.reduce((total, item) => total + item.price * item.quantity, 0)

  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    address: '',
    state: '',
    postcode: '',
    country: location?.country || '',
    phone: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDeliveryInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    const { fullName, address, state, postcode, country, phone } = deliveryInfo
    if (!fullName || !address || !state || !postcode || !country || !phone) {
      alert("Please fill in all fields before submitting!")
      return
    }

    alert(
      `Order Submitted Successfully!\n\n` +
      `Name: ${fullName}\n` +
      `Address: ${address}\n` +
      `State: ${state}\n` +
      `PostCode: ${postcode}\n` +
      `Country: ${country}\n` +
      `Phone No: ${phone}\n` +
      `Items Total: $${totalPrice}\n` +
      `Handling: $5\n` +
      `Grand Total: $${totalPrice + 5}`
    )

    // Reset form after submission (optional)
    setDeliveryInfo({
      fullName: '',
      address: '',
      state: '',
      postcode: '',
      country: '',
      phone: ''
    })
  }

  return (
    <div className='mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0'>
      {cartItem.length > 0 ? (
        <div>
          <h1 className='font-bold text-2xl'>My Cart ({cartItem.length})</h1>
          <div className='mt-10'>
            {cartItem.map((item) => (
              <div key={item.id} className='bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full'>
                <div className='flex items-center gap-4'>
                  <img src={item.image} alt={item.title} className='w-20 h-20 rounded-md' />
                  <div>
                    <h1 className='md:w-[300px] line-clamp-2'>{item.title}</h1>
                    <p className='text-red-500 font-semibold text-lg'>${item.price}</p>
                  </div>
                </div>
              <div className='bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl'>
  <button onClick={() => updateQuantity(item.id, "decrease")}>-</button>
  <span>{item.quantity}</span>
  <button onClick={() => updateQuantity(item.id, "increase")}>+</button>
</div>

                <span onClick={() => deleteItem(item.id)} className='hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl'>
                  <FaRegTrashAlt className='text-red-500 text-2xl cursor-pointer' />
                </span>
              </div>
            ))}
          </div>

          {/* Delivery Info */}
          <div className='bg-gray-100 rounded-md p-7 mt-4 space-y-2 w-full md:w-1/2'>
            <h1 className='text-gray-800 font-bold text-xl'>Delivery Info</h1>

            <div className='flex flex-col space-y-1'>
              <label>Full Name</label>
              <input type="text" name="fullName" placeholder='Enter your name' className='p-2 rounded-md'
                value={deliveryInfo.fullName} onChange={handleInputChange} />
            </div>

            <div className='flex flex-col space-y-1'>
              <label>Address</label>
              <input type="text" name="address" placeholder='Enter your address' className='p-2 rounded-md'
                value={deliveryInfo.address} onChange={handleInputChange} />
            </div>

            <div className='flex w-full gap-5'>
              <div className='flex flex-col space-y-1 w-full'>
                <label>State</label>
                <input type="text" name="state" placeholder='Enter your state' className='p-2 rounded-md w-full'
                  value={deliveryInfo.state} onChange={handleInputChange} />
              </div>
              <div className='flex flex-col space-y-1 w-full'>
                <label>PostCode</label>
                <input type="text" name="postcode" placeholder='Enter your postcode' className='p-2 rounded-md w-full'
                  value={deliveryInfo.postcode} onChange={handleInputChange} />
              </div>
            </div>

            <div className='flex w-full gap-5'>
              <div className='flex flex-col space-y-1 w-full'>
                <label>Country</label>
                <input type="text" name="country" placeholder='Enter your country' className='p-2 rounded-md w-full'
                  value={deliveryInfo.country} onChange={handleInputChange} />
              </div>
              <div className='flex flex-col space-y-1 w-full'>
                <label>Phone No</label>
                <input type="text" name="phone" placeholder='Enter your Number' className='p-2 rounded-md w-full'
                  value={deliveryInfo.phone} onChange={handleInputChange} />
              </div>
            </div>

            <button onClick={handleSubmit} className='bg-red-500 text-white px-3 py-2 rounded-md mt-3 cursor-pointer w-full'>Submit</button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
          <h1 className='text-red-500/80 font-bold text-5xl text-muted'>Oh no! Your cart is empty</h1>
          <img src={emptyCart} alt="Empty Cart" className='w-[400px]' />
          <button onClick={() => navigate('/products')} className='bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer'>Continue Shopping</button>
        </div>
      )}
    </div>
  )
}

export default Cart
