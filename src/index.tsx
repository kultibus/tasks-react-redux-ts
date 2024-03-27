import { createRoot } from "react-dom/client";
import { App } from "./App";

import "./global.scss";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);

interface Test {
    name: string;
    age: number;
};


function test<T extends Test>({ age, name }: T) {
    console.log(name, age);
}

test<Test>({ age: 23, name: "sdflk" });
