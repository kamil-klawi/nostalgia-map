"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormFieldCustom } from "@/components/custom/form-field-custom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/app/login/validation/login-schema";
import axios from "axios";

export default function Login() {
    const router = useRouter();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    async function onSubmit(data: z.infer<typeof LoginSchema>) {
        try {
            await axios.post("http://localhost:3000/api/auth/login", data);
            toast.success("Login successfully!");
            form.reset();
            router.push("/");
        } catch (error) {
            toast.error("Login failed. Please try again.");
        }
    }

    return (
        <div className={"w-[100dvw] h-[100dvh] flex justify-center items-center"}>
            <div className={"max-w-[22rem] md:max-w-[32rem] w-full"}>
                <Form {...form}>
                    <form className={"flex flex-col gap-4"} onSubmit={form.handleSubmit(onSubmit)}>
                        <FormFieldCustom control={form.control} name={"email"} label={"Email"} placeholder={"Email"} type={"email"} />
                        <FormFieldCustom control={form.control} name={"password"} label={"Password"} placeholder={"Password"} type={"password"} />
                        <Button variant={"default"} type="submit">Login!</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}