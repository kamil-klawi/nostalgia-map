"use client";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { VerifyFieldsProps } from "@/types/form/verify-fields";

export function InputOTPControlled({ control }: VerifyFieldsProps) {
    return (
        <FormField
            control={control}
            name="code"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                        <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </FormControl>
                    <FormDescription>
                        Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
