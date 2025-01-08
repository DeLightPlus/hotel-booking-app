import express from "express";
import dotenv from "dotenv";
import axios from "axios"; // Import axios

dotenv.config();
const router = express.Router();

// Function to fetch PayPal Access Token
const getAccessTokenV1 = async () => {
    try {
        // Make a POST request to obtain the access token
        const response = await axios.post(
            `${process.env.PAYPAL_BASEURL}/v1/oauth2/token`, // PayPal OAuth2 endpoint
            "grant_type=client_credentials", // PayPal expects URL-encoded form data
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded", // Correct Content-Type for this request
                },
                auth: {
                    username: process.env.PAYPAL_CLIENTID, // Use client ID from environment variables
                    password: process.env.PAYPAL_SECRET,  // Use secret from environment variables
                },
            }
        );

        // Return the access token
        return response.data.access_token;
    } catch (error) {
        console.error("Error fetching access token:", error.response?.data || error.message);
        throw new Error("Unable to fetch PayPal access token");
    }
};

const getAccessToken = async () => {
    try {
        // Make a POST request to obtain the access token
        const response = await axios.post(
            `${process.env.PAYPAL_BASEURL}/v1/oauth2/token`, // PayPal OAuth2 endpoint
            'grant_type=client_credentials', // PayPal expects URL-encoded form data
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Correct Content-Type for this request
                },
                auth: {
                    username: process.env.PAYPAL_CLIENTID, // Client ID from environment variables
                    password: process.env.PAYPAL_SECRET,  // Client Secret from environment variables
                },
            }
        );

        // Return the access token
        return response.data.access_token;
    } catch (error) {
        console.error("Error fetching access token:", error.response?.data || error.message);
        throw new Error("Unable to fetch PayPal access token");
    }
};

const createOrder = async (req, res) => {
    try {
        // Fetch PayPal access token
        const accessToken = await getAccessToken();
        console.log("AccessToken:", accessToken);

        // Define the order payload based on PayPal API documentation
        const orderPayload = {
            intent: "CAPTURE", // Payment flow type: CAPTURE or AUTHORIZE
            purchase_units: [
                {
                    invoice_id: "90210", // Optional: Unique invoice ID for the order
                    amount: {
                        currency_code: "USD",
                        value: "100.00", // Total amount for the order
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: "100.00", // Total amount for the items
                            },
                        },
                    },
                    items: [
                        {
                            name: "Room: REST-Le-BNB", // Item name
                            description: "Booking for room", // Description
                            quantity: "1", // Quantity
                            unit_amount: {
                                currency_code: "USD",
                                value: "100.00", // Price of the room
                            },
                            category: "PHYSICAL_GOODS", // Category type
                            sku: "room_sku_001", // SKU for this item (can be optional)
                        },
                    ],
                },
            ],
            payment_source: {
                paypal: {
                    experience_context: {
                        payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED", // Correct value for immediate payment
                        shipping_preference: "NO_SHIPPING", // No shipping required
                        locale: "en-US", // Locale setting
                        user_action: "PAY_NOW", // Button text on PayPal
                        return_url: `${process.env.PAYPAL_REDIRECT_BASEURL}/complete-payment`, // Return URL after payment
                        cancel_url: `${process.env.PAYPAL_REDIRECT_BASEURL}/cancel-payment`, // Cancel URL if payment is declined
                    },
                },
            },
        };

        // Make a POST request to create an order
        const response = await axios.post(
            `${process.env.PAYPAL_BASEURL}/v2/checkout/orders`,
            orderPayload, // Order details to be sent to PayPal
            {
                headers: {
                    "Content-Type": "application/json", // JSON body
                    Authorization: `Bearer ${accessToken}`, // Bearer token for authorization
                },
            }
        );

        // Log the PayPal response
        console.log("PayPal Response:", response.data);

        // Extract the order ID from PayPal's response
        const orderId = response.data.id;

        // Respond with the order ID (so the frontend can process it)
        return res.status(200).json({ orderId });
    } catch (error) {
        // Handle error and respond with an error message
        console.error("Error creating PayPal order:", error.response?.data || error.message);
        return res.status(500).json({ message: "Failed to create order" });
    }
};

const capturePayment = async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const { orderID } = req.params;

        console.log(accessToken, " : AccesssToken , OrderID: ", orderID)

        const captureResponse = await axios.post(
            `${process.env.PAYPAL_BASEURL}/v2/checkout/orders/${orderID}/capture`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        console.log("Capture Respoonse: ", captureResponse);

        if (captureResponse.data.status === "COMPLETED") 
        {
            // Mock user data
            const user = {
                email: "user@example.com",
                roomBooked: "Room 1",
                nights: "3",
                curDate: new Date(),
            };

            return res.status(200).json({
                status: "COMPLETED",
                message: "Payment captured successfully.",
                user,
            });
        } else {
            return res.status(400).json({ error: "Payment capture failed" });
        }
    } catch (error) {
        console.error("Error capturing PayPal payment:", error);
        return res.status(500).json({ message: "Failed to capture payment" });
    }
};


// Define the route for creating an order
router.get('/getAccessToken', async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch access token' });
    }
});


router.post("/createOrder", createOrder);
router.post("/capturePayment/:orderID", capturePayment);

export default router;
