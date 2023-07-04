<?php

namespace PaymentApp\Test\Service\Payment;

interface Payment
{
    /**
     * @param string $creditCardNumber
     */
    public function __construct($creditCardNumber);


    /**
     * Proceed to payment
     *
     * @return string payment status (OK or KO)
     */
    public function doPayment(): string;
}
