import { ChangeEvent, MouseEvent, useState } from "react";


export function useInput(initialValue: string, initPlaceholder: string) {
    const [value, setValue] = useState<string>(initialValue);

    const [placeholder, setPlaceholder] = useState<string>(initPlaceholder);

    // const [placeholderValid, setPlaceholderValid] =
    //     useState<boolean>(true);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onClick = (e: MouseEvent<HTMLInputElement>) => {};

    return {
        value,
        onChange,
    };
}
