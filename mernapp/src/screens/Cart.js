import React from 'react'
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css'; 
import yourImage from './logo-color.png'; 

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  const handleRemove = (index)=>{
    console.log(index,data)

    dispatch({type:"REMOVE",index:index})
  }

  const handleCheckOut = async () => {
    console.log("called");
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:5001/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
      alertify.success('Congratulations !! Your order is placed');
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)



  const initPayment = (data) => {
    const options = {
        key: "rzp_test_GODY7nXJ8BiC5b",
        amount: data.amount,
        currency: data.currency,
        name: "MyFood",
        description: "Test Transaction",
        image: yourImage,
        order_id: data.id,
        handler: async (response) => {
            try {
                const verifyUrl = "http://localhost:5001/api/verifyPayment";
                const verifyResponse = await fetch(verifyUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(response),
                });
             console.log(verifyResponse);
                if (verifyResponse.status===200) {
                    const data = await verifyResponse.json();
                    
                    handleCheckOut();
                    console.log(data);
                } else {
                    console.log('Error:', verifyResponse.status);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        },
        
        theme: {
            color: "#3399cc",
        },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
};

const handlePayment = async () => {
    try {
        const orderUrl = "http://localhost:5001/api/payment";
        const response = await fetch(orderUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: totalPrice }),
        });
    
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            initPayment(data.data);
        } else {
            console.log('Error:', response.status);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
    
};




  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index })
                alertify.success("Item is removed from cart")  }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handlePayment} > Check Out </button>
        </div>
      </div>



    </div>
  )
}