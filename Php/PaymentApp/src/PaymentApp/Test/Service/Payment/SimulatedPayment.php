<?php

namespace PaymentApp\Test\Service\Payment;

class SimulatedPayment implements Payment
{
    private $creditCardNumber;
    /**
     * Takes the credit card number as a parameter and stores it in the private $creditCardNumber property allowing the user to initialize an instance of SimulatedPayment
     *
     * @param [type] $creditCardNumber
     */
    public function __construct($creditCardNumber)
    {
        $this->creditCardNumber = $creditCardNumber;
    }

    /**
     * Randomly generates a 0 or a 1. If the number is 1, returns 'OK', otherwise returns 'KO' then returns a string with the payment status
     *
     * @return string the payment status
     */
    public function doPayment(): string
    {

        $paymentStatus = (rand(0, 1) == 1) ? 'OK' : 'KO';

        return "Simulated " . $paymentStatus;
    }
}
