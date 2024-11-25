import './HotelReview.css'; // Importing the CSS for styling

import HotelReview from "./HotelReview";

const Testimonials = () => {
    return (  
        <div className="testimonials">
            <h2>Guest Testimonials</h2>
            <HotelReview
                imageUrl="https://darrelhotels.com/wp-content/uploads/2024/10/giving-passports-to-hotel-receptionist-2023-11-27-05-28-44-utc-Cropped.jpg"
                name="Bruce Mitchell"
                title="A truly luxurious experience."
                testimonial="Hoteluxe exceeded all my expectations. From the moment I walked in, the service was impeccable, and the ambiance was pure elegance. The room was spacious, with breathtaking views, and every detail screamed luxury, from the fine linens to the state-of-the-art amenities. The staff went above and beyond to ensure I felt pampered throughout my stay. It’s hands down the best hotel experience I’ve ever had, and I look forward to returning."
                rating={5}
            />
            <HotelReview
                imageUrl="https://darrelhotels.com/wp-content/uploads/2024/10/the-receptionist-at-the-counter-meets-guests-with-2024-02-07-20-23-54-utc-Cropped.jpg"
                name="Sandiago Martin"
                title="An oasis of tranquility and elegance."
                testimonial="Hoteluxe provided the perfect escape from my busy life. The atmosphere is serene, and every space within the hotel is designed with sophistication. My suite was spacious, the bed was like sleeping on a cloud, and the private balcony had stunning views of the city. The staff were incredibly professional and discreet, making sure every need was met. I’ve stayed at many luxury hotels, but Hoteluxe truly stands out for its elegance and personalized service."
                rating={5}
            />
            
        </div>
    );
}
 
export default Testimonials;