// src/components/FAQ.jsx
import React, { useState } from "react";
import "./FAQ.css"; // Import the CSS file

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the selected answer
  };

  const faqItems = [
    {
      question: "Are there activities for children at the resort?",
      answer:
        "Yes, we have a dedicated kids' club with fun and educational activities for children of all ages, as well as family-friendly amenities like child care services, family pools, and guided nature tours designed for young guests."
    },
    {
      question: "What dining options are available at the resort?",
      answer:
        "Our resort features multiple dining options, including a fine dining restaurant, casual poolside lounges, and in-room dining. We offer a variety of international cuisines and locally inspired dishes, all curated by our team of renowned chefs."
    },
    {
      question: "Can I host a wedding or event at the resort?",
      answer:
        "Absolutely! We specialize in hosting luxurious weddings and private events. Our experienced events team will assist with everything from planning the decor and menu to coordinating with local vendors and ensuring every detail is perfect for your special day."
    },
    {
      question: "Are there activities and excursions available at the resort?",
      answer:
        "Yes, we offer a wide range of activities and excursions, from water sports like snorkeling, scuba diving, and kayaking to land-based activities such as guided hikes, golf, and cultural tours. We also provide private experiences, including yacht charters and sunset cruises."
    },
    {
      question: "Can I request early check-in or late check-out?",
      answer:
        "We offer early check-in and late check-out options based on availability. Please contact our front desk or concierge team in advance to arrange these services, or request during your booking for the best chance of availability."
    }
  ];

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqItems.map((item, index) => (
          <div className="faq-item" key={index}>
            <div
              className="faq-question"
              onClick={() => toggleAnswer(index)}
              aria-expanded={activeIndex === index}
              role="button"
              aria-controls={`answer-${index}`}
            >
              <span className="faq-toggle-icon">
                {activeIndex === index ? "−" : "+"}
              </span>
              {item.question}
            </div>
            
            {activeIndex === index && (
              <div
                id={`answer-${index}`}
                className="faq-answer"
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
