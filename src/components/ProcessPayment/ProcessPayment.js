import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import SimpleCartForm from '../SimpleCartForm/SimpleCartForm';
import SpliteCardForm from '../SpliteCardForm/SpliteCardForm';

const stripePromise = loadStripe('pk_test_51IeNBEBRWKh8lFsTNRoJwoSCs42J7P4naVaaTOLPxvh7K53rGAHS0Zl6vDbjqn2WatJlLif2rwkXj6InjacFlCcw00UqgmHl5Q');
const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
           <SimpleCartForm handlePayment={handlePayment}></SimpleCartForm>
           {/* <SpliteCardForm></SpliteCardForm> */}
        </Elements>
    );
};

export default ProcessPayment;