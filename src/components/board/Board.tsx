import { Dispatch, FC, FormEventHandler, SetStateAction } from "react";
import styles from "./Board.module.scss";
import { IBoard } from "../../types/types";
import classNames from "classnames";
import { Button, ButtonType, ButtonVariant } from "../UI/button/Button";
import { Form } from "../UI/form/Form";
import { Input, InputType } from "../UI/input/Input";

interface BoardProps {}

export const Board: FC<BoardProps> = props => {
    const {} = props;

    return (
        // <div className={styles.main}>
        //     <header className={classNames(styles.headerTasksBar)}>
        //         {isFormOpened ? (
        //             <h2>Add board</h2>
        //         ) : (
        //             <div className={styles.boardBar}>
        //                 <h2>{boards.find(board => board.current).name}</h2>
        //                 <Button
        //                     type={ButtonType.button}
        //                     variant={ButtonVariant.add}
        //                 >
        //                     Add task
        //                 </Button>
        //             </div>
        //         )}
        //     </header>

        //     {isFormOpened ? (
        //         <Form onSubmit={addBoard}>
        //             <Input
        //                 value={board.name}
        //                 placeholder="Board name?"
        //                 type={InputType.text}
        //                 onChange={inputBoardNameHandler}
        //                 validate={inputValidate}
        //                 onClick={() => setInputValidate(true)}
        //             />
        //             {boards.length ? (
        //                 <FormBottom
        //                     cancel={() => setIsFormOpened(false)}
        //                     checkValidate={checkInputValidate}
        //                 />
        //             ) : (
        //                 <Button
        //                     onMouseDown={checkInputValidate}
        //                     type={ButtonType.submit}
        //                     variant={ButtonVariant.add}
        //                 >
        //                     Add board
        //                 </Button>
        //             )}
        //         </Form>
        //     ) : (
        //         <ul className={styles.board}>
        //             <li className={styles.tasks}>
        //                 <header>
        //                     <h3>Opened</h3>
        //                     <div>quantity</div>
        //                 </header>

        //                 <section>tasks opened</section>
        //             </li>

        //             <li className={styles.tasks}>
        //                 <header>
        //                     <h3>In process</h3>
        //                     <div>quantity</div>
        //                 </header>

        //                 <section>tasks in process</section>
        //             </li>

        //             <li className={styles.tasks}>
        //                 <header>
        //                     <h3>Done</h3>
        //                     <div>quantity</div>
        //                 </header>

        //                 <section>tasks done</section>
        //             </li>
        //         </ul>
        //     )}
        // </div>
    );
};
