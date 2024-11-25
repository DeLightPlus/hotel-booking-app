import React from 'react';
import PropTypes from 'prop-types'; // Add PropTypes
import './about.css'; // Import the CSS for styling

// Component for individual grid item
function GridItem({ imageSrc, text, altText }) {
    return (
        <div className="about-grid-item">
            <img src={imageSrc} alt={altText} className="grid-image" />
            <TextBlock text={text} />
        </div>
    );
}

GridItem.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
};

// Component for Text Block (displaying text)
function TextBlock({ text }) {
    return (
        <div className="text-block">
            <p>{text}</p>
        </div>
    );
}

TextBlock.propTypes = {
    text: PropTypes.string.isRequired,
};

// Main AboutUs Component
const AboutUs = () => {
    const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.";
    const defaultImage = "https://via.placeholder.com/300"; // Placeholder image URL for demo
    
    return (
        <>
        <div className="about-us">
            {/* <h2 className="about-title">About Us</h2> */}
            <div className="about-container">
                {/* Render multiple Grid Items (except the last one) */}
                <GridItem imageSrc={defaultImage} text={loremText} altText="Image 1" />
                <GridItem imageSrc={defaultImage} text={loremText} altText="Image 2" />
                <GridItem imageSrc={defaultImage} text={loremText} altText="Image 3" />
                <GridItem imageSrc={defaultImage} text={loremText} altText="Image 4" />
            </div>           
            
        </div>
        {/* Last Grid Item outside the Grid Container */}
        
        </>
    );
}

export default AboutUs;
