"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertStoreRegistrationSchema, type InsertStoreRegistration } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Building, Camera, Users, CreditCard, Check } from "lucide-react";

const CAMERA_PRICE = 49;
const USER_PRICE = 19;

export default function Registration() {
  const [step, setStep] = useState(1);
  const [quote, setQuote] = useState<number>(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertStoreRegistration>({
    resolver: zodResolver(insertStoreRegistrationSchema),
    defaultValues: {
      storeName: "",
      storeAddress: "",
      contactEmail: "",
      numberOfCameras: 1,
      numberOfUsers: 1,
      totalPrice: "0",
    },
  });

  const registrationMutation = useMutation({
    mutationFn: async (data: InsertStoreRegistration) => {
      return apiRequest("POST", "/api/store-registration", data);
    },
    onSuccess: () => {
      setStep(4);
      toast({
        title: "Registration successful!",
        description: "Your store has been registered. Proceed to payment to activate your account.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/store-registrations"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
    },
  });

  const calculateQuote = () => {
    const cameras = form.watch("numberOfCameras");
    const users = form.watch("numberOfUsers");
    const total = (cameras * CAMERA_PRICE) + (users * USER_PRICE);
    setQuote(total);
    form.setValue("totalPrice", total.toString());
    setStep(3);
  };

  const onSubmit = (data: InsertStoreRegistration) => {
    registrationMutation.mutate(data);
  };

  const handlePayment = () => {
    // In a real application, this would integrate with Stripe/PayPal
    toast({
      title: "Payment Successful!",
      description: "Your SecureVision account is now active. Welcome aboard!",
    });
    setStep(5);
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
              Get Started with SecureVision
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Register your store and get instant access to AI-powered surveillance technology.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-4">
                {[1, 2, 3, 4].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= stepNumber 
                        ? "bg-gradient-to-r from-primary to-secondary text-white" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {step > stepNumber ? <Check className="w-5 h-5" /> : stepNumber}
                    </div>
                    {stepNumber < 4 && (
                      <div className={`w-16 h-1 mx-2 ${
                        step > stepNumber ? "bg-primary" : "bg-muted"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Store Registration */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="glassmorphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="w-6 h-6 text-primary" />
                      <span>Store Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form className="space-y-6">
                        <FormField
                          control={form.control}
                          name="storeName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Store Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Your Store Name" data-testid="input-store-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="storeAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Store Address</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="123 Main St, City, State" data-testid="input-store-address" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="contactEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Email</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" placeholder="owner@store.com" data-testid="input-contact-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="button" 
                          onClick={() => setStep(2)}
                          className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white"
                          data-testid="button-next-step"
                        >
                          Next Step
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: System Configuration */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="glassmorphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Camera className="w-6 h-6 text-primary" />
                      <span>System Configuration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <div className="space-y-6">
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
                                  data-testid="input-number-cameras" 
                                />
                              </FormControl>
                              <FormMessage />
                              <p className="text-sm text-muted-foreground">
                                ${CAMERA_PRICE} per camera per month
                              </p>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="numberOfUsers"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Users</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="number" 
                                  min="1" 
                                  max="100"
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                  data-testid="input-number-users" 
                                />
                              </FormControl>
                              <FormMessage />
                              <p className="text-sm text-muted-foreground">
                                ${USER_PRICE} per user per month
                              </p>
                            </FormItem>
                          )}
                        />

                        <div className="flex space-x-4">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setStep(1)}
                            className="flex-1"
                            data-testid="button-back"
                          >
                            Back
                          </Button>
                          <Button 
                            type="button" 
                            onClick={calculateQuote}
                            className="flex-1 bg-gradient-to-r from-primary to-secondary text-white"
                            data-testid="button-generate-quote"
                          >
                            Generate Quote
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Quote Review */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="glassmorphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="w-6 h-6 text-primary" />
                      <span>Your Quote</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="glassmorphism rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Monthly Subscription</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>{form.watch("numberOfCameras")} Cameras × ${CAMERA_PRICE}</span>
                            <span>${form.watch("numberOfCameras") * CAMERA_PRICE}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{form.watch("numberOfUsers")} Users × ${USER_PRICE}</span>
                            <span>${form.watch("numberOfUsers") * USER_PRICE}</span>
                          </div>
                          <div className="border-t border-border pt-3">
                            <div className="flex justify-between text-xl font-bold text-primary">
                              <span>Total Monthly Cost</span>
                              <span>${quote}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setStep(2)}
                          className="flex-1"
                          data-testid="button-back-quote"
                        >
                          Back
                        </Button>
                        <Button 
                          onClick={form.handleSubmit(onSubmit)}
                          disabled={registrationMutation.isPending}
                          className="flex-1 bg-gradient-to-r from-primary to-secondary text-white"
                          data-testid="button-proceed-payment"
                        >
                          {registrationMutation.isPending ? "Processing..." : "Proceed to Payment"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 4: Payment */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="glassmorphism">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="w-6 h-6 text-primary" />
                      <span>Payment</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-8">
                      <p className="text-lg mb-4">Complete your payment to activate SecureVision</p>
                      <div className="text-3xl font-bold text-primary mb-2">${quote}/month</div>
                      <p className="text-muted-foreground">Billed monthly • Cancel anytime</p>
                    </div>
                    
                    <div className="glassmorphism rounded-lg p-6 mb-6">
                      <p className="text-sm text-muted-foreground mb-4">
                        In a production environment, this would integrate with Stripe or PayPal for secure payment processing.
                      </p>
                    </div>

                    <Button 
                      onClick={handlePayment}
                      className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3"
                      data-testid="button-complete-payment"
                    >
                      Complete Payment
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 5: Success */}
            {step === 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="glassmorphism text-center">
                  <CardContent className="pt-12 pb-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 gradient-text">Welcome to SecureVision!</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                      Your account is now active. Our team will contact you within 24 hours to schedule installation and setup.
                    </p>
                    <Button 
                      onClick={() => window.location.href = "/"}
                      className="bg-gradient-to-r from-primary to-secondary text-white"
                      data-testid="button-return-home"
                    >
                      Return to Home
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
