/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div class="container-fluid bg-dark text-secondary mt-5 pt-5">
        <div class="row px-xl-5 pt-5">
            <div class="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                <h5 class="text-secondary text-uppercase mb-4">Get In Touch</h5>
                <p class="mb-4">No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et dolor sed dolor. Rebum tempor no vero est magna amet no</p>
                <p class="mb-2"><i class="fa fa-map-marker-alt text-primary mr-3"></i>18 Nguyễn Nghiễm, Ngũ Hành Sơn</p>
                <p class="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>trungnb@vnext.vn</p>
                <p class="mb-0"><i class="fa fa-phone-alt text-primary mr-3"></i>+84 913 562 870</p>
            </div>
            <div class="col-lg-8 col-md-12">
                <div class="row">
                    <div class="col-md-4 mb-5">
                        <h5 class="text-secondary text-uppercase mb-4">Quick Shop</h5>
                        <div class="d-flex flex-column justify-content-start">
                            <Link class="text-secondary mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Home</Link>
                            <Link class="text-secondary mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Product</Link>
                            <Link class="text-secondary mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Product Detail</Link>
                            <Link class="text-secondary mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Cart</Link>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <h5 class="text-secondary text-uppercase mb-4">My Account</h5>
                        <div class="d-flex flex-column justify-content-start">
                            <Link class="text-secondary mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Your Information</Link>
                            <Link class="text-secondary" href="#"><i class="fa fa-angle-right mr-2"></i>Contact Us</Link>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <h5 class="text-secondary text-uppercase mb-4">Newsletter</h5>
                        <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
                        <h6 class="text-secondary text-uppercase mt-4 mb-3">Follow Us</h6>
                        <div class="d-flex">
                            <Link class="btn btn-primary btn-square mr-2" to="https://www.w3schools.com/react/react_usestate.asp" target='_blank'><i class="fab fa-twitter"></i></Link>
                            <Link class="btn btn-primary btn-square mr-2" to="https://www.w3schools.com/react/react_usestate.asp" target='_blank'><i class="fab fa-facebook-f"></i></Link>
                            <Link class="btn btn-primary btn-square mr-2" to="https://www.w3schools.com/react/react_usestate.asp" target='_blank'><i class="fab fa-linkedin-in"></i></Link>
                            <Link class="btn btn-primary btn-square" to="https://www.w3schools.com/react/react_usestate.asp" target='_blank'><i class="fab fa-instagram"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer
