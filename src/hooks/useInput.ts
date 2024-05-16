import { ChangeEvent, useState } from "react";

export const useInput = (
    initialValue: string,
    initPlaceholder: string,
    placeholderError?: string
) => {
    const [value, setValue] = useState<string>(initialValue);

    const [placeholder, setPlaceholder] = useState<string>(initPlaceholder);

    const [isError, setIsError] = useState<boolean>(false);

    const onChange = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        setValue(e.target.value);
    };

    const deleteError = () => {
        setPlaceholder(initPlaceholder);
        setIsError(false);
    };

    const setError = () => {
        setPlaceholder(placeholderError);
        setIsError(true);
    };

    const cleanValue = () => {
        setValue("");
        deleteError();
    };

    return {
        value,
        placeholder,
        isError,
        onChange,
        deleteError,
        setError,
        cleanValue,
    };
};
