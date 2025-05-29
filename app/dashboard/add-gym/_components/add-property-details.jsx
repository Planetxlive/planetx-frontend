"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams } from "next/navigation";
import GymForm from "./_addPropertyComponents/gym"; 
import { GymSchema } from "../_SchemaValidation/gymSchema";
import SelectButton from "./selectButton";
import { useToast } from "@/hooks/use-toast";

export const PropertyDetailsForm = ({
  setPropertyData,
  setCurrentStep,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const propertyType = searchParams.get("propertyType");

 
  const schema = GymSchema;
  const defaultValues = {
    propertyType: propertyType,
    category: ["public", "private", "celebrity"],
    location: {
      city: "",
      state: "",
      locality: "",
      subLocality: "",
      apartment: "",
      houseNumber: "",
    },

    subCategory: "Public",
    propertyDetails: {
      propertyName: "",
      gymType: "Public",
      rating: 3,
      totalMembers: 0,
      equipmentTypes: "",
      amenities: [],
    },
    membershipDetails: {
      membershipType: "",
      pricePerMonth: 0,
      personalTrainerAvailable: false,
      groupClassesAvailable: false,
    },
    ageOfProperty: 0,
    description: "",
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  function onSubmit(values) {
    setIsSubmitting(true);
    try {
      setPropertyData({ ...values });
      toast({
        title: "Success",
        description: "Property added successfully!",
        variant: "default",
      });
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to add property",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Card className="w-[835px] bg-white border border-[#E1E1E1] rounded-xl p-5">
      <CardContent className="p-0">
        <div className="border-b border-[#E1E1E1] pb-2.5 mb-5">
          <h2 className="text-xl font-medium font-poppins text-[#000000]">
            Property Details
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              {/* Property Type */}
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Type
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <select
                          value={["Select Type", "For Sale", "For Rent", "Commercial"]}
                          {...field}
                          className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins appearance-none"
                        >
                          <option value="">Select Type</option>
                          <option value="For Sale">For Sale</option>
                          <option value="For Rent">For Rent</option>
                          <option value="Commercial">Commercial</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#0F0D0D] pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                        Property Category
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <select
                            {...field}
                            value={"Select Category"}
                            className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins appearance-none"
                          >
                            <option value="">Select Category</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                            <option value="celebrity">Celebrity</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#0F0D0D] pointer-events-none" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />


              {/* City */}
              <FormField
                control={form.control}
                name="location.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      City
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter City"
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* State */}
              <FormField
                control={form.control}
                name="location.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      State
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <select
                          value={[]}
                          {...field}
                          className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins appearance-none"
                        >
                          <option value="">Select State</option>
                          {/* State options omitted for brevity */}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#0F0D0D] pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Locality / Apartment */}
              <FormField
                control={form.control}
                name="location.locality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Locality / Apartment
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Locality / Apartment"
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Sub Locality */}
              <FormField
                control={form.control}
                name="location.subLocality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Sub Locality (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Sub Locality"
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Apartment */}
              <FormField
                control={form.control}
                name="location.apartment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Apartment
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Apartment"
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* House Number */}
              <FormField
                control={form.control}
                name="location.houseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      House No. (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter House No."
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            {/* Gym-specific form component */}
            <GymForm form={form} />

            <FormField
              control={form.control}
              name="availabilityStatus"
              render={({ field }) => (
                <FormItem>
                  <SelectButton
                    name="Availability Status"
                    options={["Available", "Rented", "Sold", "Under Construction"]}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-5">
              {/* Available From */}
              <FormField
                control={form.control}
                name="availableFrom"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Available From
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DatePicker
                          selected={field.value ? new Date(field.value) : null}
                          onChange={(date) =>
                            field.onChange(
                              date ? date.toISOString().split("T")[0] : ""
                            )
                          }
                          dateFormat="yyyy-MM-dd"
                          placeholderText="yyyy-mm-dd"
                          className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#0F0D0D] placeholder-[#9E9E9E] font-poppins focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                        />
                      </div>
                    </FormControl>
                    {error && (
                      <p className="text-red-500 text-sm font-medium mt-1">
                        {error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              {/* Age of Property */}
              <FormField
                control={form.control}
                name="ageOfProperty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Age of Property
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <select
                          value={[...Array(20)]}
                          {...field}
                          className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins appearance-none"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        >
                          <option value="">Select Age of Property</option>
                          {[...Array(20)].map((_, i) => (
                            <option key={i} value={i}>
                              {i} years
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#0F0D0D] pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                    Add Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add Description"
                      className="min-h-[126px] px-[15px] py-4 border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-[50px] bg-[#7B00FF] text-white font-medium font-poppins rounded-[10px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Property Details"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};