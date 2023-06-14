import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Contact } from './models/contact.model';
import { Addresses } from './models/geo-api.model';
import { ContactsService } from './service/contacts.service';
import { GeoApiService } from './service/geo-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  pageTitle = 'Create a contact';
  submitBtn = 'Save';
  contactInfo: boolean = true;

  // Form
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  address1 = new FormControl('', [Validators.required]);
  postalCode1 = new FormControl('', [Validators.required]);
  city1 = new FormControl('', [Validators.required]);

  // Contact api
  contacts: Contact[] = [];
  contact: Contact = {
    contactId: '',
    contactFirstName: '',
    contactLastName: '',
    contactAddress1: '',
    contactPostalCode1: '',
    contactAddress2: '',
    contactPostalCode2: '',
    contactCity1: '',
    contactCity2: '',
  };

  // City api
  geo: Addresses[] = [];
  ge: Addresses = {
    nom: '',
  };
  geo2: Addresses[] = [];
  ge2: Addresses = {
    nom: '',
  };

  constructor(
    private contactService: ContactsService,
    private geoapiService: GeoApiService
  ) {}

  ngOnInit(): void {
    this.getAllContacts(); //when page loads, call method to get all contacts from service
  }

  getAllContacts() {
    this.contactService
      .getAllContacts() //since it calls an observable, need to subscribe to it
      .subscribe((response) => {
        this.contacts = response;
        // console.log(response); //when you subscribe, you get a response, so need to define it
      });
  }

  onSubmit() {
    if (this.contact.contactId === '') {
      // console.log(this.contact);
      this.contactService.addContact(this.contact).subscribe((response) => {
        this.getAllContacts(); //updates the grid
        this.contact = {
          contactId: '',
          contactFirstName: '',
          contactLastName: '',
          contactAddress1: '',
          contactPostalCode1: '',
          contactAddress2: '',
          contactPostalCode2: '',
          contactCity1: '',
          contactCity2: '',
        }; //this clears out the form
      });
    } else {
      this.updateContact(this.contact);
      this.submitBtn = 'Save';
      this.pageTitle = 'Create a contact';
      this.contactInfo = true;
    }
  }

  deleteContact(id: string) {
    this.contactService.deleteContact(id).subscribe((response) => {
      this.getAllContacts();
      this.contact = {
        contactId: '',
        contactFirstName: '',
        contactLastName: '',
        contactAddress1: '',
        contactPostalCode1: '',
        contactAddress2: '',
        contactPostalCode2: '',
        contactCity1: '',
        contactCity2: '',
      };
      this.pageTitle = 'Create a contact';
      this.contactInfo = true;
    });
  }

  populateForm(contact: Contact) {
    this.contact = contact;
    this.submitBtn = 'Update';
    this.pageTitle =
      'Contact: ' +
      this.contact.contactFirstName +
      ' ' +
      this.contact.contactLastName;
    this.contactInfo = false;
  }

  updateContact(contact: Contact) {
    this.contactService.updateContact(contact).subscribe((response) => {
      this.getAllContacts();
      this.contact = {
        contactId: '',
        contactFirstName: '',
        contactLastName: '',
        contactAddress1: '',
        contactPostalCode1: '',
        contactAddress2: '',
        contactPostalCode2: '',
        contactCity1: '',
        contactCity2: '',
      }; //this clears out the form
    });
  }

  // City api functions
  getCity(codesPostaux: string) {
    this.geoapiService.getCity(codesPostaux).subscribe((response) => {
      this.geo = response;
    });
  }
  getCity2(codesPostaux: string) {
    this.geoapiService.getCity2(codesPostaux).subscribe((response) => {
      this.geo2 = response;
    });
  }

  // form
  resetContactForm() {
    this.contact = {
      contactId: '',
      contactFirstName: '',
      contactLastName: '',
      contactAddress1: '',
      contactPostalCode1: '',
      contactAddress2: '',
      contactPostalCode2: '',
      contactCity1: '',
      contactCity2: '',
    };
    this.pageTitle = 'Create a contact';
    this.contactInfo = true;
    this.submitBtn = 'Save';
  }
}
