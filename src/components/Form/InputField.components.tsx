import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Stack,
} from "@chakra-ui/react";

import React from "react";

interface Props {
    isError?: boolean | undefined;
    errorMessage?: string;
    type?: string | "text";
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
    label?: string;
    placeholder?: string;
    name?: string;
    helperText?: string;
    inputClassName?: string;
    formLabelClassName?: string;
    required?: boolean;
    className?:string
}

export default function InputField({
    isError,
    errorMessage,
    type,
    value,
    onChange,
    onBlur,
    label,
    placeholder,
    name,
    helperText,
    inputClassName,
    formLabelClassName,
    required,
}: Props) {
    return (
        <FormControl  isInvalid={isError}>
            <FormLabel
                className={`relative m-0 text-sm font-medium font-inter text-gray-600 text-left ${formLabelClassName}`}
            >
                {label}
            </FormLabel>
            <Stack>
                <Input
                    required={required}
                    type={type}
                    value={value}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={inputClassName}
                    placeholder={placeholder}
                />
            </Stack>
            {isError && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}
