// <div className={styles.boards}>
//     <header className={classNames(styles.header, styles.headerLeft)}>
//         <h2>Boards</h2>
//     </header>

//     <header
//         className={classNames(styles.header, styles.headerTasksBar)}
//     >
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

//     <aside className={styles.menu}>
//         <div>
//             <ul>
//                 {boards.map(board => (
//                     <li key={board.id}>
//                         <Button
//                             type={ButtonType.button}
//                             variant={ButtonVariant.add}
//                         >
//                             {board.name}
//                         </Button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//         <div>
//             {!isFormOpened && (
//                 <Button
//                     onClick={() => setIsFormOpened(true)}
//                     type={ButtonType.button}
//                     variant={ButtonVariant.add}
//                 >
//                     Add board
//                 </Button>
//             )}
//         </div>
//     </aside>

//     <main className={styles.main}>
//         {isFormOpened ? (
//             <Form onSubmit={addBoard}>
//                 <Input
//                     value={board.name}
//                     placeholder="Board name?"
//                     type={InputType.text}
//                     onChange={inputBoardNameHandler}
//                     validate={inputValidate}
//                     onClick={() => setInputValidate(true)}
//                 />
//                 {boards.length ? (
//                     <FormBottom
//                         cancel={() => setIsFormOpened(false)}
//                         checkValidate={checkValidate}
//                     />
//                 ) : (
//                     <Button
//                         onMouseDown={checkValidate}
//                         type={ButtonType.submit}
//                         variant={ButtonVariant.add}
//                     >
//                         Add board
//                     </Button>
//                 )}
//             </Form>
//         ) : (
//             <ul className={styles.board}>
//                 <li className={styles.tasks}>
//                     <header>
//                         <h3>Opened</h3>
//                         <div>quantity</div>
//                     </header>

//                     <section>tasks opened</section>
//                 </li>

//                 <li className={styles.tasks}>
//                     <header>
//                         <h3>In process</h3>
//                         <div>quantity</div>
//                     </header>

//                     <section>tasks in process</section>
//                 </li>

//                 <li className={styles.tasks}>
//                     <header>
//                         <h3>Done</h3>
//                         <div>quantity</div>
//                     </header>

//                     <section>tasks done</section>
//                 </li>
//             </ul>
//         )}
//     </main>
// </div>
