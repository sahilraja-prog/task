import React, { useState } from 'react';
import axios from 'axios';

const PaymentPage = ({ duration, mentorId }) => {
  const [amount, setAmount] = useState(2000); // Default amount for 30 mins

  useEffect(() => {
    switch (duration) {
      case 45:
        setAmount(3000);
        break;
      case 60:
        setAmount(4000);
        break;
      default:
        setAmount(2000);
    }
  }, [duration]);

  const handlePayment = async () => {
    try {
      await axios.post('/api/payment', { duration, mentorId, amount });
      // Handle successful payment (e.g., redirect to confirmation page)
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <p>Total Amount: {amount}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentPage;
