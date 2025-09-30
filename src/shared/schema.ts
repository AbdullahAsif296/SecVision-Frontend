import { z } from "zod";

export const insertContactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export const insertDemoBookingSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  numberOfCameras: z.number().min(1, "At least 1 camera is required"),
  selectedDate: z.string().min(1, "Date is required"),
  selectedTime: z.string().min(1, "Time is required"),
});

export const insertStoreRegistrationSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  storeAddress: z.string().min(1, "Store address is required"),
  contactEmail: z.string().email("Invalid email address").min(1, "Email is required"),
  numberOfCameras: z.number().min(1, "At least 1 camera is required"),
  numberOfUsers: z.number().min(1, "At least 1 user is required"),
  totalPrice: z.string().min(1, "Total price is required"),
});

export type InsertContact = z.infer<typeof insertContactSchema> & { id?: string; createdAt?: Date };
export type InsertDemoBooking = z.infer<typeof insertDemoBookingSchema> & { id?: string; createdAt?: Date };
export type InsertStoreRegistration = z.infer<typeof insertStoreRegistrationSchema> & { id?: string; createdAt?: Date; paymentStatus?: string };

export type Contact = Required<InsertContact>;
export type DemoBooking = Required<InsertDemoBooking>;
export type StoreRegistration = Required<InsertStoreRegistration>;


