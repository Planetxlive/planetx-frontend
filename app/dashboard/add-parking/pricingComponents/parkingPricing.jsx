"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ParkingPricingForm = ({ form }) => {
  const { watch, setValue } = form;
  const baseHourlyRate = watch("baseHourlyRate");
  const discountPerHour = watch("discountPerHour");
  const taxesPerHour = watch("taxesPerHour");

  useEffect(() => {
    const finalRate =
      Number(baseHourlyRate || 0) -
      Number(discountPerHour || 0) +
      Number(taxesPerHour || 0);
    setValue("finalHourlyRate", finalRate);
  }, [baseHourlyRate, discountPerHour, taxesPerHour, setValue]);

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-semibold">Parking Hourly Pricing</h3>

      <FormField
        control={form.control}
        name="baseHourlyRate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Base Hourly Rate</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="e.g., ₹100 per hour"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />


      <FormField
        control={form.control}
        name="taxesPerHour"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Taxes</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="e.g., ₹18 (18% GST)"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="finalHourlyRate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Hourly Rate</FormLabel>
            <FormControl>
              <Input type="number" disabled {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ParkingPricingForm;
