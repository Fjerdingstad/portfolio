import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  //for the contact API
  baseUrl = 'https://localhost:7083/api/contact'; //this is the ["api/[controller]"] in the ContactController.cs

  constructor(private http: HttpClient) {}

  //Get all Contacts
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseUrl); //needs a model to map this on, the <contact[]> model
  }

  addContact(contact: Contact): Observable<Contact> {
    contact.contactId = '00000000-0000-0000-0000-000000000000'; //need to initialise the ID bc an empty GUID cant be a 0
    return this.http.post<Contact>(this.baseUrl, contact);
  }

  deleteContact(id: string): Observable<Contact> {
    return this.http.delete<Contact>(this.baseUrl + '/' + id); //add /id bc the backend delete function takes the baseurl + the id in the route
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(
      this.baseUrl + '/' + contact.contactId,
      contact
    );
  }
}
