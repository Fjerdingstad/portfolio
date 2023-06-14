using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using test_project2_backend.Data;
using test_project2_backend.Models;

namespace test_project2_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")] //Url link to access all contacts which is linked in a var in the UI Service
    public class ContactController : Controller
    {

        // Create constructor with Context to access the Database
        private readonly ContactDBContext contactDBContext;

        public ContactController(ContactDBContext contactDBContext)
        {
            this.contactDBContext = contactDBContext;
        }

        //Get All Contacts
        [HttpGet]
        public async Task<IActionResult> GetAllContacts()
        {
            var contacts = await contactDBContext.Contact.ToListAsync();
            return Ok(contacts); //200 success response
        }

        //Get One Contact
        [HttpGet]
        [Route("{id:guid}")] //for one contact, so route is id
        [ActionName("GetContact")]
        public async Task<IActionResult> GetContact([FromRoute] Guid id)
        {
            var contact = await contactDBContext.Contact.FirstOrDefaultAsync(x => x.ContactId == id); //so that it takes the id we passed, so this line fetches said contact
            if (contact != null)
            {
                return Ok(contact);
            }
            return NotFound("Contact not found");
        }

        //To add contacts
        [HttpPost] //add method is post method
        public async Task<IActionResult> AddContact([FromBody] Contact contact)
        {
            contact.ContactId = Guid.NewGuid(); //the api automatically creates the id

            await contactDBContext.Contact.AddAsync(contact);
            await contactDBContext.SaveChangesAsync(); //saves changes to database (via the context)
            return CreatedAtAction(nameof(GetContact), new { id = contact.ContactId }, contact); //this will create a success 201 response (resource created) with route values (id)

        }

        // To update a contact
        [HttpPut]
        [Route("{id:guid}")] // updating a single contact, so route is an id, it has {} so it can assign parameter and not be a string
        public async Task<IActionResult> UpdateContact([FromRoute] Guid id, [FromBody] Contact contact) //from body to update with values from body
        {
            var existingContact = await contactDBContext.Contact.FirstOrDefaultAsync(x => x.ContactId == id);
            if (existingContact != null)
            {
                existingContact.ContactFirstName = contact.ContactFirstName; //to update details coming from UpdateContact
                existingContact.ContactLastName = contact.ContactLastName;
                existingContact.ContactAddress1 = contact.ContactAddress1;
                existingContact.ContactPostalCode1 = contact.ContactPostalCode1;
                existingContact.ContactAddress2 = contact.ContactAddress2;
                existingContact.ContactPostalCode2 = contact.ContactPostalCode2;
                existingContact.ContactCity1 = contact.ContactCity1;
                existingContact.ContactCity2 = contact.ContactCity2;
                await contactDBContext.SaveChangesAsync();
                return Ok(existingContact); //this is updated 
            }

            return NotFound("Contact not found");

        }

        // To delete a contact
        [HttpDelete]
        [Route("{id:guid}")] //need route bc need to delete a single card
        public async Task<IActionResult> DeleteContact([FromRoute] Guid id) //only need the Id to delete the corresponding contact
        {
            var existingContact = await contactDBContext.Contact.FirstOrDefaultAsync(x => x.ContactId == id);
            if (existingContact != null)
            {
                contactDBContext.Remove(existingContact); //to remove a contact
                await contactDBContext.SaveChangesAsync();
                return Ok(existingContact);
            }

            return NotFound("Contact not found");

        }

    }
}
