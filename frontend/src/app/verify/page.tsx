"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifySchema } from "@/app/verify/validation/verify-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InputOTPControlled } from "@/app/verify/components/input-otp";
import { FormFieldCustom } from "@/components/custom/form-field-custom";
import axios from "axios";

export default function VerifyCode() {
    const router = useRouter();
    const form = useForm<z.infer<typeof VerifySchema>>({
        resolver: zodResolver(VerifySchema),
        defaultValues: {
            email: "",
            code: ""
        },
    });

    async function onSubmit(data: z.infer<typeof VerifySchema>) {
        try {
            await axios.post("http://localhost:3000/api/auth/verify-code", data);
            toast.success("Verify successfully!");
            form.reset();
            router.push("/login");
        } catch (error) {
            toast.error("Verify failed. Please try again.");
        }
    }

    return (
        <div className={"w-[100dvw] h-[100dvh] flex justify-center items-center"}>
            <div className={"max-w-[22rem] md:max-w-[32rem] w-full"}>
                <Form {...form}>
                    <form className={"flex flex-col gap-4"} onSubmit={form.handleSubmit(onSubmit)}>
                        <FormFieldCustom control={form.control} name={"email"} label={"Email"} placeholder={"Email"} type={"email"} />
                        <InputOTPControlled control={form.control} />
                        <Button variant={"default"} type="submit">Verify code!</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}