import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './Header';
import Form from './Form';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [task, setTask] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task[]>([]);
  const [completedTask, setCompletedTask] = useState<Task[]>([]);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const matchedTasks = task.filter(taskItem => {
      return !completedTask.some(completedItem => completedItem.id === taskItem.id);
    });
    setActiveTask(matchedTasks);
  }, [task, completedTask]);

  function addTask(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const newTask: Task = {
      id: Date.now(),
      text: value,
      completed: false,
    };
    setTask([...task, newTask]);
    setValue("");
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  function handleClickCompleted(item: Task) {
    const newCompletedTask: Task = {
      id: item.id,
      text: item.text,
      completed: true,
    };
    setCompletedTask([...completedTask, newCompletedTask]);
    const updatedTask = task.map(taskItem => {
      if (taskItem.id === item.id) {
        return { ...taskItem, completed: true };
      }
      return taskItem;
    });
    setTask(updatedTask);
  }

  function clearCompletedTask() {
    const noMatchedTasks = task.filter(taskItem => {
      return !completedTask.some(completedItem => completedItem.id === taskItem.id);
    });
    setTask(noMatchedTasks);
    setCompletedTask([]);
  }

  return (
    <>
      <Header />
      <main className="content">
        <Form
          addTask={addTask}
          value={value}
          handleInputChange={handleInputChange}
        />

        <Routes>
          <Route path='/' element={
            <section className="task__list">
              <h2 className="task__list-title">Все задачи</h2>
              {task.map(item =>
                <div className="task__item" key={item.id}>
                  <button className={item.completed === true ? "button__finish button__finish-press" : "button__finish"}
                    onClick={() => handleClickCompleted(item)}
                    disabled={item.completed === true}
                  ></button>
                  <p className={item.completed === true ? "item__text-completed" : "item__text"}>{item.text}</p>
                </div>
              )}
              {
                <p className={task.length === 0 ? "message__text-none" : "message__text"}>Еще нет задач. Добавьте новое дело</p>
              }
            </section>
          } />
          <Route path='/active' element={
            <section className="task__list">
              <h2 className="task__list-title">Aктивные задачи</h2>
              {activeTask.filter(item => item.completed === false).map(item =>
                <div className="task__item" key={item.id}>
                  <button className="button__finish"
                    onClick={() => handleClickCompleted(item)}
                  ></button>
                  <p className="item__text">{item.text}</p>
                </div>
              )}
              {
                <p className={activeTask.length === 0 ? "message__text-none" : "message__text"}>Еще нет активных задач. Добавьте новое дело</p>
              }
            </section>
          }
          />
          <Route path='/сompleted' element={
            <section className="task__list">
              <h2 className="task__list-title">Выполненные задачи</h2>
              {completedTask.map(item =>
                <div className="task__item" key={item.id}>
                  <button className={item.completed === true ? "button__finish button__finish-press" : "button__finish"}
                    onClick={() => handleClickCompleted(item)}
                    disabled={item.completed === true}
                  ></button>
                  <p className={item.completed === true ? "item__text-completed" : "item__text"}>{item.text}</p>
                </div>
              )}
              {
                <p className={completedTask.length === 0 ? "message__text-none" : "message__text"}>Еще нет выполненных задач. Работайте лучше</p>
              }
            </section>
          }
          />
        </Routes>
        <footer className="footer">
          <p className="count-items">{activeTask.length} задач осталось</p>
          <nav className="navigation">
            <Link to="/"><button className="navigation__button">All</button></Link>
            <Link to="/active"><button className="navigation__button">Active</button></Link>
            <Link to="/сompleted"><button className="navigation__button">Complitid</button></Link>
          </nav>
          <button className="button__clear-tasks"
            onClick={clearCompletedTask}
          >Clear completed</button>
        </footer>
      </main >
    </>

  )
}

export default App
