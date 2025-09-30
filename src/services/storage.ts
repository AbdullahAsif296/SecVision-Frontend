import { randomUUID } from "crypto";
import type { Contact, DemoBooking, InsertContact, InsertDemoBooking, InsertStoreRegistration, StoreRegistration } from "@shared/schema";

class MemStorage {
  private contacts = new Map<string, Contact>();
  private demoBookings = new Map<string, DemoBooking>();
  private storeRegistrations = new Map<string, StoreRegistration>();

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = {
      ...insertContact,
      company: insertContact.company ?? null,
      id,
      createdAt: new Date(),
    } as Contact;
    this.contacts.set(id, contact);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createDemoBooking(insertBooking: InsertDemoBooking): Promise<DemoBooking> {
    const id = randomUUID();
    const booking: DemoBooking = { ...insertBooking, id, createdAt: new Date() } as DemoBooking;
    this.demoBookings.set(id, booking);
    return booking;
  }

  async getAllDemoBookings(): Promise<DemoBooking[]> {
    return Array.from(this.demoBookings.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createStoreRegistration(insertRegistration: InsertStoreRegistration): Promise<StoreRegistration> {
    const id = randomUUID();
    const registration: StoreRegistration = {
      ...insertRegistration,
      id,
      paymentStatus: "pending",
      createdAt: new Date(),
    } as StoreRegistration;
    this.storeRegistrations.set(id, registration);
    return registration;
  }

  async getAllStoreRegistrations(): Promise<StoreRegistration[]> {
    return Array.from(this.storeRegistrations.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }
}

export const storage = new MemStorage();


