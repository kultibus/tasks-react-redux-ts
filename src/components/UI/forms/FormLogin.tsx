import { FC, FormEvent, MouseEvent, useState } from "react";
import { Button } from "../buttons/Button";
import { Input } from "../inputs/Input";
import styles from "./FormLogin.module.scss";
import { useInput, UseInputParams } from "../../../hooks/useInput";

interface FormLoginProps {
    // handleClick: (email: string, password: string) => void;
    btnName: string;
}

// export const FormLogin: FC<FormLoginProps> = props => {
//     // const { handleClick, title } = props;
//     const { btnName } = props;

//     const [email, setEmail] = useState<string>("");
//     const [emailPlaceholder, setEmailPlaceholder] =
//         useState<string>("Enter email...");
//     const [emailPlaceholderValid, setEmailPlaceholderValid] =
//         useState<boolean>(true);

//     const [password, setPassword] = useState<string>("");
//     const [passwordPlaceholder, setPasswordPlaceholder] =
//         useState<string>("Enter password...");
//     const [passwordPlaceholderValid, setPasswordPlaceholderValid] =
//         useState<boolean>(true);

//     const [formValid, setFormValid] = useState<boolean>(false);

//     const handleInpClick = (e: MouseEvent<HTMLInputElement>) => {
//         switch (e.currentTarget.name) {
//             case "email":
//                 setEmailPlaceholder("Enter email...");
//                 setEmailPlaceholderValid(true);
//                 break;
//             case "password":
//                 setPasswordPlaceholder("Enter password...");
//                 setPasswordPlaceholderValid(true);
//                 break;
//         }
//     };

//     const handleBtnClick = () => {
//         if (!email.length || !password.length) {
//             setFormValid(false);

//             if (!email.length) {
//                 setEmailPlaceholder("Email is empty!");
//                 setEmailPlaceholderValid(false);
//             }
//             if (!password.length) {
//                 setPasswordPlaceholder("Password is empty!");
//                 setPasswordPlaceholderValid(false);
//             }
//         } else {
//             setFormValid(true);
//         }
//     };

//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (!formValid) return;
//         setEmail("");
//         setPassword("");
//     };

//     return (
//         <form onSubmit={handleSubmit} className={styles.form}>
//             <Input
//                 name="email"
//                 placeholderError={emailPlaceholderValid}
//                 onChange={e => setEmail(e.target.value)}
//                 onClick={handleInpClick}
//                 placeholder={emailPlaceholder}
//                 type="text"
//                 value={email}
//             />
//             <Input
//                 name="password"
//                 placeholderError={passwordPlaceholderValid}
//                 onChange={e => setPassword(e.target.value)}
//                 onClick={handleInpClick}
//                 placeholder={passwordPlaceholder}
//                 type="password"
//                 value={password}
//             />
//             <Button onClick={handleBtnClick} type="submit">
//                 {btnName}
//             </Button>
//         </form>
//     );
// };

export const FormLogin: FC<FormLoginProps> = props => {
    // const { handleClick, title } = props;
    const { btnName } = props;

    const email = useInput('', "Enter email...");
    const password = useInput("", "Enter password...");

    const [emailPlaceholder, setEmailPlaceholder] =
        useState<string>("Enter email...");
    const [emailPlaceholderValid, setEmailPlaceholderValid] =
        useState<boolean>(true);

    const [passwordPlaceholder, setPasswordPlaceholder] =
        useState<string>("Enter password...");
    const [passwordPlaceholderValid, setPasswordPlaceholderValid] =
        useState<boolean>(true);

    const [formValid, setFormValid] = useState<boolean>(false);

    const handleInpClick = (e: MouseEvent<HTMLInputElement>) => {
        switch (e.currentTarget.name) {
            case "email":
                setEmailPlaceholder("Enter email...");
                setEmailPlaceholderValid(true);
                break;
            case "password":
                setPasswordPlaceholder("Enter password...");
                setPasswordPlaceholderValid(true);
                break;
        }
    };

    const handleBtnClick = () => {
        if (!email.length || !password.length) {
            setFormValid(false);

            if (!email.length) {
                setEmailPlaceholder("Email is empty!");
                setEmailPlaceholderValid(false);
            }
            if (!password.length) {
                setPasswordPlaceholder("Password is empty!");
                setPasswordPlaceholderValid(false);
            }
        } else {
            setFormValid(true);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formValid) return;
        useInput('')
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Input
                name="email"
                placeholderError={emailPlaceholderValid}
                onChange={email.onChange}
                onClick={handleInpClick}
                placeholder={emailPlaceholder}
                type="text"
                value={email.value}
            />
            <Input
                name="password"
                placeholderError={passwordPlaceholderValid}
                onChange={password.onChange}
                onClick={handleInpClick}
                placeholder={passwordPlaceholder}
                type="password"
                value={password.value}
            />
            <Button onClick={handleBtnClick} type="submit">
                {btnName}
            </Button>
        </form>
    );
};
