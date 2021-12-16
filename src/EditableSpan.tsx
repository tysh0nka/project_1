import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

function EditableSpan(props: PropsType) {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
      setEditMode(false)
        props.changeTitle(title)
    }
    const changeTitle = ((e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value))
    return (
        editMode
            ? <input value={title}
                onChange={changeTitle}
                onBlur={offEditMode}
            autoFocus={true}/> :
       <span onDoubleClick={onEditMode}>{props.title}</span>
    );
}

export default EditableSpan;