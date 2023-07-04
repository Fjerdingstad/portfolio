<?php

namespace PaymentApp\Test\Service\Payment;

class PaymentFactory
{
    /**
     * Fetches the environment from the configuration and creates the corresponding payment instance
     *
     * @param [type] $creditCardNumber
     * @return Payment object implementing Payment interface
     */
    public static function createPayment($creditCardNumber): Payment
    {
        // Retrieve the environment configuration from the conf.json file
        $config = json_decode(file_get_contents(ROOT_DIR . '/etc/conf.json'), true);
        $env = $config['env'];

        // Creates the appropriate payment instance based on the environment
        if ($env === 'test') {
            return new SimulatedPayment($creditCardNumber);
        } elseif ($env === 'real') {
            return new RealPayment($creditCardNumber);
        } else {
            throw new \Exception('Invalid environment specified in the configuration');
        }
    }
}
