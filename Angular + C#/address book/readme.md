<h1>Address Book - an Angular/C# web application.</h1>

<i>Technology: Angular, C#, mySQL, Angular Material.</i> <br/>
<i>Uses of routing, component structuring, services.</i>

![alt text](https://github.com/Fjerdingstad/portfolio/blob/main/Angular%20%2B%20C%23/address%20book/addressbook_create.png?raw=true)

My first experience with Angular and C# (ASP.NET), a web application made with Angular and C# that uses 2 APIs: <br/>
One API Rest to interact with the addresses (to show, create, update and delete),
A second api, Geo API allowing to match the postal code to the corresponding city automatically.

Using the form, you can create an Address by entering a first name, last name, addresses , postal codes and a city.
Clicking the save button will execute a create method, adding the Address to the mysql database.
Entering the postal code will automatically show in the City input, all the corresponding cities avaible.

On the left tab are all the addresses. Clicking on a address will fill in the inputs, allowing the user to update informations. Clicking on the dots next to the address will allow the user to delete the address.



