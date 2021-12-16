import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    addItem: (title: string)=> void
}

function AddItemForm(props: AddItemFormType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const keyEnter = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' ? addItem() : undefined
    const changeTitle = ((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    })
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
            setTitle('')
        } else {
            setError(true)
        }

    }

    return (
        <div>
            <input
                value={title}
                onChange={changeTitle}
                onKeyPress={keyEnter}
                className={error ? 'error' : ''}
            />
            <button onClick={addItem}>+</button>
            <div style={{color: 'red'}}>{error && 'Title is required!'}</div>
        </div>
    );
}

export default AddItemForm;