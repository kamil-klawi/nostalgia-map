import { Control } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";

export type FormFieldCustomProps = {
    control: Control<any>;
    name: string;
    label: string;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    description?: string;
};