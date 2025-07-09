"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { RegisterFields } from "@/app/register/components/register-fields";
import { RegisterSchema } from "@/app/register/validation/register-schema";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        },
    });

    async function onSubmit(data: z.infer<typeof RegisterSchema>) {
        try {
            await axios.post("http://localhost:3000/api/auth/register", data);
            toast.success("Register successfully!");
            form.reset();
            router.push("/verify");
        } catch (error) {
            toast.error("Registration failed. Please try again.");
        }
    }

    return (
        <div className={"w-[100dvw] h-[100dvh] flex justify-center items-center"}>
            <div className={"max-w-[22rem] md:max-w-[32rem] w-full"}>
                <Form {...form}>
                    <form className={"flex flex-col gap-4"} onSubmit={form.handleSubmit(onSubmit)}>
                        <RegisterFields control={form.control} />
                        <Button variant={"default"} type="submit">Sign up!</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}