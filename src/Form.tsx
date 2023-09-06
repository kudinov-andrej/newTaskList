import React, { ChangeEvent } from 'react';
import './Form.css';

interface FormProps {
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    addTask: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({ handleInputChange, value, addTask }) => {


    return (
        <>
            <form className="form" onSubmit={addTask}>
                <div className="input__conteiner">
                    <button className="button"
                        type="submit"></button>
                    <input className="input"
                        placeholder="What needs to be done?"
                        name="task"
                        value={value}
                        onChange={handleInputChange}
                    />
                </div>
            </form>

        </>

    )
}

export default Form;
