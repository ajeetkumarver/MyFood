import React from 'react'

export default function  () {
  return (
    <div> 
        <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src="https://img.freepik.com/free-photo/fresh-gourmet-meal-beef-taco-salad-plate-generated-by-ai_188544-13382.jpg?w=2000&t=st=1704028296~exp=1704028896~hmac=36fa40886937b5a80f245f1922fa1bd770f3772332d130035830cd7663c98107" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some important text.</p>
                        <div className='container w-100'>
                            <select className='m-2 h-100  bg-success rounded'>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100  bg-success rounded'>
                                <option value="half">Half</option>
                                <option value="full">Full</option>
                            </select>
                            <div className='d-inline h-100 fs-5'>
                                Total Price:
                            </div>

                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}
