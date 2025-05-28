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

const GymPricingForm = ({ form }) => {
  const { watch, setValue } = form;
  const baseMembershipFee = watch("baseMembershipFee");
  const discount = watch("discount");
  const taxes = watch("taxes");

  useEffect(() => {
    const finalPrice =
      Number(baseMembershipFee) - Number(discount) + Number(taxes);
    setValue("finalPrice", finalPrice);
  }, [baseMembershipFee, discount, taxes, setValue]);

  return (
    <>
      <div className="space-y-5">
        <h3 className="text-xl font-semibold">Gym Membership Pricing</h3>

        <FormField
          control={form.control}
          name="baseMembershipFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base Membership Fee</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., ₹2000 per month"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., ₹500 off for first month"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taxes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taxes</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., ₹180 (9% GST)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="finalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Payable Amount</FormLabel>
              <FormControl>
                <Input type="number" disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default GymPricingForm;
