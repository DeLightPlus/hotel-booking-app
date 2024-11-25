import "./contact.css"
import { Link } from "react-router-dom";

const Contact = () => {
    return ( 
        <div className="contact-container">
            
            <div className="map">
                <div className="x-flex-item1">
                    <h2>GET IN TOUCH</h2>
                    <p>Feel free to reach out to our team – we’re here to assist you every step of the way.</p>
                    <p>
                        Our team is ready to provide expert guidance and support. Whether you need information or have specific questions, we're here to help make your experience seamless and enjoyable. 
                        Don't hesitate to contact us—your satisfaction is our priority.
                    </p>
                </div>

                <div className="gmap-frame">    
                    <h4>Polokwane, Limpopo Connexion</h4>                    
                    <iframe width="100%" height="100%" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0" 
                            src="https://maps.google.com/maps?width=100%&amp;height=100%&amp;hl=en&amp;q=polokwane+(Limpopo%20Connexion)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                            <Link href="https://www.gps.ie/">gps trackers</Link>
                    </iframe>                        
                </div>  
            </div>

            <div className="contact-us-form">
                <form action="">
                    <div className="form-group">
                        <div className="x-flex-item1">
                            <label >Name:
                                <input type="text" id="name" placeholder="Name"/>
                            </label>

                            <label>Email:
                                <input type="email" id="email" placeholder="Email"/>
                            </label>
                        </div>

                        <label className="msg">Message:
                            <textarea type="text" id="msg" placeholder="Message"/>
                        </label>

                        <button>GET A QUOTE</button>
                    </div>
                </form>
            </div>

            <div className="com">
                <div className="com-container">
                    <div className="com-card">
                        <h2>Visit us</h2>
                        <p>
                            Address: 123 Main St, Anytown, USA 12345
                        </p>
                    </div>

                    <div className="com-card">
                        <h2>Call us</h2>
                        <p> 555-555-5555</p>
                        <p> 555-555-5555</p>
                    </div>

                    <div className="com-card">
                        <h2>Email us</h2>
                        <p><a href="mailto:info@example.com">info@example.com</a></p>
                        <p><a href="mailto:info@example.com">info@example.com</a></p>
                    </div>
                </div>
                
                <p>Hours: Mon - Fri, 9am - 5pm</p>
                <p>Follow us on social media:</p>
                <ul>
                    <li>
                        <a href="https://www.facebook.com/">
                            <i className="fa fa-facebook"></i>
                        </a>
                    </li>
                        
                    <li>
                        <a href="https://www.instagram.com/">
                            <i className="fa fa-instagram"></i>
                        </a>
                    </li>
                </ul>                    
            </div>
            
        </div>
     );
}
 
export default Contact;