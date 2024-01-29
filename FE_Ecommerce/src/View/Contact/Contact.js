/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { hasSpecialCharacters } from '../../Validate/Validate';

const Contact = () => {
    const formRef = useRef();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    const [isLoading, setIsLoading] = useState(false)

    const sendEmail = (e) => {
    setIsLoading(true)
    e.preventDefault();
        // if(!formData.name || !formData.email || !formData.subject || !formData.message){
        //     toast.warning("Please enter complete information!")
        //     setIsLoading(false)
        //     return;
        // }
        // if(
        //     hasSpecialCharacters(formData.name) ||
        //     hasSpecialCharacters(formData.email) ||
        //     hasSpecialCharacters(formData.subject) ||
        //     hasSpecialCharacters(formData.message)
        // ){
        //     toast.warning("Please do not enter special characters!")
        //     setIsLoading(false)
        //     return;
        // }
    emailjs.sendForm('service_426ajhc', 'template_s6gdqlm', formRef.current, 'siogmmRkFzDBh2jmb')
      .then((response) => {
        if(response.status === 200){
            toast.success("Gửi Mail Thành Công!")
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
          });
        }
      }, (error) => {
        toast.error("Lỗi hệ thống. Vui lòng thử lại sau!")
      })
      .finally(()=> {
        setIsLoading(false);
      }) 
  };
  return (
    <>
    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    <Link className="breadcrumb-item text-dark" to="/">Home</Link>
                    <span className="breadcrumb-item active">Contact</span>
                </nav>
            </div>
        </div>
    </div>
    <div className="container-fluid">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Contact Us</span></h2>
        <div className="row px-xl-5">
            <div className="col-lg-7 mb-5">
                <div className="contact-form bg-light p-30">
                    <div id="success"></div>
                    <form name="sentMessage" className='w-100' id="contactForm" noValidate="novalidate" ref={formRef}
                    onSubmit={sendEmail}>
                        <div className="control-group fadeInUp">
                            <input type="text" className="form-control"  name='name' placeholder="Your Name"
                                required="required" data-validation-required-message="Please enter your name" autoComplete='off'/>
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group fadeInUp">
                            <input type="email" className="form-control"  name='email' placeholder="Your Email"
                                required="required" data-validation-required-message="Please enter your email" autoComplete='off'/>
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group fadeInUp">
                            <input type="text" className="form-control"  name='subject' placeholder="Subject"
                                required="required" data-validation-required-message="Please enter a subject" autoComplete='off'/>
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group fadeInUp">
                            <textarea className="form-control" rows="8"  name='message' placeholder="Message"
                                required="required"
                                data-validation-required-message="Please enter your message"></textarea>
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className='bounceInRight'>
                            <button className="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton">Send
                                Message</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-lg-5 mb-5">
                <div className="bg-light p-30 mb-30 bounceIn" style={{height: "62%"}}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.281143007167!2d108.2640232750758!3d15.998873684670462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314210c6a4cac415%3A0xe9d6d2522fb9b8ff!2zMTggTmd1eeG7hW4gTmdoaeG7hW0sIEhvw6AgSOG6o2ksIE5nxakgSMOgbmggU8ahbiwgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1703609707087!5m2!1sen!2s" width="100%" height="100%" style={{border: "0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                </iframe>
                </div>
                <div className="bg-light p-30 mb-3 ">
                    <p className="mb-2 fadeInDown"><i className="fa fa-map-marker-alt text-primary mr-3 "></i>18 Nguyễn Nghiễm, Ngũ Hành Sơn</p>
                    <p className="mb-2 fadeInDown"><i className="fa fa-envelope text-primary mr-3"></i>trungnb@vnext.vn</p>
                    <p className="mb-2 fadeInDown"><i className="fa fa-phone-alt text-primary mr-3"></i>+84 913 562 870</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Contact