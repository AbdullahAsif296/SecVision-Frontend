"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertDemoBookingSchema, type InsertDemoBooking } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Calendar as CalendarIcon, Clock, Building, Mail, Camera } from "lucide-react";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

export default function DemoBooking() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertDemoBooking>({
    resolver: zodResolver(insertDemoBookingSchema),
    defaultValues: {
      companyName: "",
      email: "",
      numberOfCameras: 1,
      selectedDate: "",
      selectedTime: "",
    },
  });

  const demoMutation = useMutation({
    mutationFn: async (data: InsertDemoBooking) => {
      return apiRequest("POST", "/api/demo-booking", data);
    },
    onSuccess: () => {
      toast({
        title: "Demo booked successfully!",
        description: "We\'ll send you a confirmation email with meeting details.",
      });
      form.reset();
      setSelectedDate(undefined);
      queryClient.invalidateQueries({ queryKey: ["/api/demo-bookings"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to book demo. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertDemoBooking) => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        description: "Choose a date for your demo appointment.",
        variant: "destructive",
      });
      return;
    }

    const formattedData = {
      ...data,
      selectedDate: selectedDate.toISOString().split('T')[0],
    };

    demoMutation.mutate(formattedData);
  };

  return (
    <Layout>
      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Book Your Demo
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              See SecureVision in action with a personalized demonstration. Our experts will show you how our AI technology can enhance your security infrastructure.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Demo Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="glassmorphism rounded-2xl p-8 mb-8">
                  <h2 className="text-2xl font-bold mb-6">What to Expect</h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">30-45 Minutes</h3>
                        <p className="text-muted-foreground">Comprehensive walkthrough of SecureVision&apos;s capabilities</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Live AI Detection</h3>
                        <p className="text-muted-foreground">See real-time threat detection and alert systems in action</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Custom Solution</h3>
                        <p className="text-muted-foreground">Tailored recommendations for your specific business needs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Booking Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="glassmorphism rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-6">Schedule Your Demo</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Your Company Name" data-testid="input-company-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" placeholder="you@company.com" data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="numberOfCameras"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Cameras</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="number" 
                                min="1" 
                                max="1000"
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                placeholder="10" 
                                data-testid="input-cameras" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <label className="block text-sm font-medium mb-2">Select Date</label>
                        <div className="glassmorphism rounded-lg p-4">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                            className="rounded-md"
                            data-testid="calendar-date-picker"
                          />
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="selectedTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Time</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-time">
                                  <SelectValue placeholder="Select a time slot" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                        disabled={demoMutation.isPending}
                        data-testid="button-book-demo"
                      >
                        {demoMutation.isPending ? "Booking..." : "Book Demo"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
