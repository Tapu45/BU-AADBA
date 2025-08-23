"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Mail,
  User,
  KeyRound,
  Phone,
  MapPin,
  GraduationCap,
  Building2,
} from "lucide-react";

const carouselImages = [
  "/assets/alumini/alumini1.jpeg",
  "/assets/alumini/alumini2.jpeg",
  "/assets/alumini/alumini3.jpeg",
  "/assets/alumini/alumini4.jpeg",
];

type AlumniFormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  graduationYear: string;
  department: string;
  degree: string;
  phoneNumber: string;
  alternateEmail: string;
  address: string;
  suggestions: string;
  contributionNotes: string;
  yearOfJoining: string;
  registrationTransactionId: string;
  registrationPaymentDate: string;
  membershipTierId: string;
};

export default function AlumniRegisterPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Carousel state
  const [currentImage, setCurrentImage] = useState(0);

  // Example membership plans
  const [membershipPlans] = useState([
    { id: "basic", name: "Basic", fee: 500 },
    { id: "premium", name: "Premium", fee: 1000 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // React Hook Form setup
  const form = useForm<AlumniFormValues>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      graduationYear: "",
      department: "",
      degree: "",
      phoneNumber: "",
      alternateEmail: "",
      address: "",
      suggestions: "",
      contributionNotes: "",
      yearOfJoining: "",
      registrationTransactionId: "",
      registrationPaymentDate: "",
      membershipTierId: "",
    },
  });

  // Payment handler
  const handlePaymentProceed = () => {
    const transactionId = "TXN-" + Date.now();
    const paymentDate = new Date().toISOString().slice(0, 10);
    form.setValue("registrationTransactionId", transactionId);
    form.setValue("registrationPaymentDate", paymentDate);
    setPaymentDone(true);
    setShowPaymentModal(false);
  };

  // Membership change resets payment
  const handleMembershipChange = (value: string) => {
    form.setValue("membershipTierId", value);
    setPaymentDone(false);
    form.setValue("registrationTransactionId", "");
    form.setValue("registrationPaymentDate", "");
  };

  // Form submit
  const onSubmit = async (values: AlumniFormValues) => {
    setLoading(true);
    setError("");
    setSuccess("");
    if (!values.membershipTierId) {
      setError("Please select a membership plan and complete payment.");
      setLoading(false);
      return;
    }
    if (!paymentDone || !values.registrationTransactionId) {
      setError("Please complete the payment before registering.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/auth/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
      } else {
        setSuccess("Registration successful! Await admin approval.");
        form.reset();
        setPaymentDone(false);
      }
    } catch (err) {
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100  px-2">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden" style={{ height: "520px" }}>
        {/* Carousel Section */}
        <div className="md:w-1/2 w-full bg-blue-100 p-0 flex items-stretch justify-stretch">
          <div className="relative w-full h-full flex items-stretch justify-stretch rounded-none overflow-hidden shadow-none sticky top-0">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full flex items-stretch justify-stretch"
            >
              <img
                src={carouselImages[currentImage]}
                alt="Alumni"
                className="object-cover w-full h-full"
              />
            </motion.div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {carouselImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`block w-3 h-3 rounded-full ${
                    idx === currentImage ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Form Section */}
       <div
          className="md:w-1/2 w-full flex items-start justify-center p-8 bg-white overflow-y-auto h-full"
          style={{ maxHeight: "520px" }}
        >
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-700">
              <ShieldCheck className="w-7 h-7" /> Alumni Registration
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* ...form fields unchanged... */}
                  {/* Copy all your FormField components here as in your original code */}
                  {/* ...existing code... */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
                            <Input
                              {...field}
                              type="email"
                              required
                              placeholder="Email"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <KeyRound className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
                            <Input
                              {...field}
                              type="password"
                              required
                              placeholder="Password"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
                            <Input
                              {...field}
                              required
                              placeholder="First Name"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
                            <Input
                              {...field}
                              required
                              placeholder="Last Name"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="graduationYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Graduation Year</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <GraduationCap className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
                            <Input
                              {...field}
                              required
                              placeholder="Graduation Year"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
                            <Input
                              {...field}
                              required
                              placeholder="Department"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <GraduationCap className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
                            <Input
                              {...field}
                              required
                              placeholder="Degree"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
                            <Input
                              {...field}
                              required
                              placeholder="Mobile Number"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="alternateEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alternate Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
                            <Input
                              {...field}
                              placeholder="Alternate Email"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Present Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
                            <Input
                              {...field}
                              required
                              placeholder="Present Address"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="yearOfJoining"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Year of Joining (for BU Employees)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
                            <Input
                              {...field}
                              placeholder="Year of Joining"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Membership Plan Selection */}
                <FormField
                  control={form.control}
                  name="membershipTierId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Membership Plan</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          required
                          className="w-full p-2 border rounded mt-1"
                          onChange={(e) =>
                            handleMembershipChange(e.target.value)
                          }
                          value={field.value}
                        >
                          <option value="">Select Membership Plan</option>
                          {membershipPlans.map((plan) => (
                            <option key={plan.id} value={plan.id}>
                              {plan.name} - ₹{plan.fee}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Payment Button */}
                <Button
                  type="button"
                  variant="default"
                  className={`w-full ${
                    !form.watch("membershipTierId")
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => setShowPaymentModal(true)}
                  disabled={!form.watch("membershipTierId") || paymentDone}
                >
                  {paymentDone ? "Paid" : "Pay"}
                </Button>
                {/* Payment Modal */}
                {showPaymentModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white p-6 rounded shadow-lg w-96"
                    >
                      <h3 className="text-lg font-bold mb-2 text-blue-700">
                        Payment Info
                      </h3>
                      <p>
                        Plan:{" "}
                        {
                          membershipPlans.find(
                            (p) => p.id === form.watch("membershipTierId")
                          )?.name
                        }
                        <br />
                        Amount: ₹
                        {
                          membershipPlans.find(
                            (p) => p.id === form.watch("membershipTierId")
                          )?.fee
                        }
                      </p>
                      <Button
                        className="mt-4 w-full"
                        onClick={handlePaymentProceed}
                      >
                        Proceed
                      </Button>
                      <Button
                        variant="outline"
                        className="mt-2 w-full"
                        onClick={() => setShowPaymentModal(false)}
                      >
                        Cancel
                      </Button>
                    </motion.div>
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="suggestions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suggestions</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Your suggestions for Alumni Association"
                          className="w-full p-2 border rounded"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contributionNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contribution</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="How you can contribute"
                          className="w-full p-2 border rounded"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={loading || !paymentDone}
                  className="w-full bg-blue-600 text-white p-2 rounded mt-2"
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
                {error && <div className="text-red-600 mt-2">{error}</div>}
                {success && (
                  <div className="text-green-600 mt-2">{success}</div>
                )}
                {paymentDone && form.watch("registrationTransactionId") && (
                  <div className="text-sm text-gray-600 mt-2">
                    Transaction ID:{" "}
                    <span className="font-mono">
                      {form.watch("registrationTransactionId")}
                    </span>
                  </div>
                )}
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
