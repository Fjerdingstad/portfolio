<h1>Payment Simulator (Php)</h1>
<i>Technology: Php. </i> </br></br>
🇫🇷 Explications détaillées: [Notion (FR)](https://www.notion.so/chrisfjerd/Application-Service-de-paiement-3234edfe53284c918f8704b85adfcab4) <br/>
🇬🇧 🇺🇸 Project Details: [Notion (EN)](https://www.notion.so/chrisfjerd/EN-Payment-Service-Application-e5c90d74db3a4164985c91c0ae4e927e)
[Notion](https://www.notion.so/chrisfjerd/EN-Payment-Service-Application-e5c90d74db3a4164985c91c0ae4e927e)
<i>Simulated Payment from a webservice</i> <br/>
![alt text](https://github.com/Fjerdingstad/portfolio/blob/main/Php/PaymentApp/realPayment.png?raw=true) <br/>

<i>Randomly Simulated Payment</i> <br/>
![alt text](https://github.com/Fjerdingstad/portfolio/blob/main/Php/PaymentApp/simulatedPayment.png?raw=true)

A Php add made with composer that can simulate payments after inputting a credit card number. <br/>
Depending on the environment mentionned in the conf files, the payment can either be :
- Randomly simulated, which will randomly return a success response or a failed payment reponse,
- Simulated using a webservice, which will return a response mentionning the HTTP response code. If the response code is 400, the program will stop itself.

To make this possible, the app uses a controller and classes implementing an interface. Feel free to check the files for details.
