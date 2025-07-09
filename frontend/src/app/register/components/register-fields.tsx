import { FormFieldCustom } from "@/components/custom/form-field-custom";
import { RegisterFieldsProps } from "@/types/form/register-fields";

export function RegisterFields({ control }: RegisterFieldsProps) {
    return (
        <div className={"flex flex-col gap-4"}>
            <FormFieldCustom control={control} name={"firstName"} label={"First name"} placeholder={"First name"} type={"text"} />
            <FormFieldCustom control={control} name={"lastName"} label={"Last name"} placeholder={"Last name"} type={"text"} />
            <FormFieldCustom control={control} name={"email"} label={"Email"} placeholder={"Email"} type={"email"} />
            <FormFieldCustom control={control} name={"password"} label={"Password"} placeholder={"Password"} type={"password"} />
            <FormFieldCustom control={control} name={"avatarUrl"} label={"Avatar url"} placeholder={"Avatar url"} type={"text"} description={"Not required, but you can provide it for better experience."} />
            <FormFieldCustom control={control} name={"bio"} label={"Short bio"} placeholder={"Short bio"} type={"text"} description={"Not required, but you can provide it for better experience."} />
        </div>
    );
}