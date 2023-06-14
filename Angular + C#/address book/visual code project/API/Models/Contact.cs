using System.ComponentModel.DataAnnotations;

namespace test_project2_backend.Models
{
    public class Contact
    {
        [Key]
        public Guid ContactId { get; set; }

        public string ContactFirstName { get; set; }
        public string ContactLastName { get; set; }
        public string ContactAddress1 { get; set; }
        public string ContactPostalCode1 { get; set; }
        public string ContactAddress2 { get; set; }
        public string ContactPostalCode2 { get; set; }
        public string ContactCity1 { get; set; }

        public string ContactCity2 { get; set; }

    }
}
