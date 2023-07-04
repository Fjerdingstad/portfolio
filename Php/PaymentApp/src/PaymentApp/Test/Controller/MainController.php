<?php

namespace PaymentApp\Test\Controller;

use PaymentApp\Test\Service\Payment\PaymentFactory;

class MainController
{
    /**
     * Given the Credit Card Number, will determine via PaymentFactory the type of payment, proceed with the payment and return its status
     *
     * @param [type] $creditCardNumber
     * @return string|null the payment status
     */
    public function run($creditCardNumber): ?string
    {
        // Create a payment instance using the PaymentFactory to determine the corresponding payment type
        $payment = PaymentFactory::createPayment($creditCardNumber);

        // Proceed with the payment
        $paymentStatus = $payment->doPayment();

        // Return the payment status
        return $paymentStatus;
    }
}
