import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer'
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css'; 

export default function (props) {
    let options = props.options;
    let priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    let dispatch = useDispatchCart();
    let data = useCart();

    const priceRef = useRef();

    const handleAddTocart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === props.foodItems._id) {
                food = item;
                break;
            }
        }
        if (food.length !== 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalPrice, qty: qty });
                alertify.success("your Item is added into cart")
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size });
                //console.log(data);
                alertify.success("your Item is added into cart")
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size });
        alertify.success("your Item is added into cart")

    }
    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, [])
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.foodItems.img} className="card-img-top" alt="..." style={{ height: "180px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItems.name}</h5>
                        <div className='container w-100'>
                            <select className='m-2 h-100  bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {
                                    priceOptions.map((data) => {
                                        return (
                                            <option key={data} value={data}>{data}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className='d-inline h-100 fs-5'>
                                ₹{finalPrice}/-
                            </div>

                        </div>
                        <hr>
                        </hr>
                        <button className='btn btn-success justify-center ms-2' onClick={handleAddTocart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
