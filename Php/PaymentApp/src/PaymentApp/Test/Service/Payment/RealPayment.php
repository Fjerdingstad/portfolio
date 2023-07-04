<?php

namespace PaymentApp\Test\Service\Payment;

class RealPayment implements Payment
{
    private $creditCardNumber;
    /**
     * Takes the credit card number as a parameter and stores it in the private $creditCardNumber property
     *
     * @param [type] $creditCardNumber
     */
    public function __construct($creditCardNumber)
    {
        $this->creditCardNumber = $creditCardNumber;
    }
    /**
     * Performs the payment process: sends a POST request to the URL with the credit card number and makes an HTTP request
     *
     * @return string the HTTP code and the payment status response
     */
    public function doPayment(): string
    {
        // POST Data
        $postData = [
            'credit-card-number' => $this->creditCardNumber
        ];

        // HTTP request configuration
        $options = [
            'http' => [
                'method' => 'POST',
                'header' => 'Content-Type: application/x-www-form-urlencoded', // here the server is going to process the data as a form data, which is more often the case
                'content' => http_build_query($postData)
            ]
        ];

        // Request context
        $context = stream_context_create($options);

        // Perform HTTP request
        $response = file_get_contents('https://url.com/exemple.php', false, $context); //false here to prevent HTTP redirections

        // HTTP response section
        $domain1 = "https://url.com/exemple.php";
        /**
         * Gets the HTTP response code, if the response code is different than 200, stops the process
         *
         * @param string $domain1 the URL
         * @return string HTTP request header
         */
        function get_http_response_code(string $domain1): string
        {
            $headers = get_headers($domain1);
            return substr($headers[0], 9, 3);
        }

        $get_http_response_code = get_http_response_code($domain1);

        echo $get_http_response_code;

        // Check HTTP response code is 200 or not
        if ($get_http_response_code == 200)
            if ($response === 'OK') {
                return 'Real OK';
            } else {
                return 'Real KO';
            }
        else
            die(" Error: Unexpected Response");
    }
}
